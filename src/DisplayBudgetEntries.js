import { remove } from 'firebase/database';
import BudgetEntry from './BudgetEntry';

const DisplayBudgetEntries = ({ entries, removeEntry }) => {
  return (
    <>
      <h2>List of Entries</h2>
      <table className="container">
        <tbody>
          <tr>
            <td>
              <h3>Date</h3>
            </td>
            <td>
              <h3>Amount</h3>
            </td>
            <td>
              <h3>Description</h3>
            </td>
            <td>
              <h3>Category</h3>
            </td>
          </tr>
          {entries.map((entry) => {
            return (
              <BudgetEntry
                date={entry.date}
                amount={entry.amount}
                category={entry.category}
                key={entry.key}
                id={entry.key}
                handleClick={removeEntry}
                description={entry.description}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DisplayBudgetEntries;
