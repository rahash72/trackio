import React, { useState } from "react";
import AllRecurringExpenses from "./AllRecurringExpenses";
import RecurringExpenseForm from "./RecurringExpenseForm";

const RecurringExpenses = () => {
  const [form, setForm] = useState(false);
  const handleForm = () => {
    setForm(!form);
  };

  return (
    <>
      {form && <RecurringExpenseForm handleForm={handleForm} />}
      {!form && <AllRecurringExpenses handleForm={handleForm} />}
    </>
  );
};

export default RecurringExpenses;
