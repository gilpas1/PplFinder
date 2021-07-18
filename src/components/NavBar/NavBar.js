import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useLocation } from "react-router-dom";
import { navBarContext } from "hooks";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const location = useLocation().pathname;

  useEffect(() => {
    switch (location) {
      case "/":
        setValue(0);
        break;
      case "/favorites":
        setValue(1);
        break;
      default:
        setValue(0);
    }
  }, []);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} component={Link} to="/" />
        <Tab label="Favorites" index={1} component={Link} to="favorites" />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
