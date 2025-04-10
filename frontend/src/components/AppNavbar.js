import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {Modal, ModalBody, Button} from 'reactstrap';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';
import TopRightButtons from './Navbar/TopRightButtons';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { setCustomer } = useSession();
    const [loggedOut, setLoggedOut] = useState(false);
    const [ search, setSearch ] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

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

    function handleSearch(e) {
        e.preventDefault();
        const searchTrimmed = search.trim();
        navigate(`/?search=${searchTrimmed}`);
    }

    return (
        <>
        <Navbar color="light" light full="true" expand="md">
            <NavbarBrand tag={Link} to="/"><img src="./images/Delulu.png" alt="DeluluLogo" className="w-[200px] min-w-[200px] ml-8" /></NavbarBrand>
            <div className="hidden md:flex flex-auto justify-center items-center px-4">
                <form onSubmit={handleSearch}>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search for products" 
                        className="border border-black rounded-sm p-1 outline-none w-full min-w-[150px] max-w-xs"/>
                </form>
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
                    <TopRightButtons handleLogout={handleLogout}/>
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