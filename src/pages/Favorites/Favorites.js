import { Container, CssBaseline, Typography } from "@material-ui/core";
import UserGrid from "components/UserGrid";
import React, { useEffect, useState } from "react";
import useStyles from "./style";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.favorites) {
      setFavorites(JSON.parse(localStorage.favorites));
    }
  }, []);
  console.log(favorites);

  const handleFavoriteClicked = (user) => {
    let cloneFavorites = [...favorites];
    cloneFavorites.splice(cloneFavorites.indexOf(user), 1);
    setFavorites(cloneFavorites);
    localStorage.favorites = JSON.stringify(cloneFavorites);
  };

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Typography variant="h1" align="center" className={classes.header}>
        Favorite People
      </Typography>
      {favorites.length ? (
        <UserGrid users={favorites} handleFavoriteClicked={handleFavoriteClicked} />
      ) : (
        <Typography align="center" variant="h4" color="textSecondary">
          Please favorite people at the home page to see them here
        </Typography>
      )}
    </Container>
  );
};

export default Favorites;
