import AccountTab from "./AccountTab";
import AccountName from "./AccountName";
import AccountPassword from "./AccountPassword";
import { useEffect } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import AccountAddress from "./AccountAddress";
import AccountCreditCard from "./AccountCreditCard";


const Account = ({activeTab, setActiveTab}) => {

    const { customer, setCustomer, checkSession } = useSession();
    const navigate = useNavigate();

    // Refreshes customer on every tab
    useEffect(() => {
        getCustomer();
        // eslint-disable-next-line
    }, [activeTab])

    async function getCustomer() {
        const getCustomer = await checkSession();
        setCustomer(getCustomer);
        if (!getCustomer) navigate("/login");
    }

    if (!customer) {
        return (
            <div className="place-content-center text-center w-full h-full">
                <Spinner>
                    Loading...
                </Spinner>
            </div>
        )
    }

    const tabs = [
        { id: 1, label: "Change Password" },
        { id: 2, label: "Address" },
        { id: 3, label: "Credit Card" }
    ];

    return (
        <div className="flex flex-col">
            {/*tabs to choose*/}
            <AccountTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
            
            {/*content after selecting tab*/}
            <div className="py-3 pr-4 h-[400px]">
                {activeTab === 0 && <AccountName customer={customer} />}
                {activeTab === 1 && <AccountPassword />}
                {activeTab === 2 && <AccountAddress customer={customer} />}
                {activeTab === 3 && <AccountCreditCard />}
            </div>
        </div>
    )

}

export default Account;