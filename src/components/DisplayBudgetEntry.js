const DisplayBudgetEntry = ({ data, handleClick }) => {
  return (
    <>
      <tr>
        <td className="date">{data.date}</td>
        <td className="amount">${data.amount.toFixed(2)}</td>
        <td className="description">{data.description}</td>
        <td className="category">{data.category}</td>
        <td>
          <button onClick={() => handleClick(data.id)}>delete</button>
        </td>
      </tr>
    </>
  );
};

export default DisplayBudgetEntry;
