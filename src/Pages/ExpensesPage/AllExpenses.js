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
  const [expenses, setExpenses] = useState([]);
  const [bookmark, setBookmark] = useState(false);
  const authCtx = useContext(UserContext);
  const [withRecur, setWithRecur] = useState(false);

  useEffect(() => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/all/" + authCtx[0].email
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/delete/" +
        id +
        "/" +
        authCtx[0].email,
      { method: "DELETE" }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
      });
  };

  const handleBookmark = (id) => {
    fetch(
      "https://trackio-backend.herokuapp.com/expenses/bookmark/" +
        id +
        "/" +
        authCtx[0].email
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setExpenses(data);
      });
  };

  const handleSwitch = (event) => {
    setBookmark(event.target.checked);
  };

  const handleWithRecur = (event) => {
    setWithRecur(event.target.checked);
    if (!event.target.checked) {
      fetch(
        "https://trackio-backend.herokuapp.com/expenses/all/" + authCtx[0].email
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setExpenses(data);
        });
    } else {
      fetch(
        "https://trackio-backend.herokuapp.com/expenses/allWithRecur/" +
          authCtx[0].email
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setExpenses(data);
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
        <Button
          onClick={handleForm}
          sx={{ color: "#4E944F" }}
          fullWidth
          variant="outlined"
          color="success"
        >
          Add Expense
        </Button>
        {expenses.length === 0 && (
          <Typography
            sx={{ textAlign: "center", marginTop: "30px", fontSize: "20px" }}
          >
            No Expenses
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
          {expenses.length !== 0 && (
            <List
              dense
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        sx={{ marginLeft: "20px" }}
                        checked={bookmark}
                        onChange={handleSwitch}
                      />
                    }
                    label="Bookmark"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        sx={{ marginLeft: "20px" }}
                        checked={withRecur}
                        onChange={handleWithRecur}
                      />
                    }
                    label="Recurring Expenses"
                  />
                </FormGroup>
              </div>

              {expenses.map((expense) => {
                if ((bookmark && expense.bookmark) || !bookmark) {
                  return (
                    <ListItem
                      secondaryAction={
                        <>
                          <IconButton
                            onClick={() => {
                              expense.bookmark = !expense.bookmark;
                              handleBookmark(expense._id);
                            }}
                            edge="end"
                            aria-label="delete"
                          >
                            {expense.bookmark && <BookmarkIcon />}
                            {!expense.bookmark && (
                              <BookmarkBorderOutlinedIcon />
                            )}
                          </IconButton>
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
                        {expense.category === "Device" && (
                          <DevicesTwoToneIcon />
                        )}
                        {expense.category === "Clothing" && (
                          <CheckroomTwoToneIcon />
                        )}
                        {expense.category === "Household" && (
                          <HouseTwoToneIcon />
                        )}
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
                        secondary={new Date(expense.date).toLocaleDateString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      />
                    </ListItem>
                  );
                }
              })}
            </List>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllExpenses;
