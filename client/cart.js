const API = "http://localhost:5000/api";

// BACK TO STORE
function goBack() {
  window.location.href = "index.html";
}


// LOAD CART
async function loadCart() {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch(`${API}/cart`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  const container = document.getElementById("cartItems");

  container.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = "<h3>Your cart is empty 🛒</h3>";
    return;
  }

  data.forEach(item => {

    container.innerHTML += `
      <div class="cart-card">

        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <p>Qty: ${item.quantity}</p>

        <button onclick="removeItem('${item._id}')">
          Remove
        </button>

      </div>
    `;
  });
}


// REMOVE ITEM
async function removeItem(id) {

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/cart/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();

  console.log(data);

  loadCart();
}


// AUTO LOAD
loadCart();