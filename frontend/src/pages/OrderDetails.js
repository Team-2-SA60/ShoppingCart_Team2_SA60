import React from 'react';

function OrderDetails({order}) {

    const gridClass = `grid grid-rows-${order.orderDetails.length}`;

    const orderDetails = order.orderDetails.map((orderDetail) => {

        return (
            <div className={gridClass} key={orderDetail.product.id}>
                <div className="grid grid-rows-[0.5fr_3fr] grid-cols-4 gap-3">
                    <div className="row-span-2 col-start-1 col-end-1"><img src={`../images/products/${orderDetail.product.image}`} alt={orderDetail.product.name} className="w-24"/></div>
                    <div className="row-span-1 row-start-1 row-end-1 col-start-2 col-end-2 text-lg font-semibold italic">{orderDetail.product.name}</div>
                    <div className="row-span-1 row-start-2 row-end-2 col-start-2 col-end-2">{orderDetail.product.description}</div>
                    <div className="row-span-1 row-start-1 row-end-1 col-start-3 col-end-3 text-center">Quantity</div>
                    <div className="row-span-1 row-start-2 row-end-2 col-start-3 col-end-3 text-center">x {orderDetail.quantity}</div>
                    <div className="row-span-1 row-start-1 row-end-1 col-start-4 col-end-4 text-center">Price per piece</div>
                    <div className="row-span-1 row-start-2 row-end-2 col-start-4 col-end-4 text-center">S${orderDetail.unitPrice.toFixed(2)}</div>
                </div>
                <hr/>
            </div>
        )
    })

    return (
        <>
            {orderDetails}
        </>
    )

}

export default OrderDetails