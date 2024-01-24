import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    axios.post('http://localhost:5000/api/items', newItem)
      .then(response => {
        setItems([...items, response.data]);
        setNewItem({ name: '', description: '' });
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const handleUpdateItem = (id, updatedItem) => {
    axios.put(`http://localhost:5000/api/items/${id}`, updatedItem)
      .then(response => {
        const updatedItems = items.map(item => (item._id === id ? response.data : item));
        setItems(updatedItems);
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleDeleteItem = (id) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => {
        const updatedItems = items.filter(item => item._id !== id);
        setItems(updatedItems);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <h1>CRUD APP</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleUpdateItem(item._id, { name: 'Updated Name', description: 'Updated Description' })}>
              Update
            </button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" name="name" placeholder="Name" value={newItem.name} onChange={handleInputChange} />
        <input type="text" name="description" placeholder="Description" value={newItem.description} onChange={handleInputChange} />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default App;
