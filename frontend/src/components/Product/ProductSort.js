const ProductSort = ({sortBy, setSortBy, sortOrder, setSortOrder}) => {

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sortBy" className="text-gray-700">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-md p-1">
                <option value="id">Default</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>
            <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border border-gray-300 rounded-md p-1">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    )
}

export default ProductSort;