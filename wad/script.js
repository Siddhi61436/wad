const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");

// Fetch items from the database when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchItems();
});

// Add event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemNameInput = document.getElementById("itemName");
  const itemName = itemNameInput.value;

  // Send POST request to backend to add item
  fetch("/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: itemName }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Clear input field and update item list
      itemNameInput.value = "";
      fetchItems();
    })
    .catch((error) => console.error("Error:", error));
});

// Function to fetch items from the database
function fetchItems() {
  itemList.innerHTML = ""; // Clear previous items
  fetch("/api/items")
    .then((response) => response.json())
    .then((items) => {
      // Display items in the list
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.name;

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
          deleteItem(item._id);
        });

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Function to delete an item
function deleteItem(itemId) {
  // Send DELETE request to backend to delete item
  fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      // Update item list
      fetchItems();
    })
    .catch((error) => console.error("Error:", error));
}
