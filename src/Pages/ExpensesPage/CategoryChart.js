import React, { useState, useEffect, useContext } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { UserContext } from "../../Contexts/UserContext";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const CategoryChart = () => {
  const [data, setData] = useState([]);
  const authCtx = useContext(UserContext);
  const [state, setState] = useState({
    activeIndex: 0,
  });
  const [startDate, setStartDate] = useState(new Date(0));
  const [endDate, setEndDate] = useState(new Date());

  const onPieEnter = (_, index) => {
    setState({
      activeIndex: index,
    });
  };

  useEffect(() => {
    fetch("https://trackio-backend.herokuapp.com/expenses/categoryChart/", {
      method: "POST",
      body: JSON.stringify({
        email: authCtx[0].email,
        startDate: startDate,
        endDate: endDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        var temp = [];
        temp.push({ name: "Food", value: data.Food });
        temp.push({ name: "Device", value: data.Device });
        temp.push({ name: "Clothing", value: data.Clothing });
        temp.push({ name: "Education", value: data.Education });
        temp.push({ name: "Household", value: data.Household });
        temp.push({ name: "Sports", value: data.Sports });
        temp.push({ name: "Other", value: data.Other });
        setData(temp);
      });
  }, [startDate, endDate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          label="Start Date"
          value={startDate}
          onChange={(newValue) => {
            setStartDate(newValue);
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          openTo="year"
          views={["year", "month", "day"]}
          label="End Date"
          value={endDate}
          onChange={(newValue) => {
            setEndDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ marginTop: "20px" }}
              fullWidth
              helperText={null}
            />
          )}
        />
      </LocalizationProvider>
      <PieChart width={500} height={400}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#82ca9d"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
    </div>
  );
};

export default CategoryChart;
