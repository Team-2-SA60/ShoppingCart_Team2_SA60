import React, {useEffect, useState} from 'react';
import {Button} from "reactstrap";

export default function CartItem({item, handleMinusItemQty, handleSetItemQty, handleAddItemQty, handleDeleteItem}) {
    const [itemQty, setItemQty] = useState(item.quantity || "");

    useEffect(() => {
        setItemQty(item.quantity);
    }, [item]);

    function handleQtyChange(event) {
        const newQty = event.target.value;

        if (newQty === "" || (newQty >= 1 && newQty <= 99)) {
            setItemQty(newQty);
            if (newQty !== "") {
                handleSetItemQty(item.id, newQty);
            }
        }
    }

    function preventInvalidChars (event)  {
        if (event.key === '.' || event.key === '-') {
            event.preventDefault();
        }
    }

    return(
        <div>
            <div className="cart-item">
                <img
                    src={`../images/products/${item.productImage}`}
                    alt={item.productName}
                    className="cart-item-image rounded-md drop-shadow-md"
                />
                <div className="cart-item-details">
                    <h2>{item.productName}</h2>
                    <p>{item.productDescription}</p>
                    {item.discount === 0 ?
                        (<p>S${(item.price - item.discount).toFixed(2)}</p>)
                        :
                        (<p><s className="text-[14px]">S${(item.price).toFixed(2)}</s> &nbsp; <b className="text-red-600 ">S${(item.price - item.discount).toFixed(2)}</b></p>)}
                </div>
                <div className="cart-item-quantity">
                    <button onClick={() => handleMinusItemQty(item.id)} className="border-black border w-6 rounded-l-md bg-red-200 text-black">
                        <b>-</b>
                    </button>
                    <input
                        value={itemQty}
                        onChange={handleQtyChange}
                        onKeyDown={preventInvalidChars}
                        type="number"
                        className="border-black border-t border-b w-10 focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button onClick={() => handleAddItemQty(item.id)} className="border-black border w-6 rounded-r-md bg-green-200 text-black">
                        <b>+</b>
                    </button>
                </div>
                <Button onClick={() => handleDeleteItem(item.id)} color="danger" className="remove-button">
                    X
                </Button>
            </div>
        </div>
    )

}