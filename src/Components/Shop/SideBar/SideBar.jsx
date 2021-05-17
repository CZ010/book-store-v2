import React, {useEffect, useState} from "react";
import {Divider, List, ListItem, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import * as Firestore from "../../../Services/Firestore/Firestore";

const SideBar = ({url}) => {
  const styles = useStyles();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Firestore.getCategoriesCollection().then(collection => {
      setCategories(collection);
    }).catch(error => {
      console.error(error);
    });
  }, []);
  return (
    <>
      <Paper elevation={3} className={styles.root}>
        <List>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link to={url} className={styles.link}><TurnedInIcon/>Все книги</Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider variant="middle"/>
          {
            categories.map(category => (
              <ListItem className={styles.listItem} key={category.id}>
                <ListItemText>
                  <Typography>
                    <Link to={`${url}/${category.id}`} className={styles.link}><TurnedInIcon/> {category.title}</Link>
                  </Typography>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "sticky",
    top: "108px"
  },
  link: {
    color: "#2c3e50",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    "&:hover": {
      background: "#4791db",
      color: "#fff"
    }
  },
  icon: {
    marginRight: "10px"
  },
  listItem: {
    margin: "0",
    padding: "0 10px"
  }
}));

export default SideBar;