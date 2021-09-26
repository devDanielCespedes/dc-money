import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInputProps {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransactionInputProps = Omit<TransactionProps, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextProviderData {
  transactions: TransactionProps[],
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}

 const TransactionsContext =
  createContext<TransactionsContextProviderData>(
    {} as TransactionsContextProviderData
  );

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = async (transactionInput: TransactionInputProps) => {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date()
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext)
  return context;
}
