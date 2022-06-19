import { useEffect, useState } from 'react';
import createDate from '../createDate';

const NewBudgetEntryForm = (props) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setDate(createDate());
  }, []);

  const handleAmountChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <form
      className="newEntryForm"
      onSubmit={(e) => {
        props.handleSubmit(e, amount, category, date, description);
        setAmount('');
        setCategory('');
        setDescription('');
      }}
    >
      <div className="amountInput">
        <label htmlFor="amount">Amount</label>
        <input
          value={amount || ''}
          onChange={handleAmountChange}
          type="number"
          id="amount"
          step="any"
        />
      </div>

      <div className="descriptionInput">
        <label htmlFor="description">Description</label>
        <input
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          id="description"
        />
      </div>

      <div className="categoryInput">
        <label htmlFor="category">Category</label>
        <select
          onChange={handleCategoryChange}
          value={category}
          name=""
          id="category"
        >
          <option disabled value="">
            Select an option:
          </option>
          {/* this is to account for the async data loading after my component renders */}
          {props.categories && props.categories.length > 0
            ? props.categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })
            : ''}
        </select>
      </div>

      <button>Submit</button>
    </form>
  );
};

export default NewBudgetEntryForm;
