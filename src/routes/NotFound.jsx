import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      Esta pagina no existe, ups!
      <Link to='/'>Ir al home</Link>
    </div>
  )
}

export default NotFound
