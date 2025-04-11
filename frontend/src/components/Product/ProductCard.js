import ProductAddButtons from "./ProductAddButtons";

const ProductCard = ({product}) => {

    return (
        <div className="relative bg-white rounded-3xl contain-content pb-4 shadow-lg w-[225px] hover:scale-[1.02] transition-transform duration-300 ease-in-out transform origin-center">
            <div className="flex flex-col justify-center items-center">
                <img src={`../images/products/${product.image}`} alt={product.name} className='object-cover h-[300px]' /><br />
                <div className="-mt-2">
                    <h5 className="line-clamp-1">{product.name}</h5>
                    <div className="line-clamp-1">{product.description}</div>
                    {product.discount === 0 ? 
                        (<div>S${(product.price - product.discount).toFixed(2)}</div>) 
                        : 
                        (<div><s className="text-[14px]">S${(product.price).toFixed(2)}</s> &nbsp; <b className="text-red-600 ">S${(product.price - product.discount).toFixed(2)}</b></div>)}

                </div>
            </div>
            <br/>
            <div className="fixed bottom-3 ml-3">
                <ProductAddButtons />
            </div>
        </div>
    )
}

export default ProductCard;