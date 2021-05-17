import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import SideBar from "./SideBar/SideBar";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import AllBooks from "./AllBooks/AllBooks";
import BooksByCategory from "./BooksByCategory/BooksByCategory";

const Shop = () => {
  const {path, url} = useRouteMatch();
  const styles = useStyles();

  return (
    <Grid container spacing={3} className={styles.root}>
      <Grid item xs={3}>
        <SideBar url={url}/>
      </Grid>
      <Grid item xs={9}>
        <Switch>
          <Route exact path={path}>
            <AllBooks/>
          </Route>
          <Route path="/shop/:categoryId">
            <BooksByCategory/>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "12px 0 12px 0"
  },
}));

export default Shop;