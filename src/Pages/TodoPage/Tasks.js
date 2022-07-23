import React, { useContext, useEffect, useState } from "react";
import { Box, Button, ListItemButton, Typography } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import CheckBoxOutlineBlankTwoToneIcon from "@mui/icons-material/CheckBoxOutlineBlankTwoTone";
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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [today, setToday] = useState(false);
  const authCtx = useContext(UserContext);

  useEffect(() => {
    fetch("https://trackio-backend.herokuapp.com/todo/all/" + authCtx[0].email)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(
      "https://trackio-backend.herokuapp.com/todo/delete/" +
        id +
        "/" +
        authCtx[0].email,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      });
  };

  const handleCompleted = (id) => {
    fetch(
      "https://trackio-backend.herokuapp.com/todo/complete/" +
        id +
        "/" +
        authCtx[0].email
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      });
  };

  const handleSwitch = (event) => {
    setCompleted(event.target.checked);
  };

  const handleToday = (event) => {
    setToday(event.target.checked);
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
        {tasks.length === 0 && (
          <Typography
            sx={{ textAlign: "center", marginTop: "30px", fontSize: "20px" }}
          >
            No Tasks
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
          {tasks.length !== 0 && (
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
                        checked={completed}
                        onChange={handleSwitch}
                      />
                    }
                    label="Completed"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <GreenSwitch
                        sx={{ marginLeft: "20px" }}
                        checked={today}
                        onChange={handleToday}
                      />
                    }
                    label="Today"
                  />
                </FormGroup>
              </div>

              {tasks.map((task) => {
                if ((completed && task.completed) || !completed) {
                  if (
                    (today &&
                      new Date(task.dueDate).toDateString() ===
                        new Date().toDateString()) ||
                    !today
                  )
                    return (
                      <ListItem
                        secondaryAction={
                          <>
                            <IconButton
                              onClick={() => handleDelete(task._id)}
                              edge="end"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <IconButton onClick={() => handleCompleted(task._id)}>
                            {task.completed && <CheckBoxTwoToneIcon />}
                            {!task.completed && (
                              <CheckBoxOutlineBlankTwoToneIcon />
                            )}
                          </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                          primary={task.title}
                          secondary={new Date(task.dueDate).toLocaleDateString(
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

export default Tasks;
