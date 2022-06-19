import { Link } from 'react-router-dom';

const Homepage = (props) => {
  return (
    <>
      <p>Welcome to the homepage</p>
      <ul>
        <li>
          <Link to="new-budget-sheet">New Budget Sheet</Link>
        </li>
        <li>
          <Link to="budget-sheets">All Budget Sheet</Link>
        </li>
      </ul>
    </>
  );
};

export default Homepage;
