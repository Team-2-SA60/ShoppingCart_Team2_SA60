import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
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
                    <NavItem>
                        <NavLink tag={Link} to="/login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Cart</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;