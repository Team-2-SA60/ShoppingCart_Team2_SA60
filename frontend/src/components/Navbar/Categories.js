import { NavItem, NavLink } from "reactstrap"

const Categories = () => {
    
    return (
        <>
            <NavItem className='hover:underline'>
                <NavLink href="/category/Cute">CUTE</NavLink>
            </NavItem>
            <NavItem className='hover:underline'>
                <NavLink href="/category/Chill">CHILL</NavLink>
            </NavItem>
            <NavItem className='hover:underline'>
                <NavLink href="/category/Cringe">CRINGE</NavLink>
            </NavItem>
        </>
    )
}

export default Categories;