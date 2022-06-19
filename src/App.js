import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

//components to display
import CreateNewBudgetSheet from './components/CreateNewBudgetSheet';
import DisplayAllBudgetSheets from './components/DisplayAllBudgetSheets';
import Homepage from './components/Homepage';
import DisplayBudgetSheet from './components/DisplayBudgetSheet';

function App() {
  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1>Budget App</h1>
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="new-budget-sheet" element={<CreateNewBudgetSheet />} />
        <Route path="budget-sheets/*" element={<DisplayAllBudgetSheets />}>
          <Route path=":sheetId" element={<DisplayBudgetSheet />} />
        </Route>
      </Routes>
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
