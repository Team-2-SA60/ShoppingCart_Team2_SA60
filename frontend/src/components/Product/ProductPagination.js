const ProductPagination = ({currentPage, totalPages, handlePageChange}) => {
    
    return (
        <div className="flex justify-center mt-6 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
                <button key={index} className={`px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default ProductPagination;