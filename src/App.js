import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import BudgetCapInput from './BudgetCapInput';
import BudgetOverview from './BudgetOverview';

function App() {
  //states
  const [budgetCap, setBudgetCap] = useState(null);

  useEffect(() => {
    //firebase
    const database = getDatabase(firebase);
    const dbRef = ref(database);

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setBudgetCap(data.budgetCap);
    });
  }, []);

  //submit handler for BudgetCapInput
  const submitBudgetCap = function (e, budget) {
    e.preventDefault();
    if (budget) {
      setBudgetCap(budget);
    }
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      {/* If there is no budget cap set, display the component for setting budget cap */}
      {!budgetCap ? (
        <BudgetCapInput handleSubmit={submitBudgetCap} />
      ) : (
        <BudgetOverview budgetCap={budgetCap} />
      )}
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
