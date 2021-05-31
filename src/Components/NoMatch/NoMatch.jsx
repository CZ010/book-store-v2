import React from "react";
import {Divider, Grid, makeStyles, Typography} from "@material-ui/core";

const NoMatch = () => {
  const styles = useStyles();
  return (
    <Grid container alignItems="center" justify="center" className={styles.root}>
      <div className={styles.container}>
        <Typography variant={"h2"}>404</Typography>
        <Divider orientation="vertical" flexItem/>
        <Typography variant={"h4"}>Страница не найдена</Typography>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "calc(100vh - 150px)"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-10px",
    "&>*": {
      margin: "10px",
      color: "rgba(0, 0, 0, 0.38)"
    }
  }
}));

export default NoMatch;