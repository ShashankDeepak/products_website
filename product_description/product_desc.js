productJson = new Object();

window.addEventListener("DOMContentLoaded", async function () {
  console.log("Dom loaded");
  const querryString = window.location.search;
  const urlParams = new URLSearchParams(querryString);
  const id = urlParams.get("id");
  await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => {
      productJson = json;
      document.querySelector("#title").innerHTML = productJson.title;
      document.querySelector("#description").innerHTML =
        productJson.description;
      document.querySelector("#product-name").innerHTML = productJson.title;
      image = document.querySelector("#product-image");
      image.src = productJson.image;
      // image.style.height = `${screen.height * 0.4}px`;
      // image.style.width = `${screen.height * 0.35}px`;
      document.querySelector("#price").innerHTML = "Rs. " + productJson.price;
    });

  bckButton = document.getElementById("back-icon");
  bckButton.addEventListener("click", function () {
    window.location.href = "./../index.html";
  });
});
