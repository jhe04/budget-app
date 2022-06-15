const BudgetEntry = (props) => {
  return (
    <>
      <tr>
        <td className="date">{props.date}</td>
        <td className="amount">${props.amount.toFixed(2)}</td>
        <td className="category">{props.category}</td>
        <td>
          <button>delete</button>
        </td>
      </tr>
    </>
  );
};

export default BudgetEntry;
