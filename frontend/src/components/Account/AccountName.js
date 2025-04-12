const AccountName = () => {

    return (
        <div className="flex flex-col h-full">
            <div>
                <h6>Account Details</h6>
                <br />
            </div>
            <div>
                <label>Name</label>
                <div className="p-2 mt-[5px] my-[5%] border-[1px] border-slate-300 rounded-md select-none">
                    {customer.name}
                </div>
            </div>
            <div>
                <label>Email</label>
                <div className="p-2 mt-[5px] my-[5%] border-[1px] border-slate-300 rounded-md select-none">
                    {customer.email}
                </div>
            </div>
            {customer.address ?
                <div>
                    <label>Address</label>
                    <div className="p-2 mt-[5px] border-[1px] border-slate-300 rounded-md select-none">
                        {customer.address}
                    </div>
                </div>
                :
                ""
            }
        </div>
    )
}

export default AccountName;