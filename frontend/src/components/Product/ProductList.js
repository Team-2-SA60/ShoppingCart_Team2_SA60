import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../utilities/axios";
import ProductCard from "./ProductCard"
import ProductPagination from "./ProductPagination";
import { Spinner } from "reactstrap";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const search = getSearch();
        getProducts(search);
        setLoading(false);
    },[searchParams, category]);

    function getSearch() {
        const search = searchParams.get("search");
        if (search) {
            return search;
        }
        setCurrentPage(1);
    }

    async function getProducts(search) {
        let fetchURL = '/products';

        if (search) fetchURL = `/products?keyword=${search}`;
        if (category) fetchURL = `/products/${category}`;

        await api.get(fetchURL)
        .then(res => {
            setProducts(res.data);
        })
        .catch(res => {
            console.log("Error fetching products: " + res.data)
        });
    }

    const productsPerPage = 4;

    const indexOfFirstProduct = currentPage * productsPerPage - productsPerPage
    const indexOfLastProduct = indexOfFirstProduct + productsPerPage

    const productsOnPage = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const productList = productsOnPage.map(product => {
        return (
            <ProductCard key={product.id} product={product} />
        )
    });

    if (isLoading) {
        return (
            <Spinner>
                Loading...
            </Spinner>
        )
    }

    if (products.length === 0) {
        return (
            <div className="items-center h-full">
                <h4>!! No items found !!</h4>
            </div>
        )
    }

    return (
        <div className="text-center">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 items-stretch">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
    );
}

export default ProductList;