import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../utilities/axios";
import ProductCard from "./ProductCard"
import ProductPagination from "./ProductPagination";
import { Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [wishListProducts, setWishList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { checkSession } = useSession();
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getCustomer();
        const search = getSearch();
        getProducts(search);
        // eslint-disable-next-line
    },[searchParams, category]);

    async function getCustomer() {
        const getCustomer = await checkSession();
        if (getCustomer !== null) {
            getWishListProducts();
        }
    }

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

        try {
            const response = await api.get(fetchURL);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching products: " + err)
        }
        return true;
    }

    async function getWishListProducts() {
        try {
            const response = await api.get("/wishlist/list")
            setWishList(response.data)
        } catch (err) {
            console.log("Error fetching wishlist: " + err)
        }
        return true;
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
            <ProductCard key={product.id} product={product} wishListProducts={wishListProducts} getWishListProducts={getWishListProducts} />
        )
    });

    const header = () => {
        const search = searchParams.get("search");
        const endingStr = " T-Shirts"

        if (search) {
            return "'" + search + "'" + endingStr;
        } else if (category) {
            return category + endingStr;
        } else {
            return "All" + endingStr;
        }
    }

    if (isLoading) {
        return (
            <div className="items-center">
                <Spinner>
                    Loading...
                </Spinner>
            </div>
        )
    }

    if (products.length === 0 && !isLoading) {
        return (
            <div className="items-center h-full text-center">
                <h1 className="text-3xl my-5 capitalize">{header()}</h1>
                <h4 className="text-red-700">!! No items found !!</h4>
            </div>
        )
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl my-5">{header()}</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 items-stretch">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
    );
}

export default ProductList;