import React from 'react'
import LineItem from './LineItem'


const ItemList = ({ handlecheck, handledelete, items}) => {
  return (

    <ul>
    {items.map((item) => (
        <LineItem
        item = {item}
        key={item.id}
        handlecheck={handlecheck}
        handledelete={handledelete} />
    ))}
</ul>

    

)
}

export default ItemList