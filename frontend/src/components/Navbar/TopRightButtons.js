import { Link } from "react-router-dom";
import { DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from "reactstrap";
import { useSession } from "../../context/SessionContext";

const TopRightButtons = ({handleLogout}) => {

    const { customer, isLoading } = useSession();

    if (isLoading) {
        return (
            <>
            ...
            </>
        )
    }

    if (customer) {

        return (
            <> 
                <NavItem>
                    <UncontrolledDropdown className="me-2 cursor-pointer" inNavbar="true" direction="left">
                        <DropdownToggle className="nav-link" tag="a">
                            <div className='inline-flex text-[10px] gap-2 items-center text-center hover:bg-slate-100 rounded-lg py-0.5 px-3 shadow-md'>
                                <img src="../images/account-icon.png" alt='account-icon' style={{ width: '30px', height: '30px' }} />
                                <div className='text-[13px] w-[64px] text-nowrap contain-content'>
                                    Hello! <br />
                                    {customer.name}
                                </div>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu className="drop-shadow-md mt-4">
                            <DropdownItem className="hover:underline" tag={Link} to="/account">
                                Account
                            </DropdownItem>
                            <DropdownItem className="hover:underline" tag={Link} to="/wishlist">
                                My WishList
                            </DropdownItem>
                            <DropdownItem className="hover:underline" tag={Link} to="/orders">
                                My Orders
                            </DropdownItem>
                            <DropdownItem className="hover:underline" onClick={handleLogout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/cart">
                        <div className='relative'>
                            <img src="../images/shopping-cart.png" alt='cart-icon' style={{ width: '30px', height: '30px' }} />
                            <span className={`absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1.5 py-0.5 shadow-md
                                            ${customer.cartSize === 0 ? "hidden" : ""}`}>
                                {customer.cartSize}
                            </span>
                        </div>
                    </NavLink>
                </NavItem>
            </>
        )
        
    } else {

        return (
            <>
                <NavItem>
                    <NavLink tag={Link} to="/login">
                        <div className='flex gap-2 items-center'>
                            <img src="../images/login.png" alt='cart-icon' style={{ width: '30px', height: '30px' }} />
                            Login
                        </div>
                    </NavLink>
                </NavItem>
            </>
        )
    }
}

export default TopRightButtons;