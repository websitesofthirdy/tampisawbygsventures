(function () {
  "use strict";
  var D = window.SITE;
  var $ = function (s) { return document.querySelector(s); };
  var fmt = function (n) { return D.currency + Math.round(n).toLocaleString("en-PH"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var HUES = [["#7fd6cf", "#1b8a92"], ["#9ee0c9", "#27857a"], ["#8fd0e6", "#1f6f95"], ["#b8e6d8", "#3a9c8f"], ["#7fc6dd", "#14606f"], ["#a6e3d6", "#1d7d78"]];

  var state = { pkg: D.packages[0].id, date: "", adults: 2, kids: 0, stay: "", nights: 1, addons: {}, name: "", phone: "", note: "" };

  /* ---------- helpers ---------- */
  function media(src, alt, i, cls) {
    var h = HUES[i % HUES.length];
    var img = src ? '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy" onerror="this.remove()">' : "";
    return '<div class="media ' + (cls || "") + '" style="--c1:' + h[0] + ";--c2:" + h[1] + '">' + img + "</div>";
  }
  function byId(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove("on"); }, 2600); }

  /* ---------- static content ---------- */
  document.title = D.name + (D.operator ? " by " + D.operator : "") + " | Island hopping, floating cottages and seafood boodle";
  var by = D.operator ? "by " + D.operator : "";
  $("#brand").textContent = D.name; $("#brandBy").textContent = by;
  $("#fBrand").textContent = D.name + (by ? " " + by : "");
  $("#heroLead").textContent = D.tagline;
  var min = Math.min.apply(null, D.packages.map(function (p) { return p.price; }));
  $("#heroFrom").textContent = "Packages from " + fmt(min) + " per person";
  $("#payText").textContent = D.payment;
  document.querySelectorAll("[data-logo]").forEach(function (img) { img.src = D.logos[img.dataset.logo]; });
  if (D.promo) { $("#promoText").textContent = D.promo; $("#promo").hidden = false; }
  $("#perks").innerHTML = (D.perks || []).map(function (p) { return '<div class="perk"><strong>' + esc(p[0]) + "</strong><span>" + esc(p[1]) + "</span></div>"; }).join("");
  if (D.operator) { $("#makerTitle").textContent = "Run by " + D.operator; $("#maker").hidden = false; }
  $("#fLoc").textContent = D.location;
  $("#fHours").textContent = D.contact.hours;
  $("#fTel").textContent = D.contact.phone; $("#fTel").href = "tel:" + D.contact.phone;
  $("#fMail").textContent = D.contact.email; $("#fMail").href = "mailto:" + D.contact.email;
  $("#fFb").href = D.contact.facebook;

  if (D.heroImage) {
    var test = new Image();
    test.onload = function () { var b = $("#heroBg"); b.style.backgroundImage = "url('" + D.heroImage + "')"; b.classList.add("has-img"); };
    test.src = D.heroImage;
  }

  $("#pkgList").innerHTML = D.packages.map(function (p, i) {
    return '<article class="pkg' + (i === 0 ? " pkg--lead" : "") + '">' +
      media(p.image, p.title, i) .replace("</div>", '<span class="tag">' + esc(p.tag) + "</span></div>") +
      '<div class="pkg__body"><h3 class="pkg__title">' + esc(p.title) + "</h3><p class=\"pkg__blurb\">" + esc(p.blurb) + "</p>" +
      '<ul class="inc">' + p.includes.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
      '<div class="pkg__foot"><div class="price"><strong>' + fmt(p.price) + "</strong><span>per adult</span><span>" + esc(p.duration) + "</span></div>" +
      '<button class="btn btn--dark" type="button" data-plan="' + p.id + '">Plan this</button></div></div></article>';
  }).join("");

  function addonRow(a) {
    return '<li class="row"><span class="row__t">' + esc(a.title) + '</span><span class="row__p">' + fmt(a.price) + "<small>" + (a.unit === "pax" ? "per person" : "per order") + "</small></span>" +
      '<span class="row__n">' + esc(a.note) + '</span><span class="row__b"><button class="add" type="button" data-add="' + a.id + '" aria-pressed="false">Add</button></span></li>';
  }
  $("#actList").innerHTML = D.addons.filter(function (a) { return a.group === "Activity"; }).map(addonRow).join("");
  $("#foodList").innerHTML = D.addons.filter(function (a) { return a.group === "Food"; }).map(addonRow).join("");

  $("#stayList").innerHTML = D.stays.map(function (s) {
    return '<li class="row"><span class="row__t">' + esc(s.title) + ", sleeps " + esc(s.sleeps.replace("Up to ", "up to ")) + '</span><span class="row__p">' + fmt(s.price) + "<small>per night</small></span>" +
      '<span class="row__n">' + esc(s.note) + '</span><span class="row__b"><button class="add" type="button" data-stay="' + s.id + '" aria-pressed="false">Add</button></span></li>';
  }).join("");

  $("#gal").innerHTML = D.gallery.map(function (g, i) { return media(g.src, g.alt, i); }).join("");
  $("#faqList").innerHTML = D.faq.map(function (f) { return "<details><summary>" + esc(f[0]) + "</summary><p>" + esc(f[1]) + "</p></details>"; }).join("");

  /* ---------- form setup ---------- */
  $("#fPkg").innerHTML = D.packages.map(function (p) { return '<option value="' + p.id + '">' + esc(p.title) + " (" + fmt(p.price) + " per adult)</option>"; }).join("");
  $("#fStay").innerHTML = '<option value="">No overnight stay</option>' + D.stays.map(function (s) { return '<option value="' + s.id + '">' + esc(s.title) + " (" + fmt(s.price) + " per night)</option>"; }).join("");
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  $("#fDate").min = today.toISOString().slice(0, 10);

  /* ---------- calculations ---------- */
  function lines() {
    var out = [], total = 0, p = byId(D.packages, state.pkg), guests = state.adults + state.kids;
    if (p) {
      var a = p.price * state.adults; total += a; out.push([p.title + ", " + state.adults + " adult" + (state.adults === 1 ? "" : "s"), a]);
      if (state.kids) { var k = p.kidPrice * state.kids; total += k; out.push([state.kids + " kid" + (state.kids === 1 ? "" : "s") + " at " + fmt(p.kidPrice), k]); }
    }
    Object.keys(state.addons).forEach(function (id) {
      var ad = byId(D.addons, id), q = state.addons[id]; if (!ad) return;
      var amt = ad.unit === "pax" ? ad.price * guests : ad.price * q;
      total += amt; out.push([ad.title + (ad.unit === "pax" ? ", " + guests + " guests" : (q > 1 ? " x" + q : "")) + (ad.unit === "flat" && ad.note ? " (" + ad.note.split(".")[0] + ")" : ""), amt]);
    });
    var st = byId(D.stays, state.stay);
    if (st) { var s = st.price * state.nights; total += s; out.push([st.title + ", " + state.nights + " night" + (state.nights === 1 ? "" : "s"), s]); }
    return { rows: out, total: total };
  }

  /* ---------- render ---------- */
  function render() {
    var L = lines();
    $("#sumLines").innerHTML = L.rows.length ? L.rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + fmt(r[1]) + "</dd></div>"; }).join("") : "<div><dt>Choose a package to see your estimate</dt><dd></dd></div>";
    $("#sumTotal").textContent = fmt(L.total);
    $("#sumNote").textContent = "Estimate only. We confirm the final amount with you before any payment.";
    $("#oAdults").textContent = state.adults; $("#oKids").textContent = state.kids;
    $("#fPkg").value = state.pkg; $("#fStay").value = state.stay;
    $("#nightsWrap").hidden = !state.stay; $("#fNights").value = state.nights;
    $("#barL").textContent = "Estimated total"; $("#barV").textContent = fmt(L.total);

    var ids = Object.keys(state.addons);
    $("#picked").innerHTML = ids.length ? ids.map(function (id) {
      var a = byId(D.addons, id), q = state.addons[id];
      var stepper = a.unit === "flat" ? '<div class="step" data-aq="' + id + '"><button type="button" aria-label="Fewer ' + esc(a.title) + '" data-d="-1">−</button><output>' + q + '</output><button type="button" aria-label="More ' + esc(a.title) + '" data-d="1">+</button></div>' : "";
      return '<li class="pk"><span class="pk__t">' + esc(a.title) + "<small>" + fmt(a.price) + (a.unit === "pax" ? " per person" : " per order") + "</small></span>" + stepper + '<button class="pk__x" type="button" data-rm="' + id + '">Remove</button></li>';
    }).join("") : '<li class="picked__empty">None yet. <a href="#extras">Pick activities or food</a>.</li>';

    document.querySelectorAll("[data-add]").forEach(function (b) { var on = !!state.addons[b.dataset.add]; b.setAttribute("aria-pressed", on); b.textContent = on ? "Added" : "Add"; });
    document.querySelectorAll("[data-stay]").forEach(function (b) { var on = state.stay === b.dataset.stay; b.setAttribute("aria-pressed", on); b.textContent = on ? "Added" : "Add"; });
  }

  /* ---------- events ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button, a"); if (!t) return;
    if (t.dataset.plan) { state.pkg = t.dataset.plan; render(); $("#plan").scrollIntoView(); return; }
    if (t.dataset.add) { var id = t.dataset.add; if (state.addons[id]) delete state.addons[id]; else state.addons[id] = 1; render(); return; }
    if (t.dataset.stay) { state.stay = state.stay === t.dataset.stay ? "" : t.dataset.stay; render(); return; }
    if (t.dataset.rm) { delete state.addons[t.dataset.rm]; render(); return; }
    if (t.dataset.send) { send(t.dataset.send, t, e); return; }
    var stepEl = t.closest(".step");
    if (stepEl && t.dataset.d) {
      var d = +t.dataset.d;
      if (stepEl.dataset.step === "adults") state.adults = Math.max(1, Math.min(60, state.adults + d));
      else if (stepEl.dataset.step === "kids") state.kids = Math.max(0, Math.min(60, state.kids + d));
      else if (stepEl.dataset.aq) { var q = state.addons[stepEl.dataset.aq] + d; if (q < 1) delete state.addons[stepEl.dataset.aq]; else state.addons[stepEl.dataset.aq] = Math.min(20, q); }
      render();
    }
  });
  $("#fPkg").addEventListener("change", function (e) { state.pkg = e.target.value; render(); });
  $("#fStay").addEventListener("change", function (e) { state.stay = e.target.value; render(); });
  $("#fNights").addEventListener("input", function (e) { state.nights = Math.max(1, Math.min(14, +e.target.value || 1)); render(); });
  $("#fDate").addEventListener("input", function (e) { state.date = e.target.value; });
  $("#fName").addEventListener("input", function (e) { state.name = e.target.value.trim(); });
  $("#fPhone").addEventListener("input", function (e) { state.phone = e.target.value.trim(); });
  $("#fNote").addEventListener("input", function (e) { state.note = e.target.value.trim(); });

  /* ---------- sending ---------- */
  function niceDate(iso) { var d = new Date(iso + "T00:00:00"); return d.toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
  function buildMessage() {
    var p = byId(D.packages, state.pkg), L = lines(), out = [];
    out.push("Hi " + D.name + "! I'd like to book:");
    out.push("Package: " + p.title);
    out.push("Date: " + niceDate(state.date));
    out.push("Guests: " + state.adults + " adult" + (state.adults === 1 ? "" : "s") + (state.kids ? ", " + state.kids + " kid" + (state.kids === 1 ? "" : "s") : ""));
    var ex = L.rows.slice(1 + (state.kids ? 1 : 0)).map(function (r) { return "- " + r[0]; });
    if (ex.length) { out.push("Add-ons and stay:"); out = out.concat(ex); }
    out.push("Estimated total: " + fmt(L.total));
    out.push("Name: " + state.name);
    if (state.phone) out.push("Mobile: " + state.phone);
    if (state.note) out.push("Notes: " + state.note);
    out.push("Is this date available?");
    return out.join("\n");
  }
  function validate() {
    var miss = [];
    document.querySelectorAll(".field.bad").forEach(function (f) { f.classList.remove("bad"); });
    if (!state.date) { miss.push("travel date"); $("#fDate").closest(".field").classList.add("bad"); }
    if (!state.name) { miss.push("your name"); $("#fName").closest(".field").classList.add("bad"); }
    $("#sumErr").textContent = miss.length ? "Add " + miss.join(" and ") + " so we can check availability." : "";
    return !miss.length;
  }
  function copy(text) { return (navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { return true; }, function () { return false; }); }
  function send(kind, el, ev) {
    if (!validate()) { if (ev) ev.preventDefault(); $("#fDate").focus(); if (state.date) $("#fName").focus(); return; }
    var msg = buildMessage(), c = D.contact;
    if (kind === "copy") { copy(msg).then(function (ok) { toast(ok ? "Message copied. Paste it in any chat." : "Couldn't copy. Select the text and copy it manually."); }); return; }
    el.target = "_blank"; el.rel = "noopener";
    if (kind === "messenger") { el.href = "https://m.me/" + encodeURIComponent(c.messengerPage); copy(msg).then(function (ok) { toast(ok ? "Message copied. Paste it in the chat that opens." : "Messenger will open. Type your details in the chat."); }); return; }
    if (kind === "whatsapp") { el.href = "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(msg); return; }
    if (kind === "sms") { el.href = "sms:" + c.phone + "?&body=" + encodeURIComponent(msg); toast("If your messaging app doesn't open, text us at " + c.phone + "."); }
  }
  window.__buildMessage = buildMessage; // for testing

  /* ---------- mobile bar ---------- */
  var bar = $("#bar"), plan = $("#plan"), hero = $("#hero");
  var vis = { plan: false, hero: true };
  function barState() { bar.hidden = vis.plan || vis.hero; }
  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; }); barState(); }, { threshold: 0.4 });
    io2.observe(plan); io2.observe(hero);
  }

  render();
})();
