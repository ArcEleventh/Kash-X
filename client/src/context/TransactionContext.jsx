import React, { createContext, useContext, useState } from 'react';

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...transaction
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => useContext(TransactionContext);
