// Language switch, the "plan your stack" picker, copy button and entrance motion. No build step.
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var D = window.I18N || {};
  var EN = {};
  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  nodes.forEach(function (n) { EN[n.getAttribute("data-i18n")] = n.innerHTML; });
  EN["meta.title"] = document.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  EN["meta.desc"] = metaDesc ? metaDesc.content : "";
  var lang = "en";

  function t(key) {
    var d = D[lang] || {};
    if (d[key] != null) return d[key];
    if (D.en && D.en[key] != null) return D.en[key];
    return EN[key] != null ? EN[key] : key;
  }

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function setLang(l, save) {
    if (!/^(ar|en|fr)$/.test(l)) l = "en";
    lang = l;
    root.lang = l;
    root.dir = l === "ar" ? "rtl" : "ltr";
    nodes.forEach(function (n) { n.innerHTML = t(n.getAttribute("data-i18n")); });
    document.title = t("meta.title");
    if (metaDesc) metaDesc.content = t("meta.desc");
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === l ? "true" : "false");
    });
    if (save) {
      store("lang", l);
      try { var u = new URL(location.href); u.searchParams.set("lang", l); history.replaceState(null, "", u); } catch (e) {}
    }
    renderPicks(false);
    var heads = Array.prototype.map.call(document.querySelectorAll(".tt thead th"), function (h) { return h.textContent; });
    document.querySelectorAll(".tt tbody tr").forEach(function (tr) {
      Array.prototype.forEach.call(tr.querySelectorAll("td"), function (td, i) { td.setAttribute("data-label", heads[i + 1] || ""); });
    });
  }

  // ---- plan your stack ----
  var state = { budget: "zero", gpu: "yes" };
  function tag(kind) { return ' <span class="tag ' + kind + '">' + t("pick." + kind) + "</span>"; }
  function picks() {
    var some = state.budget === "some", gpu = state.gpu === "yes";
    return {
      director: "Claude Code" + tag("sub"),
      voice: some ? "ElevenLabs" + tag("paid") : gpu ? "Chatterbox (" + t("pick.clone") + ") · Kokoro" + tag("free") : "Kokoro, " + t("pick.cpu") + tag("free"),
      whisper: "faster-whisper, " + (gpu ? t("pick.gpuorcpu") : t("pick.cpu")) + tag("free"),
      images: some ? "ChatGPT Plus" + tag("paid") : t("pick.chatfree") + " · Google Flow" + (gpu ? " · ComfyUI" : "") + tag("free"),
      anim: "Remotion" + tag("free"),
      songs: some ? "Suno" + tag("paid") : gpu ? "ACE-Step 1.5" + tag("free") : t("pick.nosongs") + tag("free"),
      music: "Mixkit" + tag("free"),
      glue: "ffmpeg" + tag("free"),
      upload: "YouTube Data API, " + t("pick.ongo") + tag("free")
    };
  }
  var last = {};
  function renderPicks(flash) {
    var p = picks();
    document.querySelectorAll(".pick").forEach(function (td) {
      var k = td.getAttribute("data-row");
      var html = p[k] || "";
      if (flash && last[k] && last[k] !== html) {
        td.classList.remove("flash"); void td.offsetWidth; td.classList.add("flash");
      }
      td.innerHTML = html;
      last[k] = html;
    });
    var count = state.budget === "some" ? 4 : 1;
    var c = document.getElementById("pk-count");
    if (c) { c.textContent = String(count); c.classList.toggle("more", count > 1); }
  }
  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-k");
      state[k] = b.getAttribute("data-v");
      b.parentNode.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
      renderPicks(true);
    });
    b.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      var sib = Array.prototype.slice.call(b.parentNode.querySelectorAll("button"));
      var i = sib.indexOf(b), n = sib[(i + 1) % sib.length];
      e.preventDefault(); n.focus(); n.click();
    });
  });

  // ---- language buttons ----
  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
  });

  // ---- copy ----
  document.querySelectorAll(".copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.querySelector(b.getAttribute("data-copy"));
      if (!el || !navigator.clipboard) return;
      navigator.clipboard.writeText(el.innerText).then(function () {
        var old = b.innerHTML; b.textContent = t("copied"); setTimeout(function () { b.innerHTML = old; }, 1400);
      });
    });
  });

  // ---- initial language ----
  var q = null;
  try { q = new URL(location.href).searchParams.get("lang"); } catch (e) {}
  var nav = (navigator.language || "en").slice(0, 2);
  setLang(q || read("lang") || (/^(ar|fr)$/.test(nav) ? nav : "en"), false);

  // ---- entrance motion ----
  var groups = [".stair", ".install-copy > *, .term", ".sheet > *", ".tools-head > *, .table-wrap", ".poster-list li, .poster-note", ".show-head > *, .panel", ".faq .h2, .card", ".foot-top > *"];
  var items = [];
  groups.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) { el.setAttribute("data-rv", ""); el.style.setProperty("--d", String(Math.min(i, 8))); items.push(el); });
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }
  // never leave content hidden: anything not revealed shortly after load is shown anyway
  window.addEventListener("load", function () {
    setTimeout(function () { items.forEach(function (el) { el.classList.add("in"); }); }, 2500);
  });
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("ready"); }); });
  setTimeout(function () { root.classList.add("ready"); }, 120);
})();
