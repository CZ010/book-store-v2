import React from "react";
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import {Box, Container, CssBaseline} from "@material-ui/core";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import About from "./Components/About/About";
import OurLocation from "./Components/OurLocation/OurLocation";
import Authorization from "./Components/Authorization/Authorization";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Checkout from "./Components/Checkout/Checkout";
import NoMatch from "./Components/NoMatch/NoMatch";

function App() {
  return (
    <Router>
      <CssBaseline/>
      <Header/>
      <Container maxWidth='false'>
        <Box mt={12}>
          <Switch>
            <Route path='/' exact>
              <Home/>
            </Route>
            <Route path='/shop'>
              <Shop/>
            </Route>
            <Route path='/about'>
              <About/>
            </Route>
            <Route path='/ourLocation'>
              <OurLocation/>
            </Route>
            <Route path='/authorization'>
              <Authorization/>
            </Route>
            <Route path='/admin'>
              <AdminPanel/>
            </Route>
            <Route path='/checkout'>
              <Checkout/>
            </Route>
            <Route path='*'>
              <NoMatch/>
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default App;
