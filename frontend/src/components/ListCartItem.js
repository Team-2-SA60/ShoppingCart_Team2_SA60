import React from 'react';
import CartItem from "./CartItem";

export default function ListCartItem({ cartItems, handleAddItemQty, handleMinusItemQty, handleSetItemQty, handleDeleteItem}) {

    return (
        <div className="cart-items">
            {cartItems.map(item =>
                (<CartItem key={item.id} item={item} handleAddItemQty={handleAddItemQty} handleMinusItemQty={handleMinusItemQty} handleSetItemQty={handleSetItemQty} handleDeleteItem={handleDeleteItem}/>))}
        </div>
    );
}