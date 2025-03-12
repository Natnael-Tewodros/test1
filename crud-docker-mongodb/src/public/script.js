document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');
    const itemList = document.getElementById('itemList');

    // Fetch and display items
    const fetchItems = async () => {
        const response = await fetch('/items');
        const items = await response.json();
        itemList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name}: ${item.description}
                <button onclick="deleteItem('${item._id}')">Delete</button>
            `;
            itemList.appendChild(li);
        });
    };

    // Add item
    itemForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });

        itemForm.reset();
        fetchItems();
    });

    // Delete item
    window.deleteItem = async (id) => {
        await fetch(`/items/${id}`, {
            method: 'DELETE'
        });
        fetchItems();
    };

    fetchItems();
});