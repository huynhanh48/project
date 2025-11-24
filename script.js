let pageSize = 8;
let current = 1;
let previous, next;
let start = (current - 1) * pageSize;
let end = current * pageSize;
let count;
let lst = [];
window.addEventListener("resize", () => {
  const newSize = window.innerWidth <= 991 ? 4 : 8;

  if (newSize !== pageSize) {
    pageSize = newSize;
    current = 1;

    start = 0;
    end = pageSize;

    init(); // load lại giao diện
  }
});
async function getProduct() {
  const url = "https://fakestoreapi.com/products";
  const loading = document.querySelector(".loading");
  const list = document.querySelector(".hero__product");
  loading.style.display = "block";
  list.style.display = "none";

  const response = await fetch(url);
  const products = await response.json();
  count = Math.ceil(products.length / pageSize);
  const productsToShow = products.slice(start, end);
  lst = products;
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
//  --------search product--------
const input = document.querySelector("#nav_search");
input.addEventListener("input", (e) => {
  const search = document.querySelector(".search__result");
  search.innerHTML = "";

  const searchValue = e.target.value.toLowerCase();
  if (searchValue) {
    search.style.display = "flex";
  } else {
    search.style.display = "none";
  }

  const result = lst.filter((item) => {
    return item.title.toLowerCase().includes(searchValue);
  });
  if (result.length > 0) {
    result.forEach((product) => {
      const { id, title, price, image, description } = product;
      const btn = document.createElement("button");
      btn.classList.add("search__btn");
      btn.addEventListener("click", (e) => {
        showProductItem(product);
        $("#exampleModal").modal("show");
      });
      btn.innerHTML = `
    <img src="${image}" class="search__img" alt="">
                            <p class="search__result-title">${title}</p>
    `;
      search.appendChild(btn);
    });
  } else {
    const btn = document.createElement("button");
    btn.style = `
    height:100%;
    `;
    btn.innerHTML = `
                            <p class="search__result-empty">Không tìm thấy sản phẩm</p>
    `;
    search.appendChild(btn);
  }
});
const menu = document.querySelector(".toggle__menu");
menu.addEventListener("click", () => {
  const overlay = document.querySelector(".menu__overlay");
  const drawer = document.querySelector(".menu__drawer");
  overlay.style.display = "block";
  drawer.style.display = "block";
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    drawer.style.display = "none";
  });
});
function pagingationNav() {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  previous = 1;
  next = count;

  for (let i = previous; i <= next; i++) {
    const li = document.createElement("li");
    li.classList.add("page-item");

    li.innerHTML = `
      <a class="page-link" href="#">${i}</a>
    `;

    li.addEventListener("click", async () => {
      current = i;
      start = (current - 1) * pageSize;
      end = current * pageSize;
      await getProduct();
    });

    pagination.appendChild(li);
  }
}
async function init() {
  await getProduct();
  pagingationNav();
}

init();
