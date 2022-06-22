import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

//components to display
import CreateNewBudgetSheet from './components/CreateNewBudgetSheet';
import DisplayAllBudgetSheets from './components/DisplayAllBudgetSheets';
import Homepage from './components/Homepage';
import DisplayBudgetSheet from './components/DisplayBudgetSheet';

function App() {
  return (
    <>
      <header>
        <nav>
          <div className="main-title">
            <Link to="/">
              <h1>Budget App</h1>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/new-budget-sheet">Create New Sheet</Link>
            </li>
            <li>
              <Link to="/budget-sheets">All Budget Sheets</Link>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="new-budget-sheet" element={<CreateNewBudgetSheet />} />
        <Route path="budget-sheets/*" element={<DisplayAllBudgetSheets />}>
          <Route path=":sheetId" element={<DisplayBudgetSheet />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
