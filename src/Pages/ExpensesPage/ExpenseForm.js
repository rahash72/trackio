import React, { useContext, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { UserContext } from "../../Contexts/UserContext";
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Food",
  "Device",
  "Clothing",
  "Education",
  "Household",
  "Sports",
  "Other",
];

const ExpenseForm = ({ handleForm }) => {
  const authCtx = useContext(UserContext);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState();

  const handleSubmit = () => {
    if (!note || !amount || !category) {
      toast.error("Fill All Data");
    } else {
      fetch("https://trackio-backend.herokuapp.com/expenses/new/", {
        method: "POST",
        body: JSON.stringify({
          email: authCtx[0].email,
          category: category,
          date: date,
          note: note,
          amount: amount,
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

      setCategory("");
      setDate(new Date());
      setNote("");
      setAmount(0);
    }
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <Stack spacing={5}>
          <Button
            onClick={handleForm}
            sx={{ color: "#4E944F" }}
            variant="outlined"
            color="success"
          >
            View All Expenses
          </Button>
          <TextField
            required
            id="outlined-basic"
            label="Note"
            variant="outlined"
            value={note}
            onChange={(event) => {
              setNote(event.target.value);
            }}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              type="number"
              required
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
              label="Amount"
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => {
                setCategory(event.target.value);
              }}
              value={category}
              label="Category"
              MenuProps={MenuProps}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              openTo="year"
              views={["year", "month", "day"]}
              label="Date"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
          <Button
            sx={{ backgroundColor: "#4E944F" }}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ExpenseForm;
