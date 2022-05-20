import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const RequireAuth = ({children}) => {
    const {user, active} = useContext(UserContext)
    
    if(!user || !active){
        return <Navigate to='/login'/>
    }
    return children

}

export default RequireAuth
