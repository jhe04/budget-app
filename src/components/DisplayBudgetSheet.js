import { useParams } from 'react-router-dom';
import firebase from '../firebase';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  remove,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import NewBudgetEntryForm from './NewBudgetEntryForm';
import DisplayBudgetEntries from './DisplayBudgetEntries';
import BudgetOverview from './BudgetOverview';

const BudgetSheet = (props) => {
  //states
  const { sheetId } = useParams();

  const [entries, setEntries] = useState([]);
  const [budgetCap, setBudgetCap] = useState('');
  const [totalSpending, setTotalSpending] = useState('');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('');

  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${sheetId}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setBudgetCap(data.budgetCap);

      const entriesArray = [];
      for (const entry in data.budgetEntries) {
        entriesArray.push({
          amount: data.budgetEntries[entry].amount,
          category: data.budgetEntries[entry].category,
          date: data.budgetEntries[entry].date,
          description: data.budgetEntries[entry].description,
          id: entry,
        });
      }

      setEntries(entriesArray);
      setName(data.name);
      setCategories(data.categories);
    });
  }, [sheetId]);

  //calculate total spending
  useEffect(() => {
    const total = entries.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    setTotalSpending(total);
  }, [entries]);

  //update budget cap
  const editBudgetCap = (amount) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${sheetId}`);
    setBudgetCap(amount);
    update(dbRef, { budgetCap: amount });
  };

  //submit new entry
  const handleNewEntrySubmit = (e, amount, category, date, description) => {
    e.preventDefault();
    const database = getDatabase(firebase);
    const entryRef = ref(database, `/${sheetId}/budgetEntries`);
    if (amount && category) {
      push(entryRef, {
        amount: amount,
        category: category,
        date: date,
        description: description,
      });
    }
  };

  //remove specific budget entry
  const removeEntry = (key) => {
    const database = getDatabase(firebase);
    const removeRef = ref(database, `/${sheetId}/budgetEntries/${key}`);
    remove(removeRef);
  };

  return (
    <div className="container">
      <h2>{name}</h2>

      <BudgetOverview
        budgetCap={budgetCap}
        totalSpending={totalSpending}
        editBudgetCap={editBudgetCap}
      />

      <NewBudgetEntryForm
        handleSubmit={handleNewEntrySubmit}
        categories={categories}
      />

      <DisplayBudgetEntries data={entries} removeEntry={removeEntry} />
    </div>
  );
};

export default BudgetSheet;
