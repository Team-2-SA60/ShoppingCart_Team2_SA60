import { useEffect, useState } from "react";
import { data, useParams, useSearchParams } from "react-router-dom";
import api from "../../utilities/axios";
import ProductCard from "./ProductCard"
import ProductPagination from "./ProductPagination";
import { Spinner } from "reactstrap";
import { useSession } from "../../context/SessionContext";



const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [wishListProducts, setWishList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { checkSession } = useSession();
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

   
    useEffect(() => {
        getCustomer();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setLoading(true);
        const search = getSearch();
        getProducts(search);
        // eslint-disable-next-line
    }, [searchParams, category, currentPage]);

    useEffect(() => {
        getProducts("");
    }, [sortBy, sortOrder]);

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
        //setCurrentPage(0);
    }

    async function getProducts(search) {
        const productsPerPage = 4;

        let fetchURL = `/products?page=${currentPage}&size=${productsPerPage}&keyword=`;

        // for search bar
        if (search) fetchURL += `${search}`;

        // if click category on nav bar
        if (category) fetchURL = `/products/${category}?page=${currentPage}&size=${productsPerPage}`;

        // for sorting
        if (sortBy) fetchURL = `/products/${sortBy}`;
        if (sortOrder) fetchURL += `/${sortOrder}`;

        try {
            const response = await api.get(fetchURL);
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
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

    function handlePageChange(e, pageNumber) {
        e.preventDefault();
        if (pageNumber < 0) {
            setCurrentPage(totalPages - 1);
            return;
        }
        setCurrentPage(pageNumber);
    }

    if (totalPages !== 0 && currentPage > totalPages - 1) {
        setCurrentPage(0);
    }

    const productList = products.map(product => {
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
    
  };

    return (
        <div className="text-center">
            <h1 className="text-3xl my-5">{header()}</h1>
            <div className="flex justify-center mb-5">
                <div className="flex items-center space-x-2">
                    <label htmlFor="sortBy" className="text-gray-700">Sort by:</label>
                    <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-md p-1">
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                    <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border border-gray-300 rounded-md p-1">
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-24 items-stretch">
                {productList}
            </div>
            <ProductPagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
        </div>
    );
}

export default ProductList;