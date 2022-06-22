import { useState } from 'react';

const BudgetCapInput = (props) => {
  const [budget, setBudget] = useState('');
  

  const handleChange = (e) => {
    setBudget(Number(e.target.value));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          props.handleSubmit(e, budget);
          setBudget('');
        }}
        action=""
        className="budgetCapInput"
      >
        <label htmlFor="budgetCap">What is your monthly budget?</label>
        <input
          value={budget}
          onChange={handleChange}
          type="text"
          id="budgetCap"
        />
        <button>Confirm</button>
      </form>
    </>
  );
};

export default BudgetCapInput;
