import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import {Modal, ModalBody, Button} from 'reactstrap';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';
import TopRightButtons from './Navbar/TopRightButtons';
import Categories from './Navbar/Categories';
import SearchBar from './Navbar/SearchBar';

const AppNavbar = ({logout}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { setCustomer } = useSession();
    const [loggedOut, setLoggedOut] = useState(false);
    const [ search, setSearch ] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        api.get("/logout")
            .then(()=> {
                setCustomer(null);
                setLoggedOut(true);
            })
            .catch(err => {
                console.log("Logout failed:", err);
            })
    };

    if (logout) {
        handleLogout();
    }

    const toggleModal = () => {
        setLoggedOut(!loggedOut)
        navigate("/");
    };

    function handleSearch(e) {
        e.preventDefault();
        const searchTrimmed = search.trim();
        navigate(`/?search=${searchTrimmed}`);
        setSearch("");
    }

    return (
        <>
            <Navbar color="light" light full="true" expand="md" className="shadow-sm">

                <NavbarBrand tag={Link} to="/"><img src="../images/Delulu.png" alt="DeluluLogo" className="w-[200px] min-w-[200px] ml-8" /></NavbarBrand>

                <Nav className="hidden md:flex flex-auto justify-center items-center px-4 w-[15%]">
                    <SearchBar handleSearch={handleSearch} search={search} setSearch={setSearch} />
                </Nav>

                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />

                <Collapse isOpen={isOpen} className='items-center' navbar>
                    <Nav className="flex flex-grow justify-evenly items-center ms-auto" navbar>
                        <Categories />
                    </Nav>
                </Collapse>

                <Collapse isOpen={isOpen} className='justify-end lg:mr-[5%]' navbar>
                    <Nav className="flex flex-none items-center lg:gap-12" navbar>
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
}

export default AppNavbar;