import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import AppNavbar from '../components/AppNavbar';
import api from '../utilities/axios';

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    /* 
    Fetches products from localhost:8080/api/products
    to retrieve all products
    
    product = { "id" , "name" , "description" , "price" , "discount" , "image"}
    */
    useEffect(() => {
        api.get("/products")
        .then(res => {
            setProducts(res.data);
        })
        .catch(res => {
            console.log("Unable to fetch products", res);
        })
    }, []);

    // Pagination logic start
    const productsPerPage = 4;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pagination = (
        <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
                <button key={index} className={`px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200'}`} 
                onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
    // Pagination logic end

    // Buttons + Input component for adding to cart at home page
    const QuantitySelector = () => {
        const [quantity, setQuantity] = useState(1);

        const handleIncrease = () => setQuantity(quantity > 99 ? 99 : quantity + 1);
        const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

        const handleChange = (e) => {
            const value = e.target.value;

            if (!isNaN(value) && value >= 1) {
                setQuantity(Number(value));
            }
            if (!isNaN(value) && value >= 99) {
                setQuantity(Number(99));
            }
        };

        return (
            <div>
                <ButtonGroup className='h-8'>
                    <button onClick={handleDecrease} className="border-black border w-6 rounded-l-md bg-red-200 text-black align-middle">
                        <b>-</b>
                    </button>
                    <input type="text" onChange={handleChange} value={quantity} className="border-black border-t border-b white w-10 focus:outline-none text-center" />
                    <button onClick={handleIncrease} className="border-black border w-6 rounded-r-md bg-green-200 text-black align-middle">
                        <b>+</b>
                    </button>
                    <div className='ml-4'>
                        <Button color="primary" className='w-24' style={{ fontSize: 12 }}>
                            Add to cart
                        </Button>
                    </div>
                </ButtonGroup>
            </div>
        )
    }
    // End of component

    // Product component (1 product 1 card)
    const productList = currentProducts.map(product => {
        return (
            <div className="bg-white rounded-3xl contain-content pb-4 shadow-md hover:scale-105 transition-transform duration-300 ease-in-out transform origin-center w-[250px]">
                <div className="flex flex-col justify-center items-center">
                    <img src={`./images/${product.image}`} alt={product.name} className='object-cover h-[350px]'/><br />
                    <div>{product.name}<br /></div>
                    <div>{product.description}<br /></div>
                    <div>S${(product.price - product.discount).toFixed(2)}<br /></div>
                    <QuantitySelector />
                </div>
            </div>
        )
    })

    // HTML render
    return (
        <div>
            <AppNavbar />
            <div className='place-items-center'>
                <h1 className="text-3xl my-5">All T-Shirts</h1>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 items-center">
                    {productList}
                </div>
            </div>
            {pagination}
        </div>
    );
};

export default ProductList;