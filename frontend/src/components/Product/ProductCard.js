import ProductAddButtons from "./ProductAddButtons";

const ProductCard = ({product}) => {

    return (
        <div className="bg-white rounded-3xl contain-content pb-4 shadow-lg w-[225px] hover:scale-[1.02] transition-transform duration-300 ease-in-out transform origin-center">
            <div className="flex flex-col justify-center items-center">
                <img src={`./images/products/${product.image}`} alt={product.name} className='object-cover h-[300px]' /><br />
                <div className="-mt-2">
                    <h5>{product.name}</h5>
                    <div>{product.description}</div>
                    <div>S${(product.price - product.discount).toFixed(2)}</div>
                    <br/>
                    <ProductAddButtons/>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;