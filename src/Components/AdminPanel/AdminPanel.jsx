import React from "react";
import {Grid, makeStyles} from "@material-ui/core";
import SideBar from "./SideBar/SideBar";
import {BrowserRouter as Route, Switch, useRouteMatch, Redirect} from "react-router-dom";
import AddUser from "./Users/AddUser";
import Users from "./Users/Users";
import Categories from "./Categories/Categories";
import AddCategory from "./Categories/AddCategory";
import Products from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import Orders from "./Orders/Orders";

const AdminPanel = () => {
  const {path, url} = useRouteMatch();
  const styles = useStyles();
  return (
    <>
      <Grid container spacing={3} className={styles.root}>
        <Grid item xs={3}>
          <SideBar url={url}/>
        </Grid>
        <Grid item xs={9}>
          <Switch>
            <Route exact path={path}>
              {<h3></h3>}
            </Route>

            <Route path={`${path}/addUser`}>
              <AddUser/>
            </Route>

            <Route path={`${path}/Users`}>
              <Users/>
            </Route>

            <Route path={`${path}/Categories`}>
              <Categories/>
            </Route>

            <Route path={`${path}/AddCategory`}>
              <AddCategory/>
            </Route>

            <Route path={`${path}/Products`}>
              <Products/>
            </Route>

            <Route path={`${path}/AddProduct`}>
              <AddProduct/>
            </Route>

            <Route path={`${path}/Orders`}>
              <Orders/>
            </Route>

            <Redirect to="/error"/>
          </Switch>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "12px 0 12px 0"
  },
}));

export default AdminPanel;