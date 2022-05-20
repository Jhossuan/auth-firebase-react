import { useContext } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import '../Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const {setActive, active} = useContext(UserContext)
  const LogOut = () => {
    setActive(false)
    navigate('/login')
  }
  return (
    <div className="navbar">
      <small>{active ? 'Online' : 'Offline'}</small>
      <Link className={active ? 'active' : ''} to='/login'>Login</Link>
      <NavLink to='/'>Home</NavLink>
      <button className={active ? '' : 'active' } onClick={LogOut}>Logout</button>
    </div>
  )
}

export default Navbar
