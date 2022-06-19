import { useState, useEffect } from 'react';
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
    const newCategoriesArray = categoriesArray.filter(category => {
      return category !== categoryName;
    })
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
          />
        </div>
        <div className="add-categories">
          <h3>Add categories</h3>

          <div className="field">
            <label htmlFor="" className="sr-only">
              Enter a category
            </label>
            <input
              value={categoriesInput}
              onChange={handleCategoryInput}
              type="text"
            />
            <button onClick={handleAddCategoryClick}>Add</button>
          </div>

          <div>
            <ul>
              {categoriesArray.map((category) => {
                return (
                  <li key={category} id={category}>
                    {category}
                    <button onClick={(e)=>handleRemoveCategoryClick(e, category)}>remove</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button className="ui button submit-button">Submit</button>
      </form>
    </div>
  );
};

export default NewBudgetSheet;
