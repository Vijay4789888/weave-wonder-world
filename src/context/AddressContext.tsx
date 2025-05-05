
import React, { createContext, useState, useContext, useEffect } from 'react';

interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  state: string;
  type: 'Home' | 'Work' | 'Other';
}

interface AddressContextType {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

const AddressContext = createContext<AddressContextType>({
  addresses: [],
  selectedAddressId: null,
  addAddress: () => {},
  updateAddress: () => {},
  removeAddress: () => {},
  selectAddress: () => {},
});

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '9876543210',
      pincode: '400001',
      address: '123, Main Street, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Home'
    },
    {
      id: '2',
      name: 'John Doe',
      phone: '9876543210',
      pincode: '110001',
      address: '456, Work Plaza, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      type: 'Work'
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>('1'); // Default to first address
  
  useEffect(() => {
    // Load addresses from localStorage on initial load
    const savedAddresses = localStorage.getItem('addresses');
    const savedSelectedId = localStorage.getItem('selectedAddressId');
    
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
    
    if (savedSelectedId) {
      setSelectedAddressId(savedSelectedId);
    }
  }, []);
  
  useEffect(() => {
    // Save addresses to localStorage whenever they change
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);
  
  useEffect(() => {
    // Save selected address to localStorage
    if (selectedAddressId) {
      localStorage.setItem('selectedAddressId', selectedAddressId);
    }
  }, [selectedAddressId]);
  
  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: Math.random().toString(36).substring(2, 9) // Generate random id
    };
    
    setAddresses(prevAddresses => [...prevAddresses, newAddress]);
    
    // If this is the first address, select it
    if (addresses.length === 0) {
      setSelectedAddressId(newAddress.id);
    }
  };
  
  const updateAddress = (id: string, address: Omit<Address, 'id'>) => {
    setAddresses(prevAddresses =>
      prevAddresses.map(addr =>
        addr.id === id ? { ...address, id } : addr
      )
    );
  };
  
  const removeAddress = (id: string) => {
    setAddresses(prevAddresses => 
      prevAddresses.filter(address => address.id !== id)
    );
    
    // If the removed address was selected, select another one if available
    if (selectedAddressId === id) {
      const remainingAddresses = addresses.filter(address => address.id !== id);
      setSelectedAddressId(remainingAddresses.length > 0 ? remainingAddresses[0].id : null);
    }
  };
  
  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };
  
  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        addAddress,
        updateAddress,
        removeAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => useContext(AddressContext);
