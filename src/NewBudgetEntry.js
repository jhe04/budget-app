import { useEffect, useState } from 'react';
import createDate from './createDate';

const NewBudgetEntry = (props) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(()=> {
    setDate(createDate());
  },[])

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <form
      className="newEntryForm container"
      onSubmit={(e) => {
        props.handleSubmit(e, amount, category, date);
        setAmount('');
        setCategory('');
      }}
    >
      <div className="amountInput">
        <label htmlFor="amount">Amount</label>
        <input
          value={amount}
          onChange={handleAmountChange}
          type="text"
          id="amount"
        />
      </div>
      <div className="categoryInput">
        <label htmlFor="category">Category</label>
        <input
          value={category}
          onChange={handleCategoryChange}
          type="text"
          id="category"
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default NewBudgetEntry;
