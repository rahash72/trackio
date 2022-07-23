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

const YearChart = () => {
  const [data, setData] = useState([]);
  const authCtx = useContext(UserContext);
  const [cumulative, setCumulative] = useState(false);
  const [year, setYear] = useState(new Date());

  useEffect(() => {
    if (cumulative) {
      fetch(
        "https://trackio-backend.herokuapp.com/expenses/yearChart/" +
          authCtx[0].email +
          "/" +
          year
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          var temp = [];
          var cumu = 0;
          temp.push({
            name: "Jan",
            Amount: data.Jan,
            Cumulative: (cumu += data.Jan),
          });
          temp.push({
            name: "Feb",
            Amount: data.Feb,
            Cumulative: (cumu += data.Feb),
          });
          temp.push({
            name: "Mar",
            Amount: data.Mar,
            Cumulative: (cumu += data.Mar),
          });
          temp.push({
            name: "Apr",
            Amount: data.Apr,
            Cumulative: (cumu += data.Apr),
          });
          temp.push({
            name: "May",
            Amount: data.May,
            Cumulative: (cumu += data.May),
          });
          temp.push({
            name: "Jun",
            Amount: data.Jun,
            Cumulative: (cumu += data.Jun),
          });
          temp.push({
            name: "Jul",
            Amount: data.Jul,
            Cumulative: (cumu += data.Jul),
          });
          temp.push({
            name: "Aug",
            Amount: data.Aug,
            Cumulative: (cumu += data.Aug),
          });
          temp.push({
            name: "Sep",
            Amount: data.Sep,
            Cumulative: (cumu += data.Sep),
          });
          temp.push({
            name: "Oct",
            Amount: data.Oct,
            Cumulative: (cumu += data.Oct),
          });
          temp.push({
            name: "Nov",
            Amount: data.Nov,
            Cumulative: (cumu += data.Nov),
          });
          temp.push({
            name: "Dec",
            Amount: data.Dec,
            Cumulative: (cumu += data.Dec),
          });

          setData(temp);
        });
    } else {
      fetch(
        "https://trackio-backend.herokuapp.com/expenses/yearChart/" +
          authCtx[0].email +
          "/" +
          year
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          var temp = [];
          temp.push({ name: "Jan", Amount: data.Jan });
          temp.push({ name: "Feb", Amount: data.Feb });
          temp.push({ name: "Mar", Amount: data.Mar });
          temp.push({ name: "Apr", Amount: data.Apr });
          temp.push({ name: "May", Amount: data.May });
          temp.push({ name: "Jun", Amount: data.Jun });
          temp.push({ name: "Jul", Amount: data.Jul });
          temp.push({ name: "Aug", Amount: data.Aug });
          temp.push({ name: "Sep", Amount: data.Sep });
          temp.push({ name: "Oct", Amount: data.Oct });
          temp.push({ name: "Nov", Amount: data.Nov });
          temp.push({ name: "Dec", Amount: data.Dec });

          setData(temp);
        });
    }
  }, [year, cumulative]);

  const handleCumulative = (event) => {
    setCumulative(event.target.checked);
  };

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
            <TextField
              {...params}
              marginTop="20px"
              fullWidth
              helperText={null}
            />
          )}
        />
      </LocalizationProvider>
      <FormGroup>
        <FormControlLabel
          sx={{ marginBottom: "20px", marginTop: "20px" }}
          control={
            <GreenSwitch
              sx={{ marginLeft: "20px" }}
              checked={cumulative}
              onChange={handleCumulative}
            />
          }
          label="Cumulative"
        />
      </FormGroup>
      {!cumulative && (
        <BarChart
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
          <Bar dataKey="Amount" fill="#82ca9d" />
        </BarChart>
      )}
      {cumulative && (
        <LineChart
          width={500}
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
          <Line
            type="monotone"
            dataKey="Cumulative"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Amount" stroke="#82ca9d" />
        </LineChart>
      )}
    </div>
  );
};

export default YearChart;
