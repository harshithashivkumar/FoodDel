import React, { useState,useContext } from 'react'
import './Navbar.css'
import  {assets}  from '../../assets/assets.js'
import { Link,useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  const {token,setToken,getTotalCartAmount} = useContext(StoreContext)
  const navigate = useNavigate()
  const [menu,setMenu] = useState('Home')
  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    navigate('/')
  }
  return (
    <div className='navbar'>
        <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
        <ul className="navbar-menu">
            <Link to='/' className={menu === 'Home'? 'active' : ''} onClick={() => setMenu('Home')}>Home</Link>
            <a href='#explore-menu' className={menu === 'Menu'? 'active' : ''} onClick={() => setMenu('Menu')}>Menu</a>
            <a href='#app-download' className={menu === 'Mobile-app'? 'active' : ''} onClick={() => setMenu('Mobile-app')}>Mobile-app</a>
            <a href='#footer' className={menu === 'Contact-us'? 'active' : ''} onClick={() => setMenu('Contact-us')}>Contact-us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-cart-icon">
                <Link to='/cart'><img src={assets.rest_icon} alt="" width="35px"/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>

            </div>
            {
              !token
                ?<button onClick={()=>setShowLogin(true)}>Sign up</button>
                : <div className="navbar-profile">
                  <img src={assets.profile_icon} alt="" />
                  <ul className='navbar-profile-dropdown'>
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
                    <hr/>
                    <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
                  </ul>
                </div>
            }
        </div>
    </div>
  )
}

export default Navbar