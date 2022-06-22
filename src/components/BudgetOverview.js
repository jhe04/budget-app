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
    <div className="budgetOverview segment">
      {/* DIFFERENT ROWS OF THINGS */}

      <div className="budgetCap">
        <h3>Total Budget</h3>
        <p>
          {!isEditing ? (
            `$${props.budgetCap.toLocaleString('en-US')}`
          ) : (
            <div className="">
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
            </div>
          )}
        </p>
      </div>

      <div className="currentSpending">
        <h3>Total Spending</h3>
        <p>${props.totalSpending.toLocaleString('en-US')}</p>
      </div>

      <div className="remainder">
        <h3>Remainder</h3>
        <p className={remainder < 0 ? 'red-text' : ''} >${remainder.toLocaleString('en-US')}</p>
      </div>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)} className="button blue">
          Edit Budget Cap
        </button>
      ) : (
        <button onClick={() => editBudgetCaps()} className="button green">
          Confirm
        </button>
      )}
    </div>
  );
};

export default BudgetOverview;
