import React from 'react';
import CartItem from "./CartItem";

export default function ListCartItem({ cartItems, handleAddItemQty, handleMinusItemQty, handleSetItemQty, handleDeleteItem}) {

    return (
        <div className="bg-slate-50 p-4 rounded-lg border-b-2 drop-shadow-md">
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    handleAddItemQty={handleAddItemQty}
                    handleMinusItemQty={handleMinusItemQty}
                    handleSetItemQty={handleSetItemQty}
                    handleDeleteItem={handleDeleteItem}
                />
            ))}
        </div>
    );
}