import { useState, FormEvent } from "react";

import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./style";

import closeImg from "../../assets/close.svg";
import incomedImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root"); // para acessibilidade

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [transactionType, setTransactionType] = useState("deposit");
  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [transactionValue, setTransactionValue] = useState(0);

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();
    await createTransaction({
      title: transactionTitle,
      amount: transactionValue,
      category: transactionCategory,
      type: transactionType,
    });

    setTransactionCategory("");
    setTransactionTitle("");
    setTransactionType("deposit");
    setTransactionValue(0);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={transactionTitle}
          onChange={(event) => setTransactionTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={transactionValue}
          onChange={(event) => setTransactionValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setTransactionType("deposit")}
            isActive={transactionType === "deposit"}
            activeColor="green"
          >
            <img src={incomedImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setTransactionType("withdraw")}
            isActive={transactionType === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={transactionCategory}
          onChange={(event) => setTransactionCategory(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
