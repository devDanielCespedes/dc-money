import { Container } from "./style";
import { Summary } from "../summary/Summary";
import TransactionsTable from "../transactionsTable/TransactionsTable";

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
