import React, { useEffect, useState } from 'react';
import AppNavbar from '../components/AppNavbar';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utilities/axios';
import { useSession } from '../context/SessionContext';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import OrderDetails from './OrderDetails';
import { useParams } from 'react-router-dom';

const OrderList = () => {

    const { checkSession } = useSession();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const { status } = useParams();

    // accordion toggle for order details
    const [open, setOpen] = useState(); 
    const toggle = (id) => {
        setOpen(open === id ? "" : id);
    };

    useEffect(() => {  
        getCustomer();
        getOrders(status);
        // eslint-disable-next-line
    }, [status]);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (!getCustomer) navigate("/login");
    }

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
            const productsTotal = order.orderDetails.reduce((total, item) => {
                return total + (item.quantity || 0) * (item.unitPrice || 0);
            }, 0);
            return productsTotal + order.shippingFee;
        };

        return (
            <div key={order.id} className='flex width-full justify-between'>
                <Accordion open={open} toggle={toggle} className='w-full'>
                    <AccordionItem>
                        <AccordionHeader targetId={order.id}>
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
                            <div className="col-start-2 col-end-3">Shipping address: {order.shippingAddress}</div>
                            </div>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </div>
        )
    })

    // HTML render
    return (
        <div>
            <AppNavbar />
            <div className='min-w-[550px] w-[60vw] max-w-[900px] m-auto px-3 bg-white rounded-lg border-b drop-shadow-md'>
                <h1 className="text-3xl mt-5 pl-4 pt-8 pb-2">Orders</h1>
                <div className="flex justify-start pl-4 w-[20em] border-b">
                    <div className={`hover:text-black mr-auto transition-all delay-100 ease-linear ${!status ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-400"}`}>
                        <Link to="/orders" className="no-underline text-inherit">All</Link>
                    </div>
                    <div className={`hover:text-black mr-auto transition-all delay-100 ease-linear ${status === 'pending' ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-400"}`}>
                        <Link to="/orders/pending" className="no-underline text-inherit">Pending</Link>
                    </div>
                    <div className={`hover:text-black mr-auto transition-all delay-100 ease-linear ${status === 'completed' ? "border-b-2 border-blue-500 text-blue-500" : "text-slate-400"}`}>
                        <Link to="/orders/completed" className="no-underline text-inherit">Completed</Link>
                    </div>
                </div>

                <div className="container text-left pt-4 pb-4">
                    <div className="flex w-full row-align-items-start bg-white">
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

            </div>
        </div>
    );
};

export default OrderList;