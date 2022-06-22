import { useEffect, useState } from 'react';
import createDate from '../createDate';
import WarningModal from './WarningModal';

const NewBudgetEntryForm = (props) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isWarning, setIsWarning] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

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

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const closeWarningModal = () => {
    setIsWarning(false);
  };

  const handleAddCategoryStart = (e) => {
    e.preventDefault();
    setIsAddingCategory(true);
  };

  const handleAddCategoryEnd = (e) => {
    e.preventDefault();
    setIsAddingCategory(false);
    if (newCategory.trim()) {
      props.addNewCategory(newCategory.trim());
    }
    setNewCategory('');
  };

  return (
    <>
      <form
        className="newEntryForm segment"
        onSubmit={(e) => {
          e.preventDefault();
          if (amount && category && description) {
            props.handleSubmit(e, amount, category, date, description);
            setAmount('');
            setCategory('');
            setDescription('');
          } else {
            setIsWarning(true);
          }
        }}
      >
        <div className="amountInput field">
          <label htmlFor="amount">Amount</label>
          <input
            value={amount || ''}
            onChange={handleAmountChange}
            type="number"
            id="amount"
            step="any"
            disabled={isAddingCategory ? true : false}
          />
        </div>

        <div className="descriptionInput field">
          <label htmlFor="description">Description</label>
          <input
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            id="description"
            disabled={isAddingCategory ? true : false}
          />
        </div>

        {isAddingCategory ? (
          <div className="field">
            <label htmlFor="new-category">Add new category</label>
            <input
              type="text"
              id="new-category"
              value={newCategory}
              onChange={handleNewCategoryChange}
            />
          </div>
        ) : (
          <div className="categoryInput field">
            <label htmlFor="category">Category</label>
            <select
              onChange={handleCategoryChange}
              value={category}
              name="category"
              id="category"
            >
              <option disabled value="">
                Select an option:
              </option>
              {/* this is to account for the async data loading after component renders */}
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
        )}

        <div className="new-entry-buttons">
          <button className="button green">Submit</button>
          {isAddingCategory ? (
            <button className="button green" onClick={handleAddCategoryEnd}>
              Confirm
            </button>
          ) : (
            <button className="button blue" onClick={handleAddCategoryStart}>
              Add Category
            </button>
          )}
        </div>
      </form>
      <WarningModal isWarning={isWarning} closeModal={closeWarningModal}>
        <h3>Please ensure all fields are filled out</h3>
      </WarningModal>
    </>
  );
};

export default NewBudgetEntryForm;
