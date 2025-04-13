import { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";

const ProductAddButtons = () => {
    const [quantity, setQuantity] = useState(1);
    const { customer } = useSession();
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/login');
    };

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
                <Button onClick={handleNavigation} style={{ fontSize: 12 }}>
                    Login to Add To Cart
                </Button>
            </div>
        )
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
                    <Button color="primary" className='w-24' style={{ fontSize: 12 }}>
                        Add to cart
                    </Button>
                </div>
            </ButtonGroup>
        </div>
    )
}

export default ProductAddButtons;