const AccountTab = ({tabs, activeTab, setActiveTab}) => {
    return (
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
    )
}

export default AccountTab;