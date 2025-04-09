import React, { useEffect, useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Modal, ModalBody, ModalFooter, Button} from 'reactstrap';
import api from '../utilities/axios';

const AppNavbar = () => {

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

    const toggleModal = () => setLoggedOut(!loggedOut);

    return (
        <>
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/"><img src="./images/Delulu.png" alt="DeluluLogo" className="w-[200px] min-w-[200px] ml-8" /></NavbarBrand>
            <div className="hidden md:flex flex-auto justify-center items-center px-4">
                <input type="text" placeholder="Search for keyword" className="border border-black rounded-sm p-1 outline-none w-full min-w-[150px] max-w-xs"/>
            </div>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="flex flex-grow justify-evenly items-center" style={{ width: "100%" }} navbar>
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
                <Nav className="flex flex-auto justify-end items-center mr-16" style={{ width: "100%"}} navbar>
                    {customer != null ? (
                        <>
                            <NavItem>
                                <NavLink tag={Link} to="/orders">Account</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/cart">Cart</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
                            </NavItem>
                        </>
                    ) : (
                        <NavItem>
                            <NavLink tag={Link} to="/login">Login</NavLink>
                        </NavItem>
                    )}
                </Nav>
            </Collapse>
        </Navbar>

    {/*Modal: Alert "Logout successful" upon Logout*/}
    <Modal isOpen={loggedOut} toggle ={toggleModal}>
        <ModalBody>
            Logout successful
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={toggleModal}>OK</Button>
        </ModalFooter>
    </Modal>
    </>
    );
};

export default AppNavbar;