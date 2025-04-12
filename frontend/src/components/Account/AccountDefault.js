const AccountDefault = ({customer}) => {

    return (
        <div>
            <div>
                <h6>Account Details</h6>
                <br/>
            </div>
            <div className="grid grid-cols-1">
                <label>Name</label>
                <div className="p-2 mt-[5px] border-[1px] border-slate-300 rounded-md select-none">
                    {customer.name}
                </div>
            </div>
            <div className="grid grid-cols-1 mt-5">
                <label>Email</label>
                <div className="p-2 mt-[5px] border-[1px] border-slate-300 rounded-md select-none">
                    {customer.email}
                </div>
            </div>
        </div>
    )
}

export default AccountDefault;