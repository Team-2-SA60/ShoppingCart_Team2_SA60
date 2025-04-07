import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link } from 'react-router-dom';
import api from '../utilities/axios';

const OrderList = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get("/orders")
            .then(res => {
                setOrders(res.data);
            })
            .catch(res => {
                console.log("Unable to fetch products", res);
            })
    }, []);

    const orderList = orders.map(order => {

        const calculateTotal = () => {
            if (!order.orderDetails || !Array.isArray(order.orderDetails)) return 0;
            return order.orderDetails.reduce((total, item) => {
                return total + (item.quantity || 0) * (item.unitPrice || 0);
            }, 0);
        };

        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>S${calculateTotal().toFixed(2)}</td>
                <td>{order.orderStatus}</td>
            </tr>
        )
    })

    // HTML render
    return (
        <div>
            <AppNavbar />
            <div className='place-content-start w-[70%] ml-20'>
                <h1 className="text-3xl mt-5">Orders</h1>
                <div className='flex flex-right gap-12 p-4'>
                    <div>
                        All
                    </div>
                    <div>
                        Pending
                    </div>
                    <div>
                        Completed
                    </div>
                </div>
                <Table hover className='md:table-fixed rounded-full'>
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default OrderList;