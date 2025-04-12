import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Nav, NavItem, NavLink, Table } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import OrderDetails from './OrderDetails';
import { useParams } from 'react-router-dom';

const OrderList = () => {

    const { customer, checkSession } = useSession();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const { status } = useParams();

    // accordion toggle for order details
    const [open, setOpen] = useState(); 
    const toggle = (id) => {
        setOpen(open === id ? "" : id);
    };

    useEffect(() => {  
        checkSession();
        if (!customer) navigate("/login");
        getOrders(status);
    }, [status]);

    async function getOrders(status) {
        let fetchURL = '/orders';
        if (status) fetchURL = `/orders/${status}`;
        
        await api.get(fetchURL)
        .then(res => {
            setOrders(res.data);
        })
        .catch(res => {
            console.log("Error fetching orders", res);
        })

        setOpen();
    }

    const orderList = orders.map(order => {

        const calculateTotal = () => {
            if (!order.orderDetails || !Array.isArray(order.orderDetails)) return 0;
            return order.orderDetails.reduce((total, item) => {
                return total + (item.quantity || 0) * (item.unitPrice || 0);
            }, 0);
        };

        return (
        <div className='flex width-full justify-between content-fill'>
            <Accordion open={open} toggle={toggle} className='w-full'>
                <AccordionItem>
                    <AccordionHeader targetId={order.id} toggle={toggle}>
                        <div className="col">{order.id}</div>
                        <div className="col">{order.orderDate}</div>
                        <div className="col">S${calculateTotal().toFixed(2)}</div>
                        <div className="col">{order.orderStatus}</div>
                    </AccordionHeader>
                    <AccordionBody accordionId={order.id}>
                        <OrderDetails order={order} />
                        <div className='grid grid-rows-1 grid-cols-3 gap-3 pb-2 pt-2'>
                            <div className="col-start-1 col-end-1 font-semibold">Shipping details </div>
                            <div className="col-start-2 col-end-2">Shipping method: {order.shippingMethod}</div>
                            <div className="col-start-3 col-end-3">Shipping fee: S${order.shippingFee}</div>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>


            // <tr>
            //     <td>{order.id}</td>
            //     <td>{order.orderDate}</td>
            //     <td>S${calculateTotal().toFixed(2)}</td>
            //     <td>{order.orderStatus}</td>
            // </tr>
        )
    })

    // HTML render
    return (
        <div>
            <AppNavbar />
            <div className='w-[60vw] h-[70vh] mx-auto'>
                <h1 className="text-3xl mt-5 pl-4 pt-8 pb-4">Orders</h1>
                <div className="flex justify-start pl-4 pb-4 w-[20em]">
                    <div className='hover:underline mr-auto'>
                        <Link to="/orders" className="no-underline text-inherit">All</Link>
                    </div>
                    <div className='hover:underline mr-auto'>
                        <Link to="/orders/pending" className="no-underline text-inherit">Pending</Link>
                    </div>
                    <div className='hover:underline mr-auto'>
                        <Link to="/orders/completed" className="no-underline text-inherit">Completed</Link>
                    </div>
                </div>

                <div className="container text-left pb-4">
                    <div className="flex p-3 w[-100%] row-align-items-start bg-white">
                        <div className="col">Order Number</div>
                        <div className="col">Order Date</div>
                        <div className="col">Total Price</div>
                        <div className="col">Status</div>
                        <div className="text-white">ph</div>
                    </div>
                </div>

                <div className="container text-left pb-6">
                    <div className="w-full space-y-4">
                        {orderList}
                    </div>
                </div>


                {/* <Table hover className='md:table-fixed bg-white'>
                    <tr>
                        <div className='flex width-full justify-between'>
                            <div>Order Number</div>
                            <div>Order Date</div>
                            <div>Total Price</div>
                            <div>Status</div>
                        </div>
                    </tr>
                    <tr>
                        {orderList}
                    </tr>
                </Table> */}
            </div>
        </div>
    );
};

export default OrderList;