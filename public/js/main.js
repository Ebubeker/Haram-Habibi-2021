function setVideoSize() {
    const vidWidth = 1920;
    const vidHeight = 1080;
    let windowWidth = window.innerWidth;
    let newVidWidth = windowWidth;
    let newVidHeight = windowWidth * vidHeight / vidWidth;
    let marginLeft = 0;
    let marginTop = 0;

    if (newVidHeight < 500) {
        newVidHeight = 500;
        newVidWidth = newVidHeight * vidWidth / vidHeight;
    }

    if (newVidWidth > windowWidth) {
        marginLeft = -((newVidWidth - windowWidth) / 2);
    }

    if (newVidHeight > 720) {
        marginTop = -((newVidHeight - $('#tm-video-container').height()) / 2);
    }

    const tmVideo = $('#tm-video');

    tmVideo.css('width', newVidWidth);
    tmVideo.css('height', newVidHeight);
    tmVideo.css('margin-left', marginLeft);
    tmVideo.css('margin-top', marginTop);
}

$(document).ready(function() {
    /************** Video background *********/

    setVideoSize();

    // Set video background size based on window size
    let timeout;
    window.onresize = function() {
        clearTimeout(timeout);
        timeout = setTimeout(setVideoSize, 100);
    };

    // Play/Pause button for video background      
    const btn = $("#tm-video-control-button");

    btn.on("click", function(e) {
        const video = document.getElementById("tm-video");
        $(this).removeClass();

        if (video.paused) {
            video.play();
            $(this).addClass("fas fa-pause");
        } else {
            video.pause();
            $(this).addClass("fas fa-play");
        }
    });
})

///Javascript

let catalogHome = document.getElementById('home-catalog');
let allProducts = [];

fetch('../json/products.json')
    .then(response => response.json())
    .then(data => {
        let count = 0;
        allProducts = data;
        data.forEach(prodInfo => {
            if (count !== 3) {
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
                catalogHome.appendChild(product)
                count++;
            }
        });
    });

let catalogItem = document.getElementById('product');

function affiliateLink(id) {
    allProducts.forEach(product => {
        if (product.id === id) {
            window.open(product.affiliate_link)
        }
    })
};

//Filter

let mix = document.getElementById('mix'),
    women = document.getElementById('women'),
    men = document.getElementById('men'),
    children = document.getElementById('children'),
    accessories = document.getElementById('accessories');

mix.addEventListener('click', () => {

    let elements = [mix, women, men, children, accessories];

    elements.forEach((element) => {
        element.classList.remove('active');
    })

    mix.classList.add('active');

    catalogHome.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (count !== 3) {
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
                    catalogHome.appendChild(product)
                    count++;
                }
            });
        });
});

women.addEventListener('click', () => {

    let elements = [mix, women, men, children, accessories];

    elements.forEach((element) => {
        element.classList.remove('active');
    })

    women.classList.add('active');

    catalogHome.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (count !== 3) {
                    if (prodInfo.category === "Women") {
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
                        catalogHome.appendChild(product)
                        count++;
                    }
                }
            });
        });
});

men.addEventListener('click', () => {

    let elements = [mix, women, men, children, accessories];

    elements.forEach((element) => {
        element.classList.remove('active');
    })

    men.classList.add('active');

    catalogHome.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (count !== 3) {
                    if (prodInfo.category === "Men") {
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
                        catalogHome.appendChild(product)
                        count++;
                    }
                }
            });
        });
});

children.addEventListener('click', () => {

    let elements = [mix, women, men, children, accessories];

    elements.forEach((element) => {
        element.classList.remove('active');
    })

    children.classList.add('active');

    catalogHome.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (count !== 3) {
                    if (prodInfo.category === "Children") {
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
                        catalogHome.appendChild(product)
                        count++;
                    }
                }
            });
        });
});

accessories.addEventListener('click', () => {

    let elements = [mix, women, men, children, accessories];

    elements.forEach((element) => {
        element.classList.remove('active');
    })

    accessories.classList.add('active');

    catalogHome.innerHTML = '';

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            let count = 0;
            allProducts = data;
            data.forEach(prodInfo => {
                if (count !== 3) {
                    if (prodInfo.category === "Accessories") {
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
                        catalogHome.appendChild(product)
                        count++;
                    }
                }
            });
        });
});

//Blog part

let blog = document.getElementById('home-blog');
let allBlogs = [];

fetch('../json/blogs.json')
    .then(response => response.json())
    .then(data => {
        let count = 0;
        allBlogs = data;
        data.forEach(prodInfo => {
            if (count !== 3) {
                let product = document.createElement('div');
                product.classList.add('col-lg-4', 'col-md-6', 'col-sm-12', 'tm-catalog-item');
                product.onclick = function() {
                    let id = prodInfo.id;
                    blogLink(id)
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
                blog.appendChild(product)
                count++;
            }
        });
    });

function blogLink(id) {
    allBlogs.forEach(product => {
        if (product.id === id) {
            window.open(product.affiliate_link)
        }
    })
};