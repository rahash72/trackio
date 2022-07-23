import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Adding from "./Adding";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Chart from "./Chart";
import MobileView from "./MobileView";

const ExpensesPage = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
        <Grid container>
          <Grid item md={6}>
            <Adding />
          </Grid>
          <Grid item md={6}>
            <Chart />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
        <Grid container>
          <Grid item xs={12}>
            <MobileView />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExpensesPage;
