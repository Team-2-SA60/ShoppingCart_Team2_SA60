import AccountTab from "./AccountTab";
import AccountDefault from "./AccountDefault";
import { useEffect } from "react";
import { useSession } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";


const Account = ({activeTab, setActiveTab}) => {

    const { customer, setCustomer, checkSession } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        getCustomer();
        // eslint-disable-next-line
    }, [])

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
            <div className="py-4 pr-5 h-[400px]">
                {activeTab === 0 && <AccountDefault customer={customer}/>}
                {activeTab === 1 && <div>Edit Account Content</div>}
                {activeTab === 2 && <div>Address Content</div>}
                {activeTab === 3 && <div>Credit Card Content</div>}
            </div>
        </div>
    )

}

export default Account;