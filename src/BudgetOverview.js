const BudgetOverview = (props) => {
  const spending = 13;
  const remainder = props.budgetCap - spending;

  return (
    <div className="budgetOverview container">
      <div className="budgetCap">
        <h2>Total Budget</h2>
        <p>${props.budgetCap.toFixed(2)}</p>
      </div>
      <div className="currentSpending">
        <h2>Amount Spent</h2>
        <p>${(13).toFixed(2)}</p>
      </div>
      <div className="remainder">
        <h2>Remainder</h2>
        <p>${remainder.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default BudgetOverview;
