import { useState } from 'react';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import WarningModal from './WarningModal';

const NewBudgetSheet = (props) => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const [name, setName] = useState('');
  const [budgetTotal, setBudgetTotal] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isWarning, setIsWarning] = useState(false);

  // Forms
  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleBudgetInputChange = (e) => {
    setBudgetTotal(e.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (e, budgetAmount, nameOfSheet, categories) => {
    e.preventDefault();
    if (categories.length === 0) {
      setIsWarning(true);
    } else {
      const newBudgetSheet = {
        budgetCap: budgetAmount,
        name: nameOfSheet,
        categories: categories,
      };

      push(dbRef, newBudgetSheet).then((res) => {
        setName('');
        setBudgetTotal('');
        navigate(`../budget-sheets/${res.key}`);
      });
    }
  };

  const closeModal = () => {
    setIsWarning(false);
  };

  // categories
  const handleCategoryInput = (e) => {
    setCategoriesInput(e.target.value);
  };

  const handleAddCategoryClick = (e) => {
    e.preventDefault();
    if (categoriesInput && categoriesInput !== ' ') {
      const newCategoriesArray = [...categoriesArray];
      newCategoriesArray.push(categoriesInput);
      setCategoriesArray(newCategoriesArray);
      setCategoriesInput('');
    }
  };

  const handleRemoveCategoryClick = (e, categoryName) => {
    e.preventDefault();
    const newCategoriesArray = categoriesArray.filter((category) => {
      return category !== categoryName;
    });
    setCategoriesArray(newCategoriesArray);
  };

  return (
    <div className="container">
      <h2>New Budget Sheet</h2>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e, budgetTotal, name, categoriesArray);
        }}
        className="create-new-sheet"
      >
        <div className=" field">
          <label htmlFor="budget-name">Name of sheet</label>
          <input
            onChange={handleNameInputChange}
            type="text"
            id="budget-name"
            value={name}
            required
          />
        </div>
        <div className=" field">
          <label htmlFor="budget-total">Enter total budget</label>
          <input
            onChange={handleBudgetInputChange}
            type="number"
            id="budget-total"
            step="any"
            value={budgetTotal}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="">Enter a category</label>
          <div className="add-categories">
            <input
              value={categoriesInput}
              onChange={handleCategoryInput}
              type="text"
            />
            <button onClick={handleAddCategoryClick} className="button green">
              Add
            </button>
          </div>

          {categoriesArray.length > 0 ? (
            <>
              <div className=" category-list">
                {categoriesArray.map((category, index) => {
                  return (
                    <div
                      key={`${category}+${index}`}
                      id={category}
                      className="category-list-item"
                    >
                      {category}
                      <button
                        onClick={(e) => handleRemoveCategoryClick(e, category)}
                        className="button red"
                      >
                        remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            ''
          )}
        </div>

        <button className="submit-button button blue">Create</button>
      </form>
      <WarningModal isWarning={isWarning} closeModal={closeModal}>
        <h3>Please enter at least one category</h3>
      </WarningModal>
    </div>
  );
};

export default NewBudgetSheet;
