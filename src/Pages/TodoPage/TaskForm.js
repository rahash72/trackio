import React, { useContext, useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { UserContext } from "../../Contexts/UserContext";
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const TaskForm = () => {
  const authCtx = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title) {
      toast.error("Fill All Data");
    } else {
      fetch("https://trackio-backend.herokuapp.com/todo/new/", {
        method: "POST",
        body: JSON.stringify({
          email: authCtx[0].email,
          dueDate: date,
          title: title,
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

      setTitle("");
      setDate(new Date());
    }
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", marginTop: "20px" }}>
        <Stack spacing={5}>
          <TextField
            required
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              openTo="year"
              views={["year", "month", "day"]}
              label="Due Date"
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

export default TaskForm;
