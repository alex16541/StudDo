let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// Мы прослушиваем событие resize
window.addEventListener('resize', () => {
  // Выполняем тот же скрипт, что и раньше
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
//   window.resizeTo(width, height);
});

