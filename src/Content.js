import React from 'react'
import ItemList from './ItemList';

const Content = ({items, handlecheck, handledelete}) => {

   return (
    <>
        {(items.length) ? (
                        <ItemList  
                        items = {items}
                        handlecheck={handlecheck}
                        handledelete={handledelete} />
            
    ) : (
        <p>empty list</p>
    )}
    </>
  )
}

export default Content