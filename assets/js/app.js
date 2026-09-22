/* OneVoice27 Portugal: interações do site e dos formulários. Sem dependências. */
(() => {
  "use strict";

  const CONFIG = {
    // URL que recebe as inscrições (POST JSON). Vazio = modo de demonstração:
    // a inscrição fica guardada neste navegador (localStorage "ov27-submissoes").
    endpoint: "",
    churchesApi: "https://api.adventistas.pt/igrejas",
    regions: ["Região Norte", "Região Centro", "Região Lisboa & Vale do Tejo", "Região Alentejo & Algarve", "Região Madeira & Açores"],
  };

  const OTHER_CHURCH = "__outra__";
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const norm = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch { /* sem armazenamento */ } },
  };

  /* ------------------------------------------------------------------ */
  /* Igrejas                                                             */
  /* ------------------------------------------------------------------ */
  let churches = (window.IGREJAS || []).slice();
  const churchById = () => new Map(churches.map((c) => [c.id, c]));

  // Atualiza nomes de pastores e links a partir da API oficial; o instantâneo local é o recurso offline.
  async function refreshChurches() {
    try {
      const res = await fetch(CONFIG.churchesApi, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) return;
      const live = await res.json();
      if (!Array.isArray(live) || live.length < 20) return;
      const known = churchById();
      churches = live.map((c) => {
        const old = known.get(c.id) || {};
        const p = c.pastor || {};
        return {
          ...old,
          id: c.id,
          nome: c.name,
          cidade: c.city,
          regiao: c.region?.name || old.regiao,
          pastor: [p.firstName, p.lastName].filter(Boolean).join(" ") || old.pastor,
          pastora: p.gender === "F" || undefined,
          site: c.website || undefined,
          facebook: c.facebook || undefined,
          instagram: c.instagram || undefined,
          youtube: c.youtube || undefined,
        };
      }).sort((a, b) => a.nome.localeCompare(b.nome, "pt"));
      renderMap();
    } catch { /* offline ou API indisponível: fica o instantâneo */ }
  }

  /* ------------------------------------------------------------------ */
  /* Mapa de luzes                                                       */
  /* ------------------------------------------------------------------ */
  const SVGNS = "http://www.w3.org/2000/svg";
  const TONES = { p: "oklch(0.81 0.085 345)", t: "oklch(0.79 0.07 200)", l: "oklch(0.76 0.1 295)" };

  function renderMap() {
    const svg = $("[data-map-lights]");
    const tip = $("[data-map-tip]");
    if (!svg) return;
    const placed = churches.filter((c) => typeof c.x === "number");
    $$("[data-church-count]").forEach((el) => (el.textContent = churches.length));

    svg.replaceChildren();
    const defs = document.createElementNS(SVGNS, "defs");
    for (const [k, color] of Object.entries(TONES)) {
      defs.insertAdjacentHTML("beforeend",
        `<radialGradient id="glow-${k}"><stop offset="0" stop-color="${color}" stop-opacity="1"/><stop offset=".35" stop-color="${color}" stop-opacity=".45"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`);
    }
    svg.append(defs);

    const keys = Object.keys(TONES);
    placed.forEach((c, i) => {
      const g = document.createElementNS(SVGNS, "g");
      const halo = document.createElementNS(SVGNS, "circle");
      const core = document.createElementNS(SVGNS, "circle");
      halo.setAttribute("class", "halo");
      halo.setAttribute("cx", c.x); halo.setAttribute("cy", c.y); halo.setAttribute("r", 9);
      halo.setAttribute("fill", `url(#glow-${keys[(c.id * 7) % 3]})`);
      halo.style.setProperty("--d", `${3 + ((c.id * 13) % 30) / 10}s`);
      halo.style.setProperty("--delay", `${-((i * 37) % 50) / 10}s`);
      core.setAttribute("class", "core");
      core.setAttribute("cx", c.x); core.setAttribute("cy", c.y); core.setAttribute("r", 1.5);
      g.append(halo, core);
      g.addEventListener("pointerenter", () => showTip(c, g));
      g.addEventListener("pointerleave", () => hideTip(g));
      svg.append(g);
    });

    function showTip(c, g) {
      g.classList.add("is-active");
      tip.innerHTML = "";
      tip.append(c.nome);
      if (c.pastor) {
        const s = document.createElement("small");
        s.textContent = `${c.pastora ? "Pra." : "Pr."} ${c.pastor}`;
        tip.append(s);
      }
      tip.style.left = `${(c.x / 610) * 100}%`;
      tip.style.top = `${(c.y / 420) * 100}%`;
      tip.hidden = false;
    }
    function hideTip(g) { g.classList.remove("is-active"); tip.hidden = true; }
  }

  /* ------------------------------------------------------------------ */
  /* Separadores + rotas por hash (#instrutor, #criador, #igreja)         */
  /* ------------------------------------------------------------------ */
  const tabs = $$("[data-tab]");
  const panels = $$("[data-panel]");
  const done = $("[data-done]");

  function selectTab(key, { focus = false } = {}) {
    if (!panels.some((p) => p.dataset.panel === key)) return;
    tabs.forEach((t) => {
      const on = t.dataset.tab === key;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== key));
    done.hidden = true;
  }

  tabs.forEach((t, i) => {
    t.addEventListener("click", () => {
      selectTab(t.dataset.tab);
      history.replaceState(null, "", `#${t.dataset.tab}`);
    });
    t.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!dir && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      const next = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : (i + dir + tabs.length) % tabs.length;
      selectTab(tabs[next].dataset.tab, { focus: true });
      history.replaceState(null, "", `#${tabs[next].dataset.tab}`);
    });
  });

  function routeFromHash() {
    const key = location.hash.slice(1);
    if (panels.some((p) => p.dataset.panel === key)) {
      selectTab(key);
      requestAnimationFrame(() => $("#inscricao").scrollIntoView());
    }
  }
  window.addEventListener("hashchange", routeFromHash);
  // o hash pode já ser o mesmo (sem hashchange), por isso as ligações encaminham diretamente
  $$("[data-open-form]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, "", `#${a.dataset.openForm}`);
    routeFromHash();
  }));

  /* ------------------------------------------------------------------ */
  /* Combobox de igrejas                                                 */
  /* ------------------------------------------------------------------ */
  function setupCombo(combo) {
    const input = $("input[role=combobox]", combo);
    const hidden = $("[data-combo-value]", combo);
    const list = $(".combo__list", combo);
    const form = combo.closest("form");
    const field = combo.closest(".field");
    let active = -1;
    let options = [];
    let freeMode = false;

    const freeNote = document.createElement("p");
    freeNote.className = "hint";
    freeNote.hidden = true;
    freeNote.innerHTML = 'Escreva o nome da sua igreja. <button type="button" class="linkish">Voltar à lista</button>';
    field.append(freeNote);
    $("button", freeNote).addEventListener("click", () => { setFree(false); input.value = ""; hidden.value = ""; input.focus(); open(); });
    Object.assign($("button", freeNote).style, { background: "none", border: 0, padding: 0, color: "var(--pink)", font: "inherit", textDecoration: "underline", cursor: "pointer" });

    function setFree(on) {
      freeMode = on;
      freeNote.hidden = !on;
      input.setAttribute("aria-autocomplete", on ? "none" : "list");
      input.placeholder = on ? "Nome da igreja" : "Escreva para procurar…";
      delete hidden.dataset.id;
    }

    function highlight(text, q) {
      const frag = document.createDocumentFragment();
      const i = q ? norm(text).indexOf(q) : -1;
      if (i < 0) { frag.append(text); return frag; }
      const mark = document.createElement("mark");
      mark.textContent = text.slice(i, i + q.length);
      frag.append(text.slice(0, i), mark, text.slice(i + q.length));
      return frag;
    }

    function build() {
      const q = norm(input.value);
      const match = churches.filter((c) => !q || norm(c.nome).includes(q) || norm(c.cidade).includes(q));
      list.replaceChildren();
      options = [];
      const byRegion = CONFIG.regions.map((r) => [r, match.filter((c) => c.regiao === r)])
        .concat([["Outras", match.filter((c) => !CONFIG.regions.includes(c.regiao))]]);
      for (const [region, items] of byRegion) {
        if (!items.length) continue;
        const head = document.createElement("li");
        head.className = "combo__group";
        head.setAttribute("role", "presentation");
        head.textContent = region.replace(/^Região /, "");
        list.append(head);
        for (const c of items) {
          const li = document.createElement("li");
          li.className = "combo__opt";
          li.id = `${input.id}-o${c.id}`;
          li.setAttribute("role", "option");
          li.dataset.id = c.id;
          const name = document.createElement("span");
          name.append(highlight(c.nome, q));
          li.append(name);
          if (c.cidade && norm(c.cidade) !== norm(c.nome)) {
            const s = document.createElement("small");
            s.textContent = c.cidade;
            li.append(s);
          }
          list.append(li);
          options.push(li);
        }
      }
      if (!options.length) {
        const empty = document.createElement("li");
        empty.className = "combo__empty";
        empty.setAttribute("role", "presentation");
        empty.textContent = "Nenhuma igreja encontrada.";
        list.append(empty);
      }
      const other = document.createElement("li");
      other.className = "combo__opt combo__opt--other";
      other.id = `${input.id}-oother`;
      other.setAttribute("role", "option");
      other.dataset.id = OTHER_CHURCH;
      other.textContent = "A minha igreja não está na lista";
      list.append(other);
      options.push(other);
      setActive(-1);
    }

    function setActive(i) {
      options.forEach((o, n) => o.setAttribute("aria-selected", n === i));
      active = i;
      if (i >= 0) {
        input.setAttribute("aria-activedescendant", options[i].id);
        options[i].scrollIntoView({ block: "nearest" });
      } else input.removeAttribute("aria-activedescendant");
    }

    function open() {
      if (freeMode) return;
      build();
      list.hidden = false;
      input.setAttribute("aria-expanded", "true");
    }
    function close() {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    }

    function chooseChurch(c) {
      input.value = c.nome;
      hidden.value = c.nome;
      hidden.dataset.id = c.id;
      close();
      prefill(combo, c);
      form.dispatchEvent(new Event("input", { bubbles: true }));
      validateField(field);
    }

    function choose(li) {
      if (li.dataset.id !== OTHER_CHURCH) return chooseChurch(churchById().get(Number(li.dataset.id)));
      setFree(true);
      hidden.value = input.value.trim();
      close();
      input.focus();
      form.dispatchEvent(new Event("input", { bubbles: true }));
    }

    input.addEventListener("focus", open);
    input.addEventListener("click", open);
    input.addEventListener("input", () => {
      if (freeMode) { hidden.value = input.value.trim(); return; }
      hidden.value = "";
      delete hidden.dataset.id;
      open();
    });
    input.addEventListener("keydown", (e) => {
      if (freeMode) return;
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) open(); setActive(Math.min(active + 1, options.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
      else if (e.key === "Enter" && !list.hidden && (active >= 0 || input.value.trim())) { e.preventDefault(); choose(options[Math.max(active, 0)]); }
      else if (e.key === "Escape") { close(); }
    });
    list.addEventListener("pointerdown", (e) => e.preventDefault()); // mantém o foco no campo
    list.addEventListener("click", (e) => { const li = e.target.closest("[role=option]"); if (li) choose(li); });
    input.addEventListener("blur", () => {
      close();
      if (freeMode || hidden.value) return;
      const exact = churches.find((c) => norm(c.nome) === norm(input.value));
      if (exact) chooseChurch(exact);
    });

    // restaurar a partir de rascunho
    combo.restore = (value, id) => {
      const c = id && churchById().get(Number(id));
      if (c) { input.value = c.nome; hidden.value = c.nome; hidden.dataset.id = c.id; }
      else if (value) { setFree(true); input.value = value; hidden.value = value; }
    };
    combo.reset = () => { setFree(false); input.value = ""; hidden.value = ""; };
  }

  // Preenche o pastor (e, no formulário da igreja, os links) com os dados do diretório,
  // sem apagar o que a pessoa já escreveu por conta própria.
  function prefill(combo, c) {
    const fill = (el, value) => {
      if (!el || !value) return false;
      if (el.value && el.dataset.prefilled !== "1") return false;
      el.value = value;
      el.dataset.prefilled = "1";
      return true;
    };
    const pastor = combo.dataset.pastorTarget && document.getElementById(combo.dataset.pastorTarget);
    if (fill(pastor, c.pastor)) {
      let note = pastor.parentElement.querySelector(".prefilled");
      if (!note) {
        note = document.createElement("p");
        note.className = "prefilled";
        pastor.after(note);
      }
      note.textContent = "Preenchido a partir do diretório de igrejas. Corrija se necessário.";
      validateField(pastor.closest(".field"));
    }
    const prefix = combo.dataset.linksPrefix;
    if (prefix) {
      const any = ["site", "facebook", "instagram", "youtube"].map((k) => fill(document.getElementById(prefix + k), c[k])).some(Boolean);
      const note = $("[data-links-note]", combo.closest("form"));
      if (note) note.hidden = !any;
    }
  }
  document.addEventListener("input", (e) => { if (e.target.dataset?.prefilled) delete e.target.dataset.prefilled; }, true);

  /* ------------------------------------------------------------------ */
  /* Perguntas condicionais e opção exclusiva                             */
  /* ------------------------------------------------------------------ */
  function updateReveals(form) {
    $$(".reveal[data-when]", form).forEach((r) => {
      const [name, values] = r.dataset.when.split(":");
      const wanted = values.split("|");
      const on = $$(`[name="${name}"]`, form).some((i) => i.checked && wanted.includes(i.value));
      r.classList.toggle("is-open", on);
      r.inert = !on;
      $$("input, select, textarea", r).forEach((el) => (el.disabled = !on));
      if (!on) $$(".field", r).forEach(clearError);
    });
  }

  function handleExclusive(form, target) {
    if (target.type !== "checkbox" || !target.checked) return;
    const group = $$(`input[type=checkbox][name="${target.name}"]`, form);
    if (target.hasAttribute("data-exclusive")) group.forEach((i) => i !== target && (i.checked = false));
    else group.forEach((i) => i.hasAttribute("data-exclusive") && (i.checked = false));
  }

  /* ------------------------------------------------------------------ */
  /* Validação                                                           */
  /* ------------------------------------------------------------------ */
  const ownControl = (field) =>
    $(":scope > input:not([type=hidden]), :scope > select, :scope > textarea, :scope > .combo > input[role=combobox], :scope > label.check > input", field);

  const isActive = (field) => !field.closest(".reveal:not(.is-open)");

  function fieldError(field) {
    if (!isActive(field)) return "";
    const group = field.dataset.group;
    if (group) {
      const inputs = $$(`:scope > .choices input[name="${group}"]`, field);
      if (inputs.some((i) => i.checked)) return "";
      return inputs[0]?.type === "radio" ? "Escolha uma opção." : "Escolha pelo menos uma opção.";
    }
    const el = ownControl(field);
    if (!el) return "";
    if (el.getAttribute("role") === "combobox") {
      return $("[data-combo-value]", field).value ? "" : "Escolha a sua igreja da lista, ou «A minha igreja não está na lista».";
    }
    const v = el.type === "checkbox" ? (el.checked ? "x" : "") : el.value.trim();
    if (!v) {
      if (!el.required) return "";
      if (el.type === "checkbox") return "Precisa de confirmar para enviar.";
      if (el.tagName === "SELECT") return "Escolha uma opção.";
      return "Preencha este campo.";
    }
    if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Indique um email válido, por exemplo nome@exemplo.pt.";
    if (el.type === "tel" && v.replace(/\D/g, "").length < 9) return "Indique um número com pelo menos 9 algarismos.";
    if (el.type === "number") {
      const n = Number(v), min = Number(el.min), max = Number(el.max);
      if (!Number.isInteger(n) || n < min || n > max) return `Indique uma idade entre ${min} e ${max} anos.`;
    }
    if (el.type === "url") {
      try { const u = new URL(v); if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) throw 0; }
      catch { return "Indique um link completo, por exemplo https://instagram.com/…"; }
    }
    return "";
  }

  function clearError(field) {
    field.classList.remove("is-invalid");
    $(":scope > .field-error", field)?.remove();
    const el = ownControl(field) || $(":scope > .choices input", field);
    el?.removeAttribute("aria-invalid");
  }

  function validateField(field, { show = true } = {}) {
    const msg = fieldError(field);
    if (!show) return !msg;
    clearError(field);
    if (!msg) return true;
    field.classList.add("is-invalid");
    const p = document.createElement("p");
    p.className = "field-error";
    p.id = `err-${Math.random().toString(36).slice(2, 8)}`;
    p.textContent = msg;
    // a mensagem fica logo a seguir às opções / ao campo, antes de perguntas condicionais
    const anchor = $(":scope > .choices, :scope > .combo, :scope > label.check", field) || ownControl(field);
    anchor.after(p);
    const el = ownControl(field);
    if (el) { el.setAttribute("aria-invalid", "true"); el.setAttribute("aria-describedby", [el.getAttribute("aria-describedby"), p.id].filter(Boolean).join(" ")); }
    return false;
  }

  const fieldsOf = (root) => $$(".field", root).filter((f) => f.dataset.group || ownControl(f));
  const isRequiredField = (f) => {
    if (f.dataset.group) return true;
    const el = ownControl(f);
    return el && (el.required || el.getAttribute("role") === "combobox");
  };

  /* ------------------------------------------------------------------ */
  /* Barra de progresso lateral                                          */
  /* ------------------------------------------------------------------ */
  function buildRail(form) {
    const panel = form.closest("[data-panel]");
    const list = $("[data-rail]", panel);
    $$("fieldset[data-step]", form).forEach((fs, i) => {
      fs.id ||= `${form.dataset.form}-passo-${i + 1}`;
      const li = document.createElement("li");
      li.innerHTML = `<a href="#${fs.id}"><span class="rail__dot">${i + 1}</span><span></span><span class="rail__count"></span></a>`;
      li.querySelector("span:nth-child(2)").textContent = fs.dataset.step;
      li.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        fs.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        const first = $("input:not([type=hidden]), select, textarea", fs);
        first?.focus({ preventScroll: true });
      });
      list.append(li);
    });
  }

  function updateRail(form) {
    const items = $$("[data-rail] li", form.closest("[data-panel]"));
    $$("fieldset[data-step]", form).forEach((fs, i) => {
      const req = fieldsOf(fs).filter((f) => isActive(f) && isRequiredField(f));
      const ok = req.filter((f) => validateField(f, { show: false })).length;
      const li = items[i];
      if (!li) return;
      li.querySelector("a").classList.toggle("is-done", req.length > 0 && ok === req.length);
      li.querySelector(".rail__count").textContent = req.length ? `${ok}/${req.length}` : "opcional";
    });
  }

  /* ------------------------------------------------------------------ */
  /* Rascunho local                                                      */
  /* ------------------------------------------------------------------ */
  const draftKey = (form) => `ov27-rascunho-${form.dataset.form}`;

  function serialize(form) {
    const data = {};
    for (const el of form.elements) {
      if (!el.name || el.disabled) continue;
      if ((el.type === "checkbox" || el.type === "radio") && !el.checked) continue;
      const v = el.value.trim();
      if (el.type === "checkbox" && el.name !== "confirmacao") (data[el.name] ||= []).push(v);
      else data[el.name] = v;
    }
    const church = $("[data-combo-value]", form);
    if (church?.dataset.id) data.igreja_id = Number(church.dataset.id);
    return data;
  }

  function saveDraft(form) {
    const data = serialize(form);
    delete data.confirmacao;
    const status = $("[data-draft-status]", form.closest("[data-panel]"));
    const empty = Object.values(data).every((v) => !v || (Array.isArray(v) && !v.length));
    if (empty) { store.del(draftKey(form)); status.textContent = ""; return; }
    if (store.set(draftKey(form), data)) draftStatus(form, "Rascunho guardado neste dispositivo.");
  }

  function draftStatus(form, text) {
    const status = $("[data-draft-status]", form.closest("[data-panel]"));
    status.textContent = text + " ";
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = "Apagar";
    b.addEventListener("click", () => resetForm(form));
    status.append(b);
  }

  function restoreDraft(form) {
    const data = store.get(draftKey(form));
    if (!data) return;
    for (const [name, value] of Object.entries(data)) {
      if (name === "igreja") { $("[data-combo]", form)?.restore(value, data.igreja_id); continue; }
      const els = $$(`[name="${name}"]`, form);
      els.forEach((el) => {
        if (el.type === "checkbox" || el.type === "radio") el.checked = [].concat(value).includes(el.value);
        else el.value = value;
      });
    }
    draftStatus(form, "Retomámos o seu rascunho.");
  }

  function resetForm(form) {
    form.reset();
    $("[data-combo]", form)?.reset();
    $$("[data-prefilled]", form).forEach((el) => delete el.dataset.prefilled);
    $$(".prefilled", form).forEach((el) => el.remove());
    $$("[data-links-note]", form).forEach((el) => (el.hidden = true));
    $$(".field", form).forEach(clearError);
    $("[data-summary]", form).hidden = true;
    store.del(draftKey(form));
    $("[data-draft-status]", form.closest("[data-panel]")).textContent = "";
    updateReveals(form);
    updateRail(form);
  }

  /* ------------------------------------------------------------------ */
  /* Envio                                                               */
  /* ------------------------------------------------------------------ */
  const DONE_COPY = {
    instrutor: ["Candidatura recebida", "Obrigado por se disponibilizar para acompanhar quem procura. A coordenação vai analisar a sua candidatura e entrará em contacto através do email ou telefone indicados."],
    criador: ["Inscrição recebida", "Obrigado por querer pôr os seus talentos ao serviço do OneVoice27. A equipa de coordenação vai analisar a inscrição e falará consigo em breve."],
    igreja: ["A sua igreja está inscrita", "Obrigado por ligar a vossa comunidade ao OneVoice27. A coordenação vai entrar em contacto com o responsável indicado com os próximos passos."],
  };

  async function send(type, payload) {
    const body = { tipo: type, submetido_em: new Date().toISOString(), ...payload };
    if (!CONFIG.endpoint) {
      const all = store.get("ov27-submissoes") || [];
      all.push(body);
      store.set("ov27-submissoes", all);
      console.info("[OneVoice27] Modo de demonstração: inscrição guardada localmente.", body);
      await new Promise((r) => setTimeout(r, 500));
      return;
    }
    const res = await fetch(CONFIG.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  }

  function setupForm(form) {
    const type = form.dataset.form;
    const summary = $("[data-summary]", form);
    const button = $("button[type=submit]", form);
    let saveTimer;

    buildRail(form);
    restoreDraft(form);
    updateReveals(form);
    updateRail(form);

    form.addEventListener("input", (e) => {
      if (e.target.matches("input[type=checkbox], input[type=radio]")) return; // tratado em change
      const field = e.target.closest(".field");
      if (field?.classList.contains("is-invalid")) validateField(field);
      updateRail(form);
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => saveDraft(form), 400);
    });
    form.addEventListener("change", (e) => {
      handleExclusive(form, e.target);
      updateReveals(form);
      const field = e.target.closest(".field");
      if (field && e.target.matches("input[type=checkbox], input[type=radio], select")) validateField(field);
      updateRail(form);
      saveDraft(form);
    });
    form.addEventListener("focusout", (e) => {
      const el = e.target;
      if (!el.matches("input[type=text], input[type=email], input[type=tel], input[type=url], input[type=number], textarea")) return;
      if (el.type === "url" && el.value.trim() && !/^[a-z]+:\/\//i.test(el.value.trim())) el.value = `https://${el.value.trim()}`;
      if (el.getAttribute("role") === "combobox") return; // valida-se ao escolher
      if (el.value.trim()) validateField(el.closest(".field"));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const invalid = fieldsOf(form).filter((f) => isActive(f) && !validateField(f));
      updateRail(form);
      if (invalid.length) {
        summary.hidden = false;
        summary.textContent = invalid.length === 1 ? "Falta 1 resposta obrigatória. " : `Faltam ${invalid.length} respostas obrigatórias. `;
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = "Ir para a primeira";
        a.addEventListener("click", (ev) => { ev.preventDefault(); focusField(invalid[0]); });
        summary.append(a);
        focusField(invalid[0]);
        return;
      }
      summary.hidden = true;
      button.disabled = true;
      const label = button.textContent;
      button.textContent = "A enviar…";
      try {
        await send(type, serialize(form));
        const panel = form.closest("[data-panel]");
        resetForm(form);
        panel.hidden = true;
        const [title, text] = DONE_COPY[type];
        $("[data-done-title]", done).textContent = title;
        $("[data-done-text]", done).textContent = text;
        done.style.setProperty("--tone", panel.style.getPropertyValue("--tone"));
        done.dataset.for = type;
        done.hidden = false;
        done.focus();
        done.scrollIntoView({ block: "center" });
      } catch (err) {
        summary.hidden = false;
        summary.textContent = "Não foi possível enviar agora. Verifique a ligação à internet e tente de novo; as suas respostas continuam aqui.";
        console.error(err);
      } finally {
        button.disabled = false;
        button.textContent = label;
      }
    });
  }

  function focusField(field) {
    const el = ownControl(field) || $(":scope > .choices input", field);
    field.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    el?.focus({ preventScroll: true });
  }

  $("[data-done-again]")?.addEventListener("click", () => {
    selectTab(done.dataset.for || "instrutor");
    $("#inscricao").scrollIntoView();
  });

  /* ------------------------------------------------------------------ */
  /* Cabeçalho: esconde ao descer, volta ao subir                         */
  /* ------------------------------------------------------------------ */
  function setupHeader() {
    const header = $(".site-header");
    if (!header) return;
    let lastY = scrollY;
    let ticking = false;
    const update = () => {
      const y = scrollY;
      const down = y > lastY + 4;
      const up = y < lastY - 4;
      // nunca esconder no topo, nem enquanto o foco do teclado está no cabeçalho
      if (y < 120 || header.contains(document.activeElement)) header.classList.remove("is-hidden");
      else if (down) header.classList.add("is-hidden");
      else if (up) header.classList.remove("is-hidden");
      if (down || up) lastY = y;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  }

  /* ------------------------------------------------------------------ */
  /* Arranque                                                            */
  /* ------------------------------------------------------------------ */
  renderMap();
  setupHeader();
  $$("[data-combo]").forEach(setupCombo);
  $$("form[data-form]").forEach(setupForm);
  routeFromHash();
  refreshChurches();
})();
