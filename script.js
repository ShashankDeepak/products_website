// document.getElementById("search-field").addEventListener("focus", function () {
//   this.setAttribute("placeholder", "");
// });

// document.getElementById("search-field").addEventListener("blur", function () {
//   this.setAttribute("placeholder", "Enter page number");
// });

// const event = new KeyboardEvent("keydown", {
//   key: "Enter",
//   code: "Enter",
//   which: 13,
//   keyCode: 13,
// });

// document
//   .getElementById("search-field")
//   .addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       const pageNumber = parseInt(this.value);
//       if (!isNaN(pageNumber)) {
//         getAllProductsbyPage(this.value);
//       } else {
//         getAllProducts();
//       }
//     }
//   });
document.addEventListener("DOMContentLoaded", function () {
  getAllCategories();
  getAllProducts();
});

// async function getAllProductsbyPage(number) {
//   fetch(`https://fakestoreapi.com/products/${number}`)
//     .then((res) => res.json())
//     .then((json) => bindProducts(json));
// }

async function getAllProducts() {
  await fetch("https://fakestoreapi.com/products?limit=150")
    .then((res) => res.json())
    .then((json) => bindProducts(json));
}

function bindProducts(data) {
  productList = document.getElementById("products-list");
  productTemplate = document.getElementById("product-template");

  productList.innerHTML = "";

  data.forEach((element) => {
    clone = productTemplate.content.cloneNode(true);
    fillProductClone(clone, element);
    productList.appendChild(clone);
  });
}

function fillProductClone(clone, element) {
  const image = clone.querySelector("#image");
  image.src = element.image;

  const name = clone.querySelector(".product-name");
  name.innerHTML = "</br>" + element.title;

  const price = clone.querySelector(".product-price");
  price.innerHTML = "</br>Rs. " + element.price;

  const container = clone.querySelector(".product-container");
  container.addEventListener("click", () => {
    window.location.href = `./product_description/product_desc.html?id=${element.id}`;
  });
}

async function getAllCategories() {
  await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => bindCategories(json));
}

async function getProductByCategory(category) {
  await fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then((res) => res.json())
    .then((json) => bindProducts(json));
}

function bindCategories(categories) {
  navBar = document.getElementById("nav-bar");
  navTemplate = document.getElementById("nav-template");
  categories.unshift("All");
  // navBar.appendChild(clone);
  categories.forEach((category) => {
    console.log(category);
    clone = navTemplate.content.cloneNode(true);
    fillCategory(clone, category);
    navBar.appendChild(clone);
  });
}

function fillCategory(clone, category) {
  const name = clone.querySelector(".nav-button");
  name.innerHTML = category;
  if (category == "All") {
    name.addEventListener("click", () => getAllProducts());
  } else {
    name.addEventListener("click", () => getProductByCategory(category));
  }
}
