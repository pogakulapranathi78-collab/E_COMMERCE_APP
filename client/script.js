const API = "http://localhost:5000/api";

let allProducts = [];


// SHOW DASHBOARD
function showDashboard() {

  document.getElementById("authBox").style.display = "none";

  document.getElementById("dashboard").style.display = "block";

}


// REGISTER
async function registerUser() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  document.getElementById("authMessage").innerText =
    data.message || "Registered successfully";
}


// LOGIN
async function loginUser() {

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;

  const res = await fetch(
    "http://localhost:5000/api/auth/login",
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })

    }
  );

  const data = await res.json();

  if (data.token) {

    localStorage.setItem(
      "token",
      data.token
    );

    // HIDE LOGIN
    document.getElementById(
      "authBox"
    ).style.display = "none";

    // SHOW DASHBOARD
    document.getElementById(
      "dashboard"
    ).style.display = "block";

    // LOAD PRODUCTS
    getProducts();

  }

  else {

    alert("Invalid Login");

  }

}


// GET PRODUCTS
async function getProducts() {

  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  allProducts = data;

  renderProducts(allProducts);
}


// RENDER PRODUCTS
function renderProducts(products) {

  const container = document.getElementById("products");

  container.innerHTML = "";

  products.forEach(p => {

    container.innerHTML += `
      <div class="card">

        <img src="${p.image}" style="width:100%;height:180px;object-fit:contain;background:white;border-radius:10px;padding:10px"/>

        <h3>${p.title}</h3>
        <p>₹${p.price}</p>

        <button onclick="addToCart('${p.id}', '${p.title}', ${p.price})">
          Add to Cart
        </button>

      </div>
    `;
  });
}


// SEARCH
function searchProducts() {

  const value = document.getElementById("searchBox").value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(value)
  );

  renderProducts(filtered);
}


// ADD TO CART
async function addToCart(id, name, price) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch("http://localhost:5000/api/cart/add", {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },

    body: JSON.stringify({
      productId: id,
      name,
      price,
      quantity: 1
    })

  });

  const data = await res.json();

  console.log("CART ADD RESPONSE:", data);

  alert("Added to cart ✅");
}

  

// AUTO LOAD PRODUCTS ONLY AFTER LOGIN