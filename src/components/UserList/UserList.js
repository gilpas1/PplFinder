import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading, fetchUsers, setFilters }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.favorites) {
      setFavorites(JSON.parse(localStorage.favorites));
    }
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckboxChange = (eventValue) => {
    setFilters((prevFilters) => {
      prevFilters[eventValue] = !prevFilters[eventValue];
      return prevFilters;
    });
    fetchUsers();
  };

  const handleFavoriteClicked = (user) => {
    setFavorites((prevFavorites) => {
      let newFavorites = prevFavorites;
      if (prevFavorites.includes(user)) {
        newFavorites.splice(prevFavorites.indexOf(user), 1);
      } else {
        newFavorites = [...prevFavorites, user];
      }
      localStorage.favorites = JSON.stringify(newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (user) => {
    if (favorites) return favorites.includes(user);
    return false;
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleCheckboxChange} />
        <CheckBox value="AU" label="Australia" onChange={handleCheckboxChange} />
        <CheckBox value="CA" label="Canada" onChange={handleCheckboxChange} />
        <CheckBox value="DE" label="Germany" onChange={handleCheckboxChange} />
        <CheckBox value="CH" label="Switzerland" onChange={handleCheckboxChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || isFavorite(user)}
                onClick={() => handleFavoriteClicked(user)}
              >
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
