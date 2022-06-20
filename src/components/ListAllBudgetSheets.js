import firebase from '../firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ListAllBudgetSheets = () => {
  const [budgetSheets, setBudgetSheets] = useState([]);

  //get all budget sheets
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();

      const entriesArray = [];
      for (const sheet in data) {
        entriesArray.push({
          id: sheet,
          data: data[sheet],
        });
      }
      setBudgetSheets(entriesArray);
    });
  }, []);

  //delete a budget sheet
  const deleteSheet = (key) => {
    const database = getDatabase(firebase);
    const removeRef = ref(database, `/${key}`);
    remove(removeRef);
  };

  return (
    <div className="container list-all-budget-sheets">
      <h2>Budget Sheet List</h2>
      <ul>
        {budgetSheets.map((entry) => {
          //code to get a total spent amount
          const amountsArray = [];
          for (const amounts in entry.data.budgetEntries) {
            amountsArray.push(entry.data.budgetEntries[amounts].amount);
          }
          const total = amountsArray.reduce((prev, curr) => {
            return prev + curr;
          }, 0);

          //returning actual jsx
          return (
            <li className="ui segment" key={entry.id}>
              <div className="budget-sheet-link-overview">
                <p>{entry.data.name}</p>
                <p>Budget: ${entry.data.budgetCap.toLocaleString('en-US')}</p>
                <p>Total Spent: ${total.toLocaleString('en-US')}</p>
                <p>
                  {' '}
                  Remainder: $
                  {(entry.data.budgetCap - total).toLocaleString('en-US')}
                </p>
              </div>
              <button className="ui button primary">
                <Link
                  to={`/budget-sheets/${entry.id}`}
                  className="budget-sheet-link"
                >
                  View
                </Link>
              </button>
              <button
                className="ui button red"
                onClick={() => deleteSheet(entry.id)}
              >
                Delete Sheet
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListAllBudgetSheets;
