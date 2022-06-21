import firebase from '../firebase';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteModal from './DeleteModal';

const ListAllBudgetSheets = () => {
  const [budgetSheets, setBudgetSheets] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteKey, setDeleteKey] = useState('');
  const [deleteSheetName, setDeleteSheetName] = useState('');

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

  //handle delete button click
  const handleDeleteClick = (key, name) => {
    setIsDeleting(true);
    setDeleteKey(key);
    setDeleteSheetName(name);
  };

  //delete a budget sheet
  const deleteSheet = (key) => {
    const database = getDatabase(firebase);
    const removeRef = ref(database, `/${key}`);
    remove(removeRef);
    setIsDeleting(false);
  };

  //handle modal close
  const closeModal = () => {
    setIsDeleting(false);
    setDeleteKey('');
  };

  return (
    <>
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
              <li key={entry.id} className="ui segment budget-sheet-link">
                <div className="budget-sheet-link-overview">
                  <p>{entry.data.name}</p>
                  <p>Budget: ${entry.data.budgetCap.toLocaleString('en-US')}</p>
                  <p>Total Spent: ${total.toLocaleString('en-US')}</p>
                  <p>
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
                  onClick={() => handleDeleteClick(entry.id, entry.data.name)}
                >
                  Delete Sheet
                </button>
              </li>
            );
          })}
        </ul>
        <DeleteModal
          isDeleting={isDeleting}
          deleteSheet={deleteSheet}
          closeModal={closeModal}
          deleteKey={deleteKey}
          deleteSheetName={deleteSheetName}
        />
      </div>
    </>
  );
};

export default ListAllBudgetSheets;
