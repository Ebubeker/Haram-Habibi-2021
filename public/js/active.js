let home = document.getElementById('Home'),
    about = document.getElementById('About'),
    products = document.getElementById('Products'),
    collaborations = document.getElementById('Collaboration'),
    contact = document.getElementById('Contact');

let array = [home, about, products, collaborations, contact];

array.forEach((arr) => {
    arr.classList.remove('active');
});

switch (window.location.href.split('/')[3]) {
    case 'blogs':
        home.classList.add('active')
        break;
    case 'about':
        about.classList.add('active')
        break;
    case 'product':
        products.classList.add('active')
        break;
    case 'collaborations':
        collaborations.classList.add('active')
        break;
    case 'contact':
        contact.classList.add('active')
        break;
}