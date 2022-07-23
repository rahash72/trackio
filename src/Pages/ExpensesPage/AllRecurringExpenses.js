import React, { useContext, useEffect, useState } from "react";
import { Box, Button, ListItemButton, Typography } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FastfoodTwoToneIcon from "@mui/icons-material/FastfoodTwoTone";
import DevicesTwoToneIcon from "@mui/icons-material/DevicesTwoTone";
import CheckroomTwoToneIcon from "@mui/icons-material/CheckroomTwoTone";
import HouseTwoToneIcon from "@mui/icons-material/HouseTwoTone";
import SportsFootballTwoToneIcon from "@mui/icons-material/SportsFootballTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import AttachMoneyTwoToneIcon from "@mui/icons-material/AttachMoneyTwoTone";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#4E944F",
    "&:hover": {
      backgroundColor: alpha("#4E944F", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#4E944F",
  },
}));

const AllExpenses = ({ handleForm }) => {
  const [recurExpenses, setRecurExpenses] = useState([]);
  const authCtx = useContext(UserContext);

  useEffect(() => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/recurAll/" +
        authCtx[0].email
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecurExpenses(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/recurdelete/" +
        id +
        "/" +
        authCtx[0].email,
      { method: "DELETE" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRecurExpenses(data);
      });
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handleForm}
          sx={{ color: "#4E944F" }}
          fullWidth
          variant="outlined"
          color="success"
        >
          Add Recurring Expense
        </Button>
        {recurExpenses.length === 0 && (
          <Typography
            sx={{ textAlign: "center", marginTop: "30px", fontSize: "20px" }}
          >
            No Recurring Expenses
          </Typography>
        )}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: "20px",
            maxHeight: "68vh",
          }}
        >
          {recurExpenses.length !== 0 && (
            <List
              dense
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
              }}
            >
              {recurExpenses.map((expense) => {
                var date = "";
                if (expense.repeat === "Daily") {
                  date =
                    new Date(expense.startDate).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }) +
                    " to " +
                    new Date(expense.endDate).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                } else if (expense.repeat === "Monthly") {
                  date =
                    new Date(expense.startDate).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                    }) +
                    " to " +
                    new Date(expense.endDate).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                    });
                } else {
                  date =
                    new Date(expense.startDate).getFullYear() +
                    " to " +
                    new Date(expense.endDate).getFullYear();
                }
                return (
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton
                          onClick={() => handleDelete(expense._id)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      {expense.category === "Food" && <FastfoodTwoToneIcon />}
                      {expense.category === "Device" && <DevicesTwoToneIcon />}
                      {expense.category === "Clothing" && (
                        <CheckroomTwoToneIcon />
                      )}
                      {expense.category === "Household" && <HouseTwoToneIcon />}
                      {expense.category === "Education" && (
                        <SchoolTwoToneIcon />
                      )}
                      {expense.category === "Sports" && (
                        <SportsFootballTwoToneIcon />
                      )}
                      {expense.category === "Other" && (
                        <AttachMoneyTwoToneIcon />
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={"$" + expense.amount + " - " + expense.note}
                      secondary={expense.repeat + " - " + date}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllExpenses;
