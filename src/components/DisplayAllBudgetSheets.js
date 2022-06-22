import { Route, Routes, Outlet } from 'react-router-dom';
import ListAllBudgetSheets from './ListAllBudgetSheets';

const DisplayAllBudgetSheets = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ListAllBudgetSheets />} />
      </Routes>
      <Outlet />
    </>
  );
};

export default DisplayAllBudgetSheets;
