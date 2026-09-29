// Submenú "Dynamic Catalog" del menú lateral
const catalogToggle = document.getElementById('catalogToggle');
const catalogSubmenu = document.getElementById('catalogSubmenu');

function setSubmenu(open) {
  catalogToggle.classList.toggle('open', open);
  catalogSubmenu.classList.toggle('open', open);
}

catalogToggle.addEventListener('click', () => {
  setSubmenu(!catalogSubmenu.classList.contains('open'));
});

// En las páginas del catálogo dinámico el submenú aparece abierto
if (document.body.dataset.page) {
  setSubmenu(true);
}