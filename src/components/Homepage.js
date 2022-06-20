import { Link } from 'react-router-dom';

const Homepage = (props) => {
  return (
    <div className="container ">
      <div className="homepage">
        <h2>Welcome to the Budget App!</h2>
        <h3>Click on "New Budget Sheet" to get started!</h3>
        <div className="homepage-buttons">
          <div className="ui button">
            <Link to="new-budget-sheet">New Budget Sheet</Link>
          </div>
          <div className="ui button">
            <Link to="budget-sheets">All Budget Sheets</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
