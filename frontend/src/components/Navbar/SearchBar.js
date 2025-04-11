const SearchBar = ({ handleSearch, search, setSearch }) => {

    return (
        <form onSubmit={handleSearch} className='w-[100%]'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search for products"
                className="border border-gray-300 rounded-sm p-2 outline-none w-full focus:border-black focus:ring-1 focus:ring-black" />
        </form>
    )
}

export default SearchBar;