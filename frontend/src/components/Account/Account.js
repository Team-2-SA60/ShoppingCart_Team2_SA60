import { useState } from "react";

const Account = () => {

    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 1, label: "Edit Account" },
        { id: 2, label: "Address" },
        { id: 3, label: "Credit Card" }
    ];

    return (
        <div className="flex flex-col">
            {/*navigation to choose*/}
            <div className="flex border-b border-gray-200 justify-evenly">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 font-medium text-sm
                            ${activeTab === tab.id
                                ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
                                : "text-gray-500 hover:text-gray-700"
                            }
                            transition-colors duration-200`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            {/*tab content*/}
            <div className="p-4">
                {activeTab === 1 && <div>Edit Account Content</div>}
                {activeTab === 2 && <div>Address Content</div>}
                {activeTab === 3 && <div>Credit Card Content</div>}
            </div>
        </div>
    )

}

export default Account;