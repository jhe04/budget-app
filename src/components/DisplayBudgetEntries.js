import DisplayBudgetEntry from './DisplayBudgetEntry';

const DisplayBudgetEntries = ({ data, removeEntry }) => {
  return (
    <>
      <h2>List of Entries</h2>
      <table>
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
          {data.map((entry) => {
            return (
              <DisplayBudgetEntry
                handleClick={removeEntry}
                data={entry}
                key={entry.id}
                id={entry.id}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DisplayBudgetEntries;
