import React, { useEffect, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap';
import api from '../utilities/axios';

const AppNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        api.get("/check-session")
            .then(res => {
                console.log(res.data);
                setCustomer(res.data);
            })
            .catch(res => {
                console.log("Invalid session:", res);
                setCustomer(null);
            })
    }, []);

    const handleLogout = () => {
        api.get("/logout")
            .then(()=> {
                setCustomer(null);
                setLoggedOut(true);
                console.log("Logout successful");
            })
            .catch(err => {
                console.log("Logout failed:", err);
            })
    };

    const toggleModal = () => {
        setLoggedOut(!loggedOut)
        navigate("/");
    };
    
    return (
        <>
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/"><img src="./images/Delulu.png" alt="DeluluLogo" className="w-[200px] min-w-[200px] ml-8" /></NavbarBrand>
            <div className="hidden md:flex flex-auto justify-center items-center px-4">
                <input type="text" placeholder="Search for keyword" className="border border-black rounded-sm p-1 outline-none w-full min-w-[150px] max-w-xs"/>
            </div>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="flex flex-grow justify-evenly items-center ms-auto" style={{ width: "100%" }} navbar>
                    <NavItem className='hover:underline'>
                        <NavLink href="#">WOMEN</NavLink>
                    </NavItem>
                    <NavItem className='hover:underline'>
                        <NavLink href="#">MEN</NavLink>
                    </NavItem>
                    <NavItem className='hover:underline'>
                        <NavLink href="#">CHILDREN</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="flex flex-auto justify-end items-center mr-[15%] gap-16" navbar>
                    {customer != null ? (
                        <>
                            <UncontrolledDropdown className="me-2 cursor-pointer" inNavbar="true" direction="left">
                                <DropdownToggle className="nav-link" tag="a">
                                        <div className='inline-flex text-[10px] gap-4 items-center text-center hover:bg-slate-100 rounded-lg py-0.5 px-3 shadow-md'>
                                        <img src="./images/account-icon.png" alt='account-icon' style={{width: '30px', height: '30px'}}/>
                                        <div className='text-[15px]'>
                                            Hello! <br/>
                                            {customer.name}
                                        </div>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="drop-shadow-md mt-4">
                                    <DropdownItem className="hover:underline" tag={Link} to="/">
                                        Account
                                    </DropdownItem>
                                    <DropdownItem className="hover:underline" tag={Link} to="/orders">
                                        My Orders
                                    </DropdownItem>
                                    <DropdownItem className="hover:underline" tag={Link} to="/" onClick={handleLogout}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="#">
                                    <div className='relative'>
                                        <img src="./images/shopping-cart.png" alt='cart-icon' style={{ width: '30px', height: '30px' }}/>
                                        <span className='absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1.5 py-0.5 shadow-md'>
                                            1
                                        </span>
                                    </div>
                                </NavLink>
                            </NavItem>
                        </>
                    ) : (
                        <NavItem>
                            <NavLink tag={Link} to="/login">
                                <div className='flex gap-2 items-center'>
                                    <img src="./images/login.png" alt='cart-icon' style={{ width: '30px', height: '30px' }} />
                                    Login
                                </div>
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>

    {/*Modal: Alert "Logout successful" upon Logout*/}
    <Modal className='text-center' size='sm' isOpen={loggedOut} toggle ={toggleModal}>
        <ModalBody>
            Logout successful
            <br/>
            <br/>
            <Button color="primary" onClick={toggleModal}>OK</Button>
        </ModalBody>
    </Modal>
    </>
    );
};

export default AppNavbar;