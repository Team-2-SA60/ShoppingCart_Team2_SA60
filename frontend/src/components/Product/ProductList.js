import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utilities/axios";
import ProductCard from "./ProductCard"
import ProductPagination from "./ProductPagination";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const search = getSearch();
        getProducts(search);
    },[searchParams]);

    function getSearch() {
        const search = searchParams.get("search");
        if (search) {
            setCurrentPage(1);
            return search;
        }
    }

    function getProducts(search) {
        let searchTerm = '/products';
        if (search) searchTerm = `/products?keyword=${search}`
        api.get(searchTerm)
            .then(res => {
                setProducts(res.data);
            })
            .catch(res => {
                console.log("Error fetching products: " + res.data)
            })
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