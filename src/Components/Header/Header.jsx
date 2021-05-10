import React, {useState} from "react";
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CartButton, UserButton} from "../../UI-kit/Buttons";
import {UserMenu} from "../../UI-kit/Menus";

const Header = () => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar color="primary" position="fixed" className={styles.root}>
        <Toolbar className={styles.container}>
          <Link to="/">
            <img
              className={styles.logo}
              src={window.location.origin + "/logo.png"}
              alt="logo"
            />
          </Link>
          <Toolbar className={styles.navbar}>
            <Typography>
              <Link className={styles.link} to="/">
                Главная
              </Link>

              <Link className={styles.link} to="/shop">
                Магазин
              </Link>

              <Link className={styles.link} to="/about">
                О нас
              </Link>

              <Link className={styles.link} to="/ourLocation">
                Наши магазины
              </Link>

              <Link className={styles.link} to="/admin">
                Админ панель
              </Link>
            </Typography>
            <Toolbar>
              <div>
                <CartButton badgeContent={2}/>
              </div>

              <div>
                <UserButton className={styles.user} onClick={handleMenuOpen}/>
                <UserMenu anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                          logOut={() => {
                            console.log("logout!");
                          }}
                />
              </div>
            </Toolbar>
            {/*<div className="login-link-box">*/}
            {/*  <Typography>*/}
            {/*    <Link*/}
            {/*      className="login-link nav-list-item-link"*/}
            {/*      to="/authorization"*/}
            {/*    >*/}
            {/*      Войти*/}
            {/*    </Link>*/}
            {/*  </Typography>*/}
            {/*</div>*/}
          </Toolbar>
        </Toolbar>
      </AppBar>
    </>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    background: "#2c3e50"
  },
  logo: {
    height: "60px",
    padding: "0 24px 0 24px"
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px",
    margin: "5px"
  },
  navbar: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    padding: "10px",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#2c3e50",
      background: "#fff",
    }
  },
  user: {
    marginLeft: "10px"
  }
}));

export default Header;