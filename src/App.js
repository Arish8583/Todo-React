import Header from "./Header";
import './App.css';
import Content from "./Content";
import Footer from "./Footer";
import { useEffect, useState } from 'react'
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";

function App() {

  
  const API_URL = 'http://localhost:3600/items';

  const [items, SetItems] = useState([])
    
    
    // JSON.parse(localStorage.getItem("todo_list"))
//     [
//         {
//     id:1,
//     checked:true,
//     item:"tomatos"
//    },
   
//    {
//     id:2,
//     checked:true,
//     item:"chicken and tomatos"
//    },
   
//    {
//     id:3,
//     checked:false,
//     item:"red tomatos"
//    }
// ]);

const [newItem, setNewItem] = useState('');
const [Search, setSearch] = useState("");
const [fetchError, setFetchError] = useState(null);
const [isLoading, setIsLoading] = useState(true);



useEffect(() => {

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error('Did not receive expected data');
      console.log(response);
      const listItems = await response.json();
      console.log(listItems);
      SetItems(listItems);
      setFetchError(null);
    } catch (err) {
        setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  setTimeout(() => {
    // fetch items from API
    (async () => await fetchItems())()

  }, 2000);


}, [])


const addItem = async (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;

  // const id = items.length ? Number(items[items.length - 1].id) + 1 : 1;


  const myNewItem = { id, checked: false, item };
  const listItems = [...items, myNewItem];
  SetItems(listItems);
  // localStorage.setItem("todo_list", JSON.stringify(listItems))
   const postOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myNewItem)

}
    const result =  await apiRequest(API_URL, postOptions);
    if (result) {
        setFetchError(result);
    } 

}

const handlesubmit = (e) =>{
  e.preventDefault();
  if (!newItem) return;
  addItem(newItem);
  setNewItem('');

}


const handlecheck = async(id) =>{
    const listItems = items.map((item) => 
    item.id===id ? {...item, checked:!item.checked} : item)
    SetItems(listItems)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
    const myitems = listItems.filter((item) => item.id===id)

    const patchOptions = {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ checked: myitems[0].checked })
    }   
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, patchOptions);
    if (result) setFetchError(result);


}
const handledelete = async(id) =>{
    const listItems = items.filter((item) => item.id!==id)
    SetItems(listItems)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
    const deleteOptions = {
        method: 'DELETE', 
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) {
        setFetchError(result);
    }
}



  return (
    <div>
    <Header />
    <AddItem 
    NewItem = {newItem}
    SetNewItem={setNewItem}
    handlesubmit={handlesubmit} />
    <SearchItem 
            search={Search}
            setSearch={setSearch}
     />
     <main>
      {isLoading && <p style={{ color: "blue" }}>Loading...</p>}
              {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

      {!fetchError && !isLoading && <Content 
    items={items.filter(item => ((item.item).toLowerCase()).includes(Search.toLowerCase()))}
    Setitems={SetItems}
    handlecheck={handlecheck}
    handledelete={handledelete}/>}
     </main>
    
    <Footer length={items.length} /> 
    </div>
  );
}

export default App;
