import { useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import '../Navbar.css'

const Navbar = () => {

  const {user, signOutUser} = useContext(UserContext)
  const LogOut = async() => {
    try {
      await signOutUser()
      setActive(false)
    } catch (error) {
      console.log(error.code)
    }
  }

  const buttonBlue = 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
  const buttonRed = 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
  const styleRoute = 'text-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0'
  
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to='/' className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            URLShortCut
          </span>
        </Link>
        <div className="flex md:order-2">
          {
            user ? ( 
              <>
                <NavLink to='/' className={styleRoute}>Home</NavLink>
                <button onClick={LogOut} className={buttonRed}>Logout</button>
              </>
             ) : (
               <>
                <Link to='/login' className={styleRoute}>Login</Link>
                <Link to='/register' className={buttonBlue}>Register</Link>
               </>
             )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
