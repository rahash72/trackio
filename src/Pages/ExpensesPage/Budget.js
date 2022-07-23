import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import toast from "react-hot-toast";

const Budget = () => {
  const [budget, setBudget] = useState({ totalExpense: null, budget: null });
  const [edit, setEdit] = useState(false);
  const authCtx = useContext(UserContext);
  const [budgetForm, setBudgetForm] = useState(budget.budget);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    marginTop: 20,
    height: 30,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor:
        (budget.totalExpense / budget.budget) * 100 < 50
          ? "#B4E197"
          : (budget.totalExpense / budget.budget) * 100 < 80
          ? "#F7EC09"
          : (budget.totalExpense / budget.budget) * 100 < 100
          ? "#FF8D29"
          : "#EB1D36",
    },
  }));

  useEffect(() => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/budget/" +
        authCtx[0].email
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBudget(data);
        setBudgetForm(data.budget);
      });
  }, []);

  const handleBudget = () => {
    setEdit(false);
    if (budget.budget != budgetForm) {
      setBudget({ budget: budgetForm, totalExpense: budget.totalExpense });
      fetch("https://trackio-backend.herokuapp.com/expenses/addBudget/", {
        method: "POST",
        body: JSON.stringify({
          email: authCtx[0].email,
          budget: budgetForm,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.success(data.message);
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          maxHeight: "68vh",
          width: "100%",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {!edit && (
          <Button
            onClick={() => {
              setEdit(true);
            }}
            sx={{ backgroundColor: "#4E944F" }}
            fullWidth
            variant="contained"
            color="success"
          >
            Edit Budget
          </Button>
        )}
        {edit && (
          <>
            <Button
              onClick={handleBudget}
              sx={{ color: "#4E944F", marginBottom: "30px" }}
              fullWidth
              variant="outlined"
              color="success"
            >
              Save
            </Button>
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                type="number"
                required
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                value={budgetForm}
                onChange={(event) => {
                  setBudgetForm(event.target.value);
                }}
                label="Amount"
              />
            </FormControl>
          </>
        )}
        {!budget.budget && (
          <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
            Add Monthly Budget!
          </Typography>
        )}
        {budget.budget && (
          <Typography sx={{ textAlign: "center", marginTop: "30px" }}>
            Your Monthly Budget: ${budget.budget}
          </Typography>
        )}
        <Typography
          sx={{ fontSize: "20px", textAlign: "center", marginTop: "30px" }}
        >
          Your Total Expense This Month: ${budget.totalExpense}
        </Typography>
        {budget.budget && (
          <BorderLinearProgress
            variant="determinate"
            value={
              (budget.totalExpense / budget.budget) * 100 < 100
                ? (budget.totalExpense / budget.budget) * 100
                : 100
            }
          />
        )}
        {budget.budget && (
          <Typography
            sx={{ fontSize: "20px", textAlign: "center", marginTop: "30px" }}
          >
            You Have Spent{" "}
            {Math.round((budget.totalExpense / budget.budget) * 100)}% of your
            Budget
          </Typography>
        )}
        {budget.budget && (budget.totalExpense / budget.budget) * 100 < 50 && (
          <>
            <Typography
              sx={{
                fontFamily: "Fascinate",
                color: "#B4E197",
                fontSize: "40px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Keep It Up
            </Typography>
            <TagFacesOutlinedIcon
              sx={{
                color: "#B4E197",
                textAlign: "center",
                fontSize: "150px",
                width: "100%",
                marginTop: "30px",
              }}
            />
          </>
        )}
        {budget.budget &&
          (budget.totalExpense / budget.budget) * 100 < 80 &&
          (budget.totalExpense / budget.budget) * 100 >= 50 && (
            <>
              <Typography
                sx={{
                  fontFamily: "Fascinate",
                  color: "#F9D923",
                  fontSize: "40px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                Warning!
              </Typography>
              <WarningAmberIcon
                sx={{
                  color: "#F9D923",
                  textAlign: "center",
                  fontSize: "150px",
                  width: "100%",
                  marginTop: "30px",
                }}
              />
            </>
          )}
        {budget.budget &&
          (budget.totalExpense / budget.budget) * 100 >= 80 &&
          (budget.totalExpense / budget.budget) * 100 <= 100 && (
            <>
              <Typography
                sx={{
                  fontFamily: "Fascinate",
                  color: "#FF8D29",
                  fontSize: "40px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                Start Saving!
              </Typography>
              <MoneyOffIcon
                sx={{
                  color: "#FF8D29",
                  textAlign: "center",
                  fontSize: "150px",
                  width: "100%",
                  marginTop: "30px",
                }}
              />
            </>
          )}
        {budget.budget && (budget.totalExpense / budget.budget) * 100 > 100 && (
          <>
            <Typography
              sx={{
                fontFamily: "Fascinate",
                color: "#EB1D36",
                fontSize: "40px",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Over Budget
            </Typography>
            <SentimentVeryDissatisfiedIcon
              sx={{
                color: "#EB1D36",
                textAlign: "center",
                fontSize: "150px",
                width: "100%",
                marginTop: "30px",
              }}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default Budget;
