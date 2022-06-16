import { useState } from 'react';

const BudgetOverview = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudgetCap, setNewBudgetCap] = useState('');
  const remainder = props.budgetCap - props.totalSpending;

  const handleChange = (e) => {
    setNewBudgetCap(Number(e.target.value));
  };

  const editBudgetCaps = function (e) {
    if (newBudgetCap) {
      props.editBudgetCap(newBudgetCap);
      setIsEditing(false);
      setNewBudgetCap('');
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="budgetOverview container">
      {/* DIFFERENT ROWS OF THINGS */}

      <div className="budgetCap">
        <h2>Total Budget</h2>
        <p>
          {!isEditing ? (
            `$${props.budgetCap.toFixed(2)}`
          ) : (
            <input
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  editBudgetCaps();
                }
              }}
              onChange={handleChange}
              value={newBudgetCap || ''}
              autoFocus="autofocus"
              type="number"
            />
          )}
        </p>
      </div>

      <div className="currentSpending">
        <h2>Total Spending</h2>
        <p>${props.totalSpending.toFixed(2)}</p>
      </div>

      <div className="remainder">
        <h2>Remainder</h2>
        <p>${remainder.toFixed(2)}</p>
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Budget Cap</button>
      ) : (
        <button onClick={() => editBudgetCaps()}>Confirm</button>
      )}
    </div>
  );
};

export default BudgetOverview;
