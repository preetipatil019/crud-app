
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState('')
  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/')
    console.log(response.data)
    setData(response.data)
  }

  const deleteItem = async (itemId) => {
    console.log(itemId)
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${itemId}`)
    fetchData(); 
  }

  const addItem = async () => {
    await axios.post('https://jsonplaceholder.typicode.com/todos/', { name: newItem })
    fetchData();
    setNewItem('')
    
  }
  return (
    <div className="App">
    
      <h1>CRUD APP</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={()=>deleteItem(item.id)}>Delete</button>
        </li>
        
        ))}
        <li>
          {newItem}
        </li>
      </ul>
      <input
        type="text"
        value={newItem}
        onChange={(e)=>setNewItem(e.target.value)}
      />
      <button onClick={addItem}>ADD ITEM</button>
    </div>
  );
}

export default App;
