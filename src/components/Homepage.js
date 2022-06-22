import { Link } from 'react-router-dom';

const Homepage = (props) => {
  return (
    <div className="container ">
      <div className="homepage">
        <h2>Welcome to the Budget App!</h2>
        <h3>Click on "New Budget Sheet" to get started!</h3>
        <div className="homepage-buttons">
          <Link to="new-budget-sheet" className="button">
            New Budget Sheet
          </Link>

          <Link to="budget-sheets" className="button">
            All Budget Sheets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
