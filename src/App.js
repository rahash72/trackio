import LoginPage from "./Pages/LoginPage/LoginPage";
import { Toaster } from "react-hot-toast";
import { UserProvider, UserContext } from "./Contexts/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExpensesPage from "./Pages/ExpensesPage/ExpensesPage";
import React, { useContext } from "react";
import TodoPage from "./Pages/TodoPage/TodoPage";

const App = () => {
  const [loginData, setLoginData] = useContext(UserContext);

  return (
    <Router>
      <Routes>
        {!loginData && <Route path="/" element={<LoginPage />} />}
        {loginData && (
          <>
            <Route path="/" element={<Navigate to={"/expenses"} />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/to-do" element={<TodoPage />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={loginData ? "/expenses" : "/"} />}
        />
      </Routes>

      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
