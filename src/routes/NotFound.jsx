import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="container mx-auto">
      Esta pagina no existe, ups!
      <Link to='/'>Ir al home</Link>
    </div>
  )
}

export default NotFound
