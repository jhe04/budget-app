import BudgetEntry from "./BudgetEntry";

const DisplayBudgetEntries = ({entries}) => {
  return (
    <>
      <h1>List of Entries</h1>
      <table className="container">
        <tbody>
          <tr>
            <td>
              <h2>Date</h2>
            </td>
            <td>
              <h2>Amount</h2>
            </td>
            <td>
              <h2>Category</h2>
            </td>
          </tr>
          {
            entries.map((entry) => {
                return <BudgetEntry date={entry.date} amount={entry.amount} category={entry.category} key={entry.key}/>
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default DisplayBudgetEntries;
