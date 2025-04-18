import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ProductPagination = ({currentPage, totalPages, handlePageChange}) => {
    
    return (
        <div className="flex space-x-2">
            <Pagination>
                <PaginationItem>
                    <PaginationLink
                        onClick={(e) => handlePageChange(e, currentPage - 1)}
                        previous
                    />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink disabled>
                        {currentPage + 1} / {totalPages}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink
                        onClick={(e) => handlePageChange(e, currentPage + 1)}
                        next
                    />
                </PaginationItem>
            </Pagination>
        </div>
    );
}

export default ProductPagination;