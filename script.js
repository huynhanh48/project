let countPage = 8;
async function getProduct() {
  const url = "https://fakestoreapi.com/products";
  const loading = document.querySelector(".loading");
  const list = document.querySelector(".hero__product");
  loading.style.display = "block";
  list.style.display = "none";

  const response = await fetch(url);
  const products = await response.json();
  const productsToShow = products.slice(0, countPage);

  list.innerHTML = "";
  loading.style.display = "none";
  list.style.display = "grid";
  productsToShow.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("item");

    const id = element.id;
    const title = element.title;
    const price = element.price;
    const img = element.image;
    const rate = Math.round(element.rating.rate);
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
        stars += `<i class="fas fa-star" style="color: gold;"></i>`;
      } else {
        stars += `<i class="fas fa-star" style="color: #ccc;"></i>`;
      }
    }

    item.innerHTML = `
    <img class="product__img" src="${img}" alt="${title}">
    <span class="product__title">${title}</span>
    <div class="product__wrap">
    <div class="product__rate">${stars}</div>
      <p class="product__price">$${price}</p>
    </div>
    <div class="product__button-wrap">
    <button class="product__button" data-toggle="modal" data-target="#exampleModal">Xem chi tiet</button>
    </div>
        
  `;
    const btn = item.querySelector(".product__button");
    btn.addEventListener("click", () => {
      showProductItem(element);
    });
    list.appendChild(item);
  });
}
function showProductItem(product) {
  const { title, price, image, description } = product;
  const titleParrent = document.querySelector(".modal-title");
  const img = document.querySelector(".modal__img");
  const modalTitle = document.querySelector(".modal__title");
  const modalDescription = document.querySelector(".modal__description");
  const modalRate = document.querySelector(".modal__rate");
  const modalPrice = document.querySelector(".modal__price");
  img.src = product.image;
  titleParrent.innerHTML = title;
  modalTitle.innerHTML = title;
  modalDescription.innerHTML = description;
  modalPrice.innerHTML = price;
  console.log(product);
}
getProduct();
