export const NavMenu = (
  menuItems = [
    { name: 'example', fn: undefined, id: undefined },
    { name: 'example', fn: undefined, id: undefined },
    { name: 'example', fn: undefined, id: undefined },
  ],
) => {
  console.log('Działa Menu!');

  // * set nav
  const navMenuDomObj = document.createElement('nav');
  navMenuDomObj.classList.add('navMenu');
  navMenuDomObj.id = 'navMenu';

  // * set menu list
  const navMenuDomObj__list = document.createElement('ul');
  navMenuDomObj__list.classList.add('navMenu');
  navMenuDomObj.appendChild(navMenuDomObj__list);

  // * set list items
  menuItems.map((item) => {
    const navMenuDomObj__item = document.createElement('li');
    navMenuDomObj__item.innerHTML = `
    <button 
    class='${'navMenuDomObj__item'}'
    id='${item.id}'>
    ${item.name}
    </button>
    `;
    navMenuDomObj__list.appendChild(navMenuDomObj__item);
  });

  // imageWrapper.style.backgroundImage = `url(${image})`;

  return navMenuDomObj;
};
