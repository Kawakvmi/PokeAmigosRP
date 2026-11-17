// Restore the chosen theme before the stylesheet paints, including on file://.
(() => {
  let theme = 'light';
  try {
    if (localStorage.getItem('poke-amigos-theme') === 'dark') theme = 'dark';
  } catch { /* The switch still works when browser storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#170f25' : '#542394');
})();
