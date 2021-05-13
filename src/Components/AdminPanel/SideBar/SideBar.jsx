import React from "react";
import {Divider, List, ListItem, ListItemText, makeStyles, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CategoryIcon from "@material-ui/icons/Category";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import InboxIcon from "@material-ui/icons/Inbox";
import AddBoxIcon from "@material-ui/icons/AddBox";

const SideBar = ({url}) => {
  const styles = useStyles();
  return (
    <>
      <Paper elevation={3} className={styles.root}>
        <List>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/Users`}>
                  <GroupIcon className={styles.icon}/> Пользователи
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/addUser`}>
                  <PersonAddIcon className={styles.icon}/> Добавить пользователя
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider variant="fullWidth"/>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/Categories`}>
                  <CategoryIcon className={styles.icon}/> Категории
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/AddCategory`}>
                  <PlaylistAddIcon className={styles.icon}/> Добавить категорию
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <Divider variant="fullWidth"/>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/Products`}>
                  <InboxIcon className={styles.icon}/> Товары
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem className={styles.listItem}>
            <ListItemText>
              <Typography>
                <Link className={styles.link} to={`${url}/AddProduct`}>
                  <AddBoxIcon className={styles.icon}/> Добавить товар
                </Link>
              </Typography>
            </ListItemText>
          </ListItem>
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