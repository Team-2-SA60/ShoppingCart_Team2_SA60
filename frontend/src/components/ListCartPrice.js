import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function PriceSummary({ cartItems }) {
    const calculateSubtotal = () => {
        return cartItems
            .reduce((total, item) => total + item.unitPrice * item.quantity, 0)
            .toFixed(2);
    };

    const navigate = useNavigate();

    return (
        <div className="summary">
            <h2>Summary</h2>
            <hr />
            <p>Sub-total: ${calculateSubtotal()}</p>
            <Button onClick={() => navigate('/checkout')} color="primary" className="checkout-button">
                Check Out
            </Button>
        </div>
    );
}