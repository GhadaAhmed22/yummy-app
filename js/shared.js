// shared.js
export function toggleSidebar() {
  document.querySelector('.side-bar').classList.toggle('active');
  document.querySelector('.close').classList.toggle('d-none');
  document.querySelector('.menu-bar').classList.toggle('d-none');
}