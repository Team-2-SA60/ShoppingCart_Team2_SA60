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
        <div className="flex items-center justify-between p-2.5 mb-3 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 flex-1">
                <img
                    src={`../images/products/${item.productImage}`}
                    alt={item.productName}
                    className="w-20 h-[110px] object-cover rounded-md shadow-sm"
                />
                <div className="flex-1">
                    <h2 className="font-semibold text-xl">{item.productName}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{item.productDescription}</p>
                    <div className="mt-2">
                        {item.discount === 0 ? (
                            <p className="font-medium">S${(item.price - item.discount).toFixed(2)}</p>
                        ) : (
                            <p className="flex items-center">
                                <s className="text-gray-400 text-sm">S${item.price.toFixed(2)}</s>
                                <span className="ml-2 font-bold text-red-600">S${(item.price - item.discount).toFixed(2)}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-14">
                <div className="flex items-center">
                    <button
                        onClick={() => handleMinusItemQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-red-50 hover:bg-red-200 active:scale-[0.98] transition-colors"
                    >
                        <span className="font-bold">-</span>
                    </button>
                    <input
                        value={itemQty}
                        onChange={handleQtyChange}
                        onKeyDown={preventInvalidChars}
                        type="number"
                        className="w-12 h-8 border-t border-b border-gray-300 text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        onClick={() => handleAddItemQty(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-green-50 hover:bg-green-200 active:scale-[0.98] transition-colors"
                    >
                        <span className="font-bold">+</span>
                    </button>
                </div>
                <Button
                    onClick={() => handleDeleteItem(item.id)}
                    color="danger"
                    className="ml-4 w-8 h-8 flex items-center justify-center p-0 rounded-full"
                >
                    X
                </Button>
            </div>
        </div>
    )

}