const products = [
    {
        id: 0,
        image: 'product-images/yotsuba1.jpg',
        title: 'Yotsuba Revoltech Figma',
        review: 'Review pages/Yotsubafig.html',
        price: 50,
    },
    {
        id: 1,
        image: 'product-images/meguminfig.png',
        title: 'Megumin GoodSmile Figma',
        review: 'Review pages/Meguminfig.html',
        price: 80,
    },
    {
        id: 2,
        image: 'product-images/Arcueidfig.jpg',
        title:  'Arcueid GoodSmile Figma DX Edition',
        review: 'Review pages/Arcueidfig.html',
        price: 120,
    },

    {
        id: 3,
        image: 'product-images/Pekorafig.jpg',
        title: 'Usada Pekora GoodSmile Figma',
        review: 'Review pages/Pekorafig.html',
        price: 60,
    },
    {
        id: 4,
        image: 'product-images/Asunafig.jpg',
        title: 'Asuna Suna Stacia Figure',
        review: 'Review pages/Asunafig.html',
        price: 80,
    },
    {
        id: 5,
        image: 'product-images/MonaFig.jpg',
        title:  'Mona GoodSmile Figma',
        review: 'Review pages/Monafig.html',
        price: 70,
    },

    {
        id: 6,
        image: 'product-images/kobenifig.jpg',
        title: 'Kobeni GoodSmile Nendoroid',
        review: 'Review pages/Kobenifig.html',
        price: 50,
    },
    {
        id: 7,
        image: 'product-images/gojofig.png',
        title: '1/4 Scale Satoru Gojo Figure',
        review: 'Review pages/GojoFig.html',
        price: 70,
    },
    {
        id: 8,
        image: 'product-images/csmdvd.jpg',
        title:  'Chain Saw Man Season 1 DvD',
        review: 'Anime Review pages/csm.html',
        price: 30,
    },

    {
        id: 9,
        image: 'product-images/jjkseason0.jpg',
        title: 'Jujutsu Kaisen Season 0 DVD',
        review: 'Anime Review pages/jjk.html',
        price: 30,
    },
    {
        id: 10,
        image: 'product-images/jjkseason1.jpg',
        title: 'Jujutsu Kaisen Season 1 DVD',
        review: 'Anime Review pages/jjk.html',
        price: 30,
    },
    {
        id: 11,
        image: 'product-images/ponyadvd.jpg',
        title:  'Ponya Movie DvD',
        review: 'Review pages/ponyo.html',
        price: 30,
    },

    {
        id: 12,
        image: 'product-images/spyxfamdvd.png',
        title:  'Spy X Family Season 1 DVD',
        review: 'Review pages/spyxfamily.html',
        price: 30,
    },


    {
        id: 13,
        image: 'product-images/tokyorevs1dvd.jpg',
        title:  'Tokyo Revengers Season 1 DvD',
        review: 'Review pages/tokyorev.html',
        price: 30,
    },

    {
        id: 14,
        image: 'product-images/tokyorevs2dvd.jpg',
        title:  'Tokyo Revengers Season 2 DvD',
        review: 'Review pages/tokyorev.html',
        price: 30,
    },

    {
        id: 15,
        image: 'product-images/yotsubavol1.jpg',
        title:  'Yotsuba Manga Volume 1',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },

    {
        id: 16,
        image: 'product-images/yotsubavol2.jpg',
        title:  'Yotsuba Manga Volume 2',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 17,
        image: 'product-images/yotsubavol3.jpg',
        title:  'Yotsuba Manga Volume 3',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 18,
        image: 'product-images/yotsubavol4.jpg',
        title:  'Yotsuba Manga Volume 4',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 19,
        image: 'product-images/yotsubavol5.jpg',
        title:  'Yotsuba Manga Volume 5',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 20,
        image: 'product-images/yotsubavol6.jpg',
        title:  'Yotsuba Manga Volume 6',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 21,
        image: 'product-images/yotsubavol7.jpg',
        title:  'Yotsuba Manga Volume 7',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 22,
        image: 'product-images/yotsubavol8.jpg',
        title:  'Yotsuba Manga Volume 8',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 23,
        image: 'product-images/yotsubavol9.jpg',
        title:  'Yotsuba Manga Volume 9',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 24,
        image: 'product-images/yotsubavol10.jpg',
        title:  'Yotsuba Manga Volume 10',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 25,
        image: 'product-images/yotsubavol11.jpg',
        title:  'Yotsuba Manga Volume 11',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 26,
        image: 'product-images/yotsubavol12.jpg',
        title:  'Yotsuba Manga Volume 12',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 27,
        image: 'product-images/yotsubavol13.jpg',
        title:  'Yotsuba Manga Volume 13',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 28,
        image: 'product-images/yotsubavol14.jpg',
        title:  'Yotsuba Manga Volume 14',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },
    {
        id: 29,
        image: 'product-images/yotsubavol15.jpg',
        title:  'Yotsuba Manga Volume 15',
        review: 'manga review pages/yotsubamanga.html',
        price: 30,
    },

    {
        id: 15,
        image: 'product-images/nisekoivol1.jpg',
        title:  'Nisekoi Manga Volume 1',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },

    {
        id: 16,
        image: 'product-images/nisekoivol2.jpg',
        title:  'Nisekoi Manga Volume 2',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 17,
        image: 'product-images/nisekoivol3.jpg',
        title:  'Nisekoi Manga Volume 3',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 18,
        image: 'product-images/nisekoivol4.jfif',
        title:  'Nisekoi Manga Volume 4',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 19,
        image: 'product-images/nisekoivol5.jpg',
        title:  'Nisekoi Manga Volume 5',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 20,
        image: 'product-images/nisekoivol6.jpg',
        title:  'Nisekoi Manga Volume 6',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 21,
        image: 'product-images/nisekoivol7.jpg',
        title:  'Nisekoi Manga Volume 7',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 22,
        image: 'product-images/nisekoivol8.jpg',
        title:  'Nisekoi Manga Volume 8',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 23,
        image: 'product-images/nisekoivol9.jpg',
        title:  'Nisekoi Manga Volume 9',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 24,
        image: 'product-images/nisekoivol10.jpg',
        title:  'Nisekoi Manga Volume 10',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 25,
        image: 'product-images/nisekoivol11.jpg',
        title:  'Nisekoi Manga Volume 11',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 26,
        image: 'product-images/nisekoivol12.jpg',
        title:  'Nisekoi Manga Volume 12',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 27,
        image: 'product-images/nisekoivol13.jpg',
        title:  'Nisekoi Manga Volume 13',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 28,
        image: 'product-images/nisekoivol14.jpg',
        title:  'Nisekoi Manga Volume 14',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 29,
        image: 'product-images/nisekoivol15.jpg',
        title:  'Nisekoi Manga Volume 15',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },

    {
        id: 30,
        image: 'product-images/nisekoivol16.jpg',
        title:  'Nisekoi Manga Volume 16',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 31,
        image: 'product-images/nisekoivol17.jpg',
        title:  'Nisekoi Manga Volume 17',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 32,
        image: 'product-images/nisekoivol18.jpg',
        title:  'Nisekoi Manga Volume 18',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 33,
        image: 'product-images/nisekoivol19.jpg',
        title:  'Nisekoi Manga Volume 19',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 34,
        image: 'product-images/nisekoivol20.jpg',
        title:  'Nisekoi Manga Volume 20',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 35,
        image: 'product-images/nisekoivol21.jpg',
        title:  'Nisekoi Manga Volume 21',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 36,
        image: 'product-images/nisekoivol22.jpg',
        title:  'Nisekoi Manga Volume 22',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 37,
        image: 'product-images/nisekoivol23.jpg',
        title:  'Nisekoi Manga Volume 23',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 38,
        image: 'product-images/nisekoivol24.jpg',
        title:  'Nisekoi Manga Volume 24',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 39,
        image: 'product-images/nisekoivol25.jpg',
        title:  'Nisekoi Manga Volume 25',
        review: 'manga review pages/Nisekoi.html',
        price: 30,
    },
    {
        id: 40,
        image: 'product-images/azuvolume1.jpg',
        title:  'Azumanga Daioh Manga Volume 1',
        review: 'manga review pages/Azumanga.html',
        price: 30,
    },

    {
        id: 41,
        image: 'product-images/azuvolume2.jpg',
        title:  'Azumanga Daioh Manga Volume 2',
        review: 'manga review pages/Azumanga.html',
        price: 30,
    },

    {
        id: 42,
        image: 'product-images/azuvolume3.jpg',
        title:  'Azumanga Daioh Manga Volume 3',
        review: 'manga review pages/Azumanga.html',
        price: 30,
    },

    {
        id: 43,
        image: 'product-images/azuvolume4.jpg',
        title:  'Azumanga Daioh Manga Volume 4',
        review: 'manga review pages/Azumanga.html',
        price: 30,
    },

    {
        id: 44,
        image: 'product-images/Fpvol1.jpg',
        title:  'Fire Punch Manga Volume 1',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 45,
        image: 'product-images/Fpvol2.jpg',
        title:  'Fire Punch Manga Volume 2',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 46,
        image: 'product-images/Fpvol3.jpg',
        title:  'Fire Punch Manga Volume 3',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 47,
        image: 'product-images/Fpvol4.jpg',
        title:  'Fire Punch Manga Volume 4',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 48,
        image: 'product-images/Fpvol5.jpg',
        title:  'Fire Punch Manga Volume 5',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 49,
        image: 'product-images/Fpvol6.jpg',
        title:  'Fire Punch Manga Volume 6',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 50,
        image: 'product-images/Fpvol7.jpg',
        title:  'Fire Punch Manga Volume 7',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 51,
        image: 'product-images/Fpvol8.jpg',
        title:  'Fire Punch Manga Volume 8',
        review: 'manga review pages/Firepunch.html',
        price: 30,
    },

    {
        id: 52,
        image: 'product-images/yourlievol1.jpg',
        title:  'Your Lie In April Manga Volume 1',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 53,
        image: 'product-images/yourlievol2.jpg',
        title:  'Your Lie In April Manga Volume 2',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 54,
        image: 'product-images/yourlievol3.jpg',
        title:  'Your Lie In April Manga Volume 3',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 55,
        image: 'product-images/yourlievol4.jpg',
        title:  'Your Lie In April Manga Volume 4',
        review: 'manga review pages/YourLie.html',
        price: 30,
    }, 

    {
        id: 56,
        image: 'product-images/yourlievol5.jpg',
        title:  'Your Lie In April Manga Volume 5',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 57,
        image: 'product-images/yourlievol6.jpg',
        title:  'Your Lie In April Manga Volume 6',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 58,
        image: 'product-images/yourlievol7.jpg',
        title:  'Your Lie In April Manga Volume 7',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 59,
        image: 'product-images/yourlievol8.jpg',
        title:  'Your Lie In April Manga Volume 8',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 60,
        image: 'product-images/yourlievol9.jpg',
        title:  'Your Lie In April Manga Volume 9',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 61,
        image: 'product-images/yourlievol10.jpg',
        title:  'Your Lie In April Manga Volume 10',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },

    {
        id: 62,
        image: 'product-images/yourlievol11.jpg',
        title:  'Your Lie In April Manga Volume 11',
        review: 'manga review pages/YourLie.html',
        price: 30,
    },
    // Add more products here
];




