import { useEffect, useState } from 'react';
import Header from "./Header";
import './App.css';
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import {
  fetchItems as firebaseFetch,
  addItem as firebaseAdd,
  deleteItem as firebaseDelete,
  toggleChecked as firebaseToggle
} from './firebaseService';

function App() {
  const [items, SetItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [Search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await firebaseFetch();
        SetItems(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      loadItems();
    }, 1000);
  }, []);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    try {
      const newEntry = await firebaseAdd(newItem);
      SetItems(prev => [...prev, newEntry]);
      setNewItem('');
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handlecheck = async (id) => {
    const updated = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    SetItems(updated);
    try {
      const changedItem = updated.find(i => i.id === id);
      await firebaseToggle(id, changedItem.checked);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const handledelete = async (id) => {
    const filtered = items.filter(item => item.id !== id);
    SetItems(filtered);
    try {
      await firebaseDelete(id);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  return (
    <div>
      <Header />
      <AddItem
        NewItem={newItem}
        SetNewItem={setNewItem}
        handlesubmit={handlesubmit}
      />
      <SearchItem search={Search} setSearch={setSearch} />
      <main>
        {isLoading && <p style={{ color: "blue" }}>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter(item =>
              item.item.toLowerCase().includes(Search.toLowerCase())
            )}
            Setitems={SetItems}
            handlecheck={handlecheck}
            handledelete={handledelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
