import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { filtersContext } from "filtersContext";

const AppRouter = () => {
  const [filters, setFilters] = useState({});

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <filtersContext.Provider value={{ filters, setFilters }}>
            <Route exact path="/" component={Home} />
          </filtersContext.Provider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