// Initialize the cart as an empty array or retrieve it from localStorage
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add a product to the cart
function addtocart(productId) {
    const selectedProduct = filteredProducts[productId];
    cart.push(selectedProduct);
    displaycart();

    // Update localStorage with the cart data
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove a product from the cart
function delElement(cartIndex) {
    cart.splice(cartIndex, 1);
    displaycart();

    // Update localStorage with the updated cart data
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display the cart
function displaycart() {
    
    let Total=0
    const cartItems = document.getElementById('cartItem');

    if (cart.length == 0) {
        cartItems.innerHTML = 'Your cart is Empty';
        document.getElementById("Total").innerHTML ="$ "+0+" .00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((item,index) => {
            const { image, title, review, price } = item;
            Total = Total + price;
            document.getElementById("Total").innerHTML = "$" +Total+".00";
            localStorage.setItem("items", JSON.stringify(cart));
            localStorage.setItem("totalPrice",Total);

            return `
                <div class="cart-item">
                    <div class="row-img">
                        <img class="rowimg" src="${image}">
                    </div>
                    <p style="font-size: 12px;">${title}</p>
                    <h2 style="font-size: 15px;">$ ${price}.00</h2>
                    <i class="fa-solid fa-trash-can" onclick="delElement(${index})"></i>
                </div>
            `;
        }).join('');

        document.getElementById('Total').innerHTML = `$ ${totalPrice.toFixed(2)}`;
        document.getElementById('count').innerHTML = cart.length;
    }
}

// Function to filter and display products based on user input
function filterProducts(searchText) {
    filteredProducts = products.filter((product) => {
        // Perform case-insensitive search
        return product.title.toLowerCase().includes(searchText.toLowerCase());
    });

    document.getElementById('root').innerHTML = filteredProducts.map((item, index) => {
        const { image, title, review, price } = item;

        return `
            <div class='figbox'>
                <div class='img-fbox'>
                    <img class='images' src='${image}' alt='${title}'>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <a href='${review}' class='seemore'>See More</a>
                    <h2>$ ${price}.00</h2>
                    <button onclick='addtocart(${index})'>Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Add an event listener to the search input
document.getElementById('searchBar').addEventListener('input', function () {
    const searchText = this.value;
    filterProducts(searchText);
});

// Initial call to display all products
var filteredProducts = products; // Initialize with all products
displaycart(); // Display the cart
