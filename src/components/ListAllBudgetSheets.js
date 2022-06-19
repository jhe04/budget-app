import firebase from '../firebase';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  remove,
} from 'firebase/database';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ListAllBudgetSheets = () => {
  const [entries, setEntries] = useState([]);

  //get all budget sheets
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);

      const entriesArray = [];
      for (const sheet in data) {
        entriesArray.push({
          id: sheet,
          data: data[sheet],
        });
      }
      setEntries(entriesArray);
    });
  }, []);

  return (
    <>
      <h2>Budget Sheet List</h2>
      <ul>
        {entries.map((entry) => {
          return (
            <li>
              <div>
                <Link to={`/budget-sheets/${entry.id}`}>{entry.data.name}</Link>
                <p>Budget: ${entry.data.budgetCap.toFixed(2)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListAllBudgetSheets;
