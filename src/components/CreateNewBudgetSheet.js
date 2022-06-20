import { useState } from 'react';
import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const NewBudgetSheet = (props) => {
  const database = getDatabase(firebase);
  const dbRef = ref(database);

  const [name, setName] = useState('');
  const [budgetTotal, setBudgetTotal] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [categoriesArray, setCategoriesArray] = useState([]);

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleBudgetInputChange = (e) => {
    setBudgetTotal(e.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (e, budgetAmount, nameOfSheet, categories) => {
    e.preventDefault();
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
  };

  const handleCategoryInput = (e) => {
    setCategoriesInput(e.target.value);
  };

  const handleAddCategoryClick = (e) => {
    e.preventDefault();
    const newCategoriesArray = [...categoriesArray];
    newCategoriesArray.push(categoriesInput);
    setCategoriesArray(newCategoriesArray);
    setCategoriesInput('');
  };

  const handleRemoveCategoryClick = (e, categoryName) => {
    e.preventDefault();
    const newCategoriesArray = categoriesArray.filter((category) => {
      return category !== categoryName;
    });
    setCategoriesArray(newCategoriesArray);
  };

  return (
    <div className=" container">
      <h2>New Budget Sheet</h2>
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(e, budgetTotal, name, categoriesArray);
        }}
        className="ui form create-new-sheet"
      >
        <div className="field">
          <label htmlFor="budget-name">Name of sheet</label>
          <input
            onChange={handleNameInputChange}
            type="text"
            id="budget-name"
            value={name}
            required
          />
        </div>
        <div className="field">
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
        <div className="add-categories">
          <label htmlFor="">Enter a category</label>
          <div className="field">
            <input
              value={categoriesInput}
              onChange={handleCategoryInput}
              type="text"
            />
            <button
              onClick={handleAddCategoryClick}
              className="ui button green"
            >
              Add
            </button>
          </div>

          {categoriesArray.length > 0 ? (
            <>
              <div className="ui segment category-list">
                {categoriesArray.map((category, index) => {
                  return (
                    <div
                      key={`${category}+${index}`}
                      id={category}
                      className="category-list-item ui segment"
                    >
                      {category}
                      <button
                        onClick={(e) => handleRemoveCategoryClick(e, category)}
                        className="ui button red"
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

        <button className="ui button primary submit-button">Create</button>
      </form>

      {/* <div class={`ui segment error-modal`}>
        <p>
          Your inbox is getting full, would you like us to enable automatic
          archiving of old messages?
        </p>

        <div class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Ok
        </div>
      </div> */}
    </div>
  );
};

export default NewBudgetSheet;
