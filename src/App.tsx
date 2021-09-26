import { useState } from "react";

import { Dashboard } from "./components/dashboard/Dashboard";
import { Header } from "./components/header/Header";
import { NewTransactionModal } from "./components/newTransactionModal/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  
    const handleOpenIsNewTransactionModalOpen = () => {
      setIsNewTransactionModalOpen(true);
    };

    const handleCloseIsNewTransactionModalOpen = () => {
      setIsNewTransactionModalOpen(false);
    };

  return (
    <TransactionsProvider>
      <Header
        onOpenIsNewTransactionModalOpen={handleOpenIsNewTransactionModalOpen}
      />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseIsNewTransactionModalOpen}
      />

      <Dashboard />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
