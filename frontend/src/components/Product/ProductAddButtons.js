import { useState } from "react";
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import api from "../../utilities/axios";

const ProductAddButtons = ({productId}) => {
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { customer, checkSession } = useSession();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/login');
    };

    const handleIncrease = () => setQuantity(quantity >= 99 ? 99 : quantity + 1);
    const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');

        if (!isNaN(value) && value < 1) {
            setQuantity(1);
            return;
        }
        if (!isNaN(value) && value > 99) {
            setQuantity(99);
            return;
        }
        setQuantity(value);
    };

    if (!customer) {
        return (
            <div className="w-full ml-[25%]">
                <Button onClick={handleNavigation} style={{ fontSize: 12 }}>
                    Login to Add To Cart
                </Button>
            </div>
        )
    }

    const toggleModal = () => setModalOpen(!modalOpen);

    function handleAddItemQty() {
        api.post(`/addToCart/${productId}`, {qty: quantity})
            .then(response => {
                setModalMessage(response.data.message);
                toggleModal();
                checkSession();
            })
            .catch(error => console.error('Error: ', error));
    }

    function goToCart() {
            toggleModal();
            navigate('/cart');
    }

    return (
        <div>
            <ButtonGroup className='h-8'>
                <button onClick={handleDecrease} 
                    className="w-6 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-red-50 
                        hover:bg-red-200 active:scale-[0.98] transition-colors">
                    <b>-</b>
                </button>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={quantity} 
                    className="w-10 h-8 border-t border-b border-gray-300 text-center focus:outline-none" 
                />
                <button onClick={handleIncrease}
                     className="w-6 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-green-50 
                        hover:bg-green-200 active:scale-[0.98] transition-colors">
                    <b>+</b>
                </button>
                <div className='ml-4'>
                    <Button onClick={handleAddItemQty} color="primary" className='w-24' style={{ fontSize: 12 }}>
                        Add to cart
                    </Button>
                </div>
            </ButtonGroup>

            <Modal className="text-center" size="sm" isOpen={modalOpen} toggle={toggleModal}>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>OK</Button>
                    <Button color="secondary" onClick={goToCart}>View Cart</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ProductAddButtons;