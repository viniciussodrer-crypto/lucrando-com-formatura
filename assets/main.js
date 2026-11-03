// Contagem regressiva até o fim do dia ("somente hoje"), reinicia todo dia à meia-noite.
(function () {
  var el = document.getElementById('timer');
  if (!el) return;
  var out = {
    d: el.querySelector('[data-t="d"]'),
    h: el.querySelector('[data-t="h"]'),
    m: el.querySelector('[data-t="m"]'),
    s: el.querySelector('[data-t="s"]')
  };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var now = new Date();
    var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    var diff = Math.max(0, Math.floor((end - now) / 1000));
    out.d.textContent = '00';
    out.h.textContent = pad(Math.floor(diff / 3600));
    out.m.textContent = pad(Math.floor((diff % 3600) / 60));
    out.s.textContent = pad(diff % 60);
  }
  tick();
  setInterval(tick, 1000);
})();

// Repassa os UTMs do anúncio (e src/xcod) para os links de checkout da Hotmart.
// Sem UTM na URL, marca utm_source=organic. O "sck" fica a cargo do track1click.
(function () {
  var page = new URLSearchParams(location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'src', 'xcod'];
  var hasUtm = keys.some(function (k) { return page.get(k); });
  document.querySelectorAll('a[href*="pay.hotmart.com"]').forEach(function (a) {
    var u = new URL(a.href);
    keys.forEach(function (k) { if (page.get(k) && !u.searchParams.get(k)) u.searchParams.set(k, page.get(k)); });
    if (!hasUtm && !u.searchParams.get('utm_source')) u.searchParams.set('utm_source', 'organic');
    a.href = u.toString();
  });
})();

// Setas do carrossel (no mobile o carrossel é arrastável com o dedo).
document.querySelectorAll('[data-carousel]').forEach(function (car) {
  var track = car.querySelector('.car-track');
  car.querySelectorAll('.car-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dir = Number(btn.getAttribute('data-dir'));
      track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: 'smooth' });
    });
  });
});
