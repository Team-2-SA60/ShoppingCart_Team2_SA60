import React from 'react';
import { Button } from 'reactstrap';

export default function PriceSummary({ cartItems }) {
    const calculateSubtotal = () => {
        return cartItems
            .reduce((total, item) => total + (item.price - item.discount) * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <div className="bg-slate-50 p-3 rounded-lg shadow-sm border-b-2 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <hr className="my-3" />
            <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                    <span>Sub-total:</span>
                    <span className="font-medium">${calculateSubtotal()}</span>
                </div>
            </div>
            <Button
                color="primary"
                className="w-full py-2 rounded-lg font-medium hover:shadow-md active:scale-[0.99] transition-all"
            >
                Check Out
            </Button>
        </div>
    );
}