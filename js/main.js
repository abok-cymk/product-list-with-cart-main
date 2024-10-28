
const cardContainer = document.getElementById("card-container");

const data = [
    {
       "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
       },
       "name": "Waffle with Berries",
       "category": "Waffle",
       "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
     },
     {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
     }
]

data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card")

    const thumbnail = document.createElement("div");
    thumbnail.classList.add("thumbnail");
    
    const cardThumbnail = document.createElement("img");
    cardThumbnail.classList.add("card-thumbnail");
    cardThumbnail.src = item.image.thumbnail;
    cardThumbnail.alt = item.name

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("card-details");

    const foodCategory = document.createElement("span");
    foodCategory.classList.add("category");
    foodCategory.textContent = item.category;

    const categoryName = document.createElement("h4");
    categoryName.classList.add("category-name");
    categoryName.textContent = item.name;

    const categoryPrice = document.createElement("p");
    categoryPrice.classList.add("category-price");
    categoryPrice.textContent = "$" + item.price.toFixed(2);

    const cart = document.createElement("div");
    cart.classList.add("cart")

    
    const cartIconPath = "/assets/images/icon-add-to-cart.svg";
    const cartSvgIcon = document.createElement("img");
    cartSvgIcon.classList.add("cart-icon");
    cartSvgIcon.src = `${cartIconPath}`;
    
    const toCartButton = document.createElement("button");
    toCartButton.classList.add("add-to-cart");
    toCartButton.textContent = "Add to Cart"


    card.appendChild(thumbnail);
    card.appendChild(cardDetails);
    card.appendChild(cart);
    thumbnail.appendChild(cardThumbnail);
    cardDetails.appendChild(foodCategory);
    cardDetails.appendChild(categoryName);
    cardDetails.appendChild(categoryPrice);
    toCartButton.insertAdjacentElement("afterbegin", cartSvgIcon);
    cart.appendChild(toCartButton);
    cardContainer.appendChild(card);
});
  