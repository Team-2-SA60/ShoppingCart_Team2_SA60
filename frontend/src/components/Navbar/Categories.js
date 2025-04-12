import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap"

const Categories = () => {
    
    return (
        <>
            <NavItem className='hover:underline'>
                <NavLink tag={Link} to="/category/Cute">CUTE</NavLink>
            </NavItem>
            <NavItem className='hover:underline'>
                <NavLink tag={Link} to="/category/Chill">CHILL</NavLink>
            </NavItem>
            <NavItem className='hover:underline'>
                <NavLink tag={Link} to="/category/Cringe">CRINGE</NavLink>
            </NavItem>
        </>
    )
}

export default Categories;