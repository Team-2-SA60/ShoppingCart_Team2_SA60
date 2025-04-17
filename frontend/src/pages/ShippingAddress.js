import React, {useState, useEffect} from 'react';

const ShippingAddress = ({customer, onAddressChange}) => {

    const [address, setAddress] = useState('');
    const [floorUnitNumber, setFloorUnitNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    useEffect(() => {
        if (!customer) {
            setAddress('');
            setFloorUnitNumber('');
            setPostalCode('');
            return;
        }
        if (!customer.address) {
            return;
        }
        getAddress();
    }, [customer])

    async function getAddress() {
        const customerAddress = customer.address.split("\n");
        setAddress(customerAddress[0]);
        setFloorUnitNumber(customerAddress[1]);
        setPostalCode(customerAddress[2]);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if (onAddressChange) {
            onAddressChange({
                address: e.target.value,
                floorUnitNumber,
                postalCode
            })
        }
    }

    const handleFloorUnitChange = (e) => {
        setFloorUnitNumber(e.target.value);
        if (onAddressChange) {
            onAddressChange({
                address,
                floorUnitNumber: e.target.value,
                postalCode
            })
        }
    }

    const handlePostalChange = (e) => {
        setPostalCode(e.target.value);
        if (onAddressChange) {
            onAddressChange({
                address,
                floorUnitNumber,
                postalCode: e.target.value
            })
        }
    }

    return (
        <div className="grid grid-rows-[1.5fr_3fr_3fr] grid-cols-2 gap-4 h-[100%]">
            <div className="col-span-2 font-bold">Fill in your shipping details:</div>
            <div className="col-span-2">
                <label>Address line *</label>
                <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Input your Street Address"
                    className="p-1 mt-[5px] border-[1px] border-slate-300 rounded-md w-full"
                    required/>
            </div>
            <div className="row-start-3 row-end-3 col-start-1 col-end-1 pr-10">
                <label>Floor/Unit Number *</label>
                <input
                    type="text"
                    value={floorUnitNumber}
                    onChange={handleFloorUnitChange}
                    placeholder="Floor / Unit Number"
                    className="p-1 mt-[5px] border-[1px] border-slate-300 rounded-md w-full"
                    required/>
            </div>
            <div className="row-start-3 row-end-3 col-start-2 col-end-2">
                <label>Postal *</label>
                <input
                    type="number"
                    value={postalCode}
                    onChange={handlePostalChange}
                    placeholder="6-digits postal code"
                    className="p-1 mt-[5px] border-[1px] border-slate-300 rounded-md w-full"
                    required/>
            </div>
        </div>
    )
}

export default ShippingAddress;