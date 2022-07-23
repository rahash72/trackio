import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import toast from "react-hot-toast";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Navbar = () => {
  const [loginData, setLoginData] = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    toast.success("Logged Out");
  };

  return (
    <>
      <ResponsiveAppBar handleLogout={handleLogout} />
    </>
  );
};

export default Navbar;
