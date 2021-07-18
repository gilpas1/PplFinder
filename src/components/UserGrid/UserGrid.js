import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import Text from "components/Text";

const UserGrid = ({ users, handleFavoriteClicked }) => {
  return (
    <Grid container alignContent="center" spacing={4}>
      {users.map((user, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <S.User>
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
              isVisible={true}
              onClick={() => handleFavoriteClicked(user)}
            >
              <IconButton>
                <FavoriteIcon color="error" />
              </IconButton>
            </S.IconButtonWrapper>
          </S.User>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserGrid;
