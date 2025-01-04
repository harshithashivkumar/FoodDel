import React from 'react'
import{menu_list} from '../../assets/assets'
import './ExploreMenu.css'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        
        <p className='explore-menu-text'>Choose from our wide range of cuisines and dishes to satisy your taste buds.
        Our mission is to provide you with the best quality cuisine in th city.</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=> setCategory(category=>category===item.menu_name?'All':item.menu_name)}  key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?'active':''} src={item.menu_image} alt=""/>
                    <p>{item.menu_name}</p>
                    </div>
                    
                )
            })}
            
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu