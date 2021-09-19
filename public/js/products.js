let products = document.getElementById('products');
let allProducts = [];

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        let count = 0;
        allProducts = data;
        data.forEach(prodInfo => {
            if (count !== 12) {
                let product = document.createElement('div');
                product.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'tm-catalog-item');
                product.onclick = function() {
                    let id = prodInfo.id;
                    affiliateLink(id)
                };
                product.id = `product-${prodInfo.id}`;
                product.innerHTML = `
                            <div class="position-relative tm-thumbnail-container">
                                <img src="img/tn-01.jpg" alt="Image" class="img-fluid tm-catalog-item-img">
                                <a href="video-page.html" class="position-absolute tm-img-overlay">
                                    <i class="fas fa-play tm-overlay-icon"></i>
                                </a>
                            </div>
                            <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                <h3 class="tm-text-black font-weight-bold mb-3 tm-catalog-item-title">${prodInfo.title}</h3>
                                <p class="tm-catalog-item-text">${prodInfo.description}</p>
                                <p class="font-weight-bold">${prodInfo.price} USD</p>
                            </div>
                            `
                products.appendChild(product)
                count++;
            }
        });
        displayNumbers(allProducts.length);
    });

let nextBack = document.getElementById('next-back');

let catalogItem = document.getElementById('product');

function displayNumbers(productsNumber) {
    let fullNumber = parseInt(productsNumber / 12);
    if ((productsNumber % 12) > 0) {
        fullNumber++;
    }
    console.log(fullNumber)

    for (let i = 0; i < fullNumber; i++) {
        let number = document.createElement('li');
        if (i === 0) {
            number.classList.add('nav-item', 'active')
        } else {
            number.classList.add('nav-item')
        }
        number.innerHTML = `<a href="#" class="nav-link tm-paging-link" onclick="moveOn(${(i+1)*12-12})">${i + 1}</a>`;
        nextBack.appendChild(number);
    }
}

function moveOn(num) {

    products.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (prodInfo.id + 1 > num) {
                    if (count !== 12) {
                        let product = document.createElement('div');
                        product.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'tm-catalog-item');
                        product.onclick = function() {
                            let id = prodInfo.id;
                            affiliateLink(id)
                        };
                        product.id = `product-${prodInfo.id}`;
                        product.innerHTML = `
                            <div class="position-relative tm-thumbnail-container">
                                <img src="img/tn-01.jpg" alt="Image" class="img-fluid tm-catalog-item-img">
                                <a href="video-page.html" class="position-absolute tm-img-overlay">
                                    <i class="fas fa-play tm-overlay-icon"></i>
                                </a>
                            </div>
                            <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                <h3 class="tm-text-black font-weight-bold mb-3 tm-catalog-item-title">${prodInfo.title}</h3>
                                <p class="tm-catalog-item-text">${prodInfo.description}</p>
                                <p class="font-weight-bold">${prodInfo.price} USD</p>
                            </div>
                            `
                        products.appendChild(product)
                        count++;
                    }
                }
            });
        });
}

function affiliateLink(id) {
    allProducts.forEach(product => {
        if (product.id === id) {
            window.open(product.affiliate_link)
        }
    })
};

//filter

let mix = document.getElementById('mix'),
    women = document.getElementById('women'),
    men = document.getElementById('men'),
    children = document.getElementById('children'),
    accessories = document.getElementById('accessories');

women.addEventListener('click', filtering(women, 'Women'))
men.addEventListener('click', filtering(men, 'Men'))
children.addEventListener('click', filtering(children, 'Children'))
accessories.addEventListener('click', filtering(accessories, 'Accessories'))

function filtering(filter, name) {
    filter.addEventListener('click', () => {

        let elements = [mix, women, men, children, accessories];

        elements.forEach((element) => {
            element.classList.remove('active');
        })

        filter.classList.add('active');

        products.innerHTML = '';

        fetch('../json/products.json')
            .then(response => response.json())
            .then(data => {
                let count = 0;
                allProducts = data;
                data.forEach(prodInfo => {
                    if (count !== 3) {
                        if (prodInfo.category === name) {
                            let product = document.createElement('div');
                            product.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'tm-catalog-item');
                            product.onclick = function() {
                                let id = prodInfo.id;
                                affiliateLink(id)
                            };
                            product.id = `product-${prodInfo.id}`;
                            product.innerHTML = `
                                <div class="position-relative tm-thumbnail-container">
                                    <img src="img/tn-01.jpg" alt="Image" class="img-fluid tm-catalog-item-img">
                                    <a href="video-page.html" class="position-absolute tm-img-overlay">
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-black font-weight-bold mb-3 tm-catalog-item-title">${prodInfo.title}</h3>
                                    <p class="tm-catalog-item-text">${prodInfo.description}</p>
                                    <p class="font-weight-bold">${prodInfo.price} USD</p>
                                </div>
                                `
                            products.appendChild(product)
                            count++;
                        }
                    }
                });
            });
    });
}