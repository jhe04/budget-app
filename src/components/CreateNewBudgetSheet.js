import { useState } from 'react';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const NewBudgetSheet = (props) => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const [name, setName] = useState('');
  const [budgetTotal, setBudgetTotal] = useState('');

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleBudgetInputChange = (e) => {
    setBudgetTotal(e.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (e, budgetAmount, nameOfSheet) => {
    e.preventDefault();
    const newBudgetSheet = {
      budgetCap: budgetAmount,
      name: nameOfSheet,
    };

    push(dbRef, newBudgetSheet).then((res) => {
      setName('');
      setBudgetTotal('');
      navigate(`../budget-sheets/${res.key}`);
    });
  };

  return (
    <>
      <h2>New Budget Sheet</h2>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e, budgetTotal, name);
        }}
      >
        <div>
          <label htmlFor="budget-name">Name of sheet</label>
          <input
            onChange={handleNameInputChange}
            type="text"
            id="budget-name"
            value={name}
          />
        </div>
        <div>
          <label htmlFor="budget-total">Enter total budget</label>
          <input
            onChange={handleBudgetInputChange}
            type="number"
            id="budget-total"
            step="any"
            value={budgetTotal}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default NewBudgetSheet;
