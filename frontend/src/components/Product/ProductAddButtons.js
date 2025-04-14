import { useState } from "react";
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import api from "../../utilities/axios";

const ProductAddButtons = ({productId}) => {
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { customer } = useSession();
    const navigate = useNavigate();

    const handleIncrease = () => setQuantity(quantity > 99 ? 99 : quantity + 1);
    const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleChange = (e) => {
        const value = e.target.value;

        if (!isNaN(value) && value >= 1) {
            setQuantity(Number(value));
        }
        if (!isNaN(value) && value >= 99) {
            setQuantity(Number(99));
        }
    };

    if (!customer) {
        return (
            <div className="w-full ml-[25%]">
                <Button style={{ fontSize: 12 }}>
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
                <button onClick={handleDecrease} className="border-black border w-6 rounded-l-md bg-red-200 text-black align-middle">
                    <b>-</b>
                </button>
                <input type="text" onChange={handleChange} value={quantity} className="border-black border-t border-b white w-10 focus:outline-none text-center" />
                <button onClick={handleIncrease} className="border-black border w-6 rounded-r-md bg-green-200 text-black align-middle">
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