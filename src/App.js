import './App.css';
import firebase from './firebase';
import {
  getDatabase,
  ref,
  onValue,
  update,
  push,
  remove,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import BudgetCapInput from './BudgetCapInput';
import BudgetOverview from './BudgetOverview';
import NewBudgetEntry from './NewBudgetEntry';
import DisplayBudgetEntries from './DisplayBudgetEntries';

function App() {
  //states
  const [budgetCap, setBudgetCap] = useState(null);
  const [entries, setEntries] = useState([]);
  const [totalSpending, setTotalSpending] = useState(null);

  //firebase
  const database = getDatabase(firebase);
  const dbRef = ref(database);
  const entryRef = ref(database, '/budgetEntries');

  //on loading
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.budgetCap) {
        setBudgetCap(data.budgetCap);
      }

      //setEntries
      const entriesArray = [];
      for (const entry in data.budgetEntries) {
        entriesArray.push({
          key: entry,
          amount: data.budgetEntries[entry].amount,
          category: data.budgetEntries[entry].category,
          date: data.budgetEntries[entry].date,
          description: data.budgetEntries[entry].description,
        });
      }
      setEntries(entriesArray);
    });
  }, []);

  //total spending
  useEffect(() => {
    const total = entries.reduce((prev, curr) => {
      return prev + curr.amount;
    }, 0);
    setTotalSpending(total);
  }, [entries]);

  //submit handler for BudgetCapInput
  const submitBudgetCap = function (e, budget) {
    e.preventDefault();
    if (budget) {
      setBudgetCap(budget);
      update(dbRef, { budgetCap: budget });
    }
  };

  //submit handler for NewBudgetEntry
  const submitNewEntry = function (e, amount, category, date, description) {
    e.preventDefault();
    if (amount && category) {
      push(entryRef, {
        amount: amount,
        category: category,
        date: date,
        description: description,
      });
    }
  };

  //handler for removing entry
  const removeEntry = (key) => {
    const removeRef = ref(database, `budgetEntries/${key}`);
    remove(removeRef);
  };

  //handler for editing budget cap
  const editBudgetCap = (amount) => {
    setBudgetCap(amount);
    update(dbRef, { budgetCap: amount });
  };

  return (
    <div className="App">
      <h1>Budget App</h1>

      {/* If there is no budget cap set, display the component for setting budget cap */}
      {!budgetCap ? (
        <BudgetCapInput handleSubmit={submitBudgetCap} />
      ) : (
        <BudgetOverview
          budgetCap={budgetCap}
          totalSpending={totalSpending}
          editBudgetCap={editBudgetCap}
        />
      )}
      <NewBudgetEntry handleSubmit={submitNewEntry} />

      <DisplayBudgetEntries entries={entries} removeEntry={removeEntry} />
    </div>
  );
}

export default App;

//budget-app pseudo code

//App Component
//States: total budget cap, array of spendings, (user input amount, user input category) for the form
//will be use firebase realtime database

//When the app loads, user will see a component to set their budget cap
//once budget it set, it is stored inside a state
//this component then unmounts and a new component showing the budget cap, total spent, and remainder will appear

//There will be a component for a user to make new entries, taking their amount spent, and category of spending.
//upon submission, this entry object will be added to the array of entries, and then updated in the state
//this updated state gets sent to firebase, and onValue will pull the updated information and render it on the page

//lastly, there will be a component to display all the entries row by row
// for each entry, there will be an option to delete the specific entry
//this will use the remove() module from firebase database
