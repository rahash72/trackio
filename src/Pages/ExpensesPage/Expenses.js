import React, { useState } from "react";
import AllExpenses from "./AllExpenses";
import ExpenseForm from "./ExpenseForm";

const Expenses = () => {
  const [form, setForm] = useState(false);
  const handleForm = () => {
    setForm(!form);
  };
  return (
    <>
      {form && <ExpenseForm handleForm={handleForm} />}
      {!form && <AllExpenses handleForm={handleForm} />}
    </>
  );
};

export default Expenses;
