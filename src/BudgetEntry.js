const BudgetEntry = (props) => {
  return (
    <>
      <tr>
        <td className="date">{props.date}</td>
        <td className="amount">${props.amount.toFixed(2)}</td>
        <td className="description">{props.description}</td>
        <td className="category">{props.category}</td>
        <td>
          <button onClick={() => props.handleClick(props.id)}>delete</button>
        </td>
      </tr>
    </>
  );
};

export default BudgetEntry;
