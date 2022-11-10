import {Link} from "react-router-dom"

const Navbar = () => {
    return(
        <div className="container">
            <header>
                <Link to ="/"> Sielnt Hill supermarket</Link>
            </header>
            <div className="Pages">
                <div><Link to="/Products">Products</Link></div>
            </div>
        </div>
    )
}

export default Navbar;