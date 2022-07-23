import React, { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserContext } from "../../Contexts/UserContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { LineChart, Line } from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";

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

const Chart = () => {
  const [data, setData] = useState([]);
  const authCtx = useContext(UserContext);
  const [year, setYear] = useState(new Date());

  useEffect(() => {
    fetch(
      "https://trackio-backend.herokuapp.com/todo/yearChart/" +
        authCtx[0].email +
        "/" +
        year
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        var temp = [];
        temp.push({
          name: "Jan",
          Total: data.totalTasks.Jan,
          Completed: data.completedTasks.Jan,
        });
        temp.push({
          name: "Feb",
          Total: data.totalTasks.Feb,
          Completed: data.completedTasks.Feb,
        });
        temp.push({
          name: "Mar",
          Total: data.totalTasks.Mar,
          Completed: data.completedTasks.Mar,
        });
        temp.push({
          name: "Apr",
          Total: data.totalTasks.Apr,
          Completed: data.completedTasks.Apr,
        });
        temp.push({
          name: "May",
          Total: data.totalTasks.May,
          Completed: data.completedTasks.May,
        });
        temp.push({
          name: "Jun",
          Total: data.totalTasks.Jun,
          Completed: data.completedTasks.Jun,
        });
        temp.push({
          name: "Jul",
          Total: data.totalTasks.Jul,
          Completed: data.completedTasks.Jul,
        });
        temp.push({
          name: "Aug",
          Total: data.totalTasks.Aug,
          Completed: data.completedTasks.Aug,
        });
        temp.push({
          name: "Sep",
          Total: data.totalTasks.Sep,
          Completed: data.completedTasks.Sep,
        });
        temp.push({
          name: "Oct",
          Total: data.totalTasks.Oct,
          Completed: data.completedTasks.Oct,
        });
        temp.push({
          name: "Nov",
          Total: data.totalTasks.Nov,
          Completed: data.completedTasks.Nov,
        });
        temp.push({
          name: "Dec",
          Total: data.totalTasks.Dec,
          Completed: data.completedTasks.Dec,
        });

        setData(temp);
      });
  }, [year]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "60vh",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          openTo="year"
          views={["year"]}
          label="Year"
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} marginTop="20px" helperText={null} />
          )}
        />
      </LocalizationProvider>
      <BarChart
        style={{ marginTop: "50px" }}
        width={510}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#82ca9d" />
        <Bar dataKey="Completed" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart;
