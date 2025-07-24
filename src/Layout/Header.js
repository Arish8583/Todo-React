import React from 'react'

const Header = ({title = "Arish TODO LIST"}) => {
  return (
    <header>    
        <h1>{title}</h1>
    </header>
  )
}



export default Header