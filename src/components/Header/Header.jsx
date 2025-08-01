import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import authService from '../../appwrite/auth'
function Header (){
    const authStatus = useSelector((State)=>State.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
     name: 'Home',
      slug:"/",
       active:true
    },
    {
       name: 'Login',
      slug:"/Login",
       active:!authStatus,
    },
    {
      name: 'SignUP',
      slug:"/signup",
       active:!authStatus,
    },
    {
        name: 'All Posts',
      slug:"/all-posts",
       active:authStatus,
    },
    {
        name: 'Add Posts',
      slug:"/add-posts",
       active:authStatus,
    },
]

    
return(
    <header className='py-20 shadow bg-blue-900 justify-between item-center px-8 py-4 shadow-md '>
        <Container>
<nav className='flex  '>
    <div className='mr-60 px-40'>
        <Link to="/">
        <Logo width='70px'/>
        </Link>
        </div>
      
        <ul className='flex  ml-auto gap-4'>
            {navItems.map( (item) => 
            item.active ? (
                <li key={item.name}>
          <button onClick = { () => navigate(item.slug)}
          className='inlinebock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >
            {item.name}
          </button>

                </li>
            ): null
            )}
            {authService && (
                <li> <LogoutBtn/> </li>
            )}
        </ul>
       
</nav>

        </Container>
    
    </header>
    
)
}
export default Header