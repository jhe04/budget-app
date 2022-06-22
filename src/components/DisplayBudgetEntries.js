import DisplayBudgetEntry from './DisplayBudgetEntry';

const DisplayBudgetEntries = ({ data, removeEntry }) => {
  return (
    <>
      <h2>List of Entries</h2>
      <table className="">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
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
