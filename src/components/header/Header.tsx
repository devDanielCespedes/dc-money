import Logo from "../../assets/logo.svg";
import { Container, Content } from "./style";

interface HeaderProps {
  onOpenIsNewTransactionModalOpen: () => void;
}

export function Header({ onOpenIsNewTransactionModalOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="DC money logo" />
        <button onClick={onOpenIsNewTransactionModalOpen}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
