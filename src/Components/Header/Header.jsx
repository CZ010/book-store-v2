import React, {useContext, useState} from "react";
import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CartButton, UserButton} from "../../UI-kit/Buttons";
import {UserMenu} from "../../UI-kit/Menus";
import {DataContext} from "../../Context/DataContext";

const Header = () => {
  const styles = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {AuthedUser, Logout} = useContext(DataContext);
  const [user] = AuthedUser;
  const [logout] = Logout;

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
              <Link className={styles.navLink} to="/">
                Главная
              </Link>

              <Link className={styles.navLink} to="/shop">
                Магазин
              </Link>

              <Link className={styles.navLink} to="/about">
                О нас
              </Link>

              <Link className={styles.navLink} to="/ourLocation">
                Наши магазины
              </Link>

              <Link className={styles.navLink} to="/admin">
                Админ панель
              </Link>
            </Typography>
            {
              user ? (
                <Toolbar>
                  <div>
                    <CartButton className={styles.cart} badgeContent={2}/>
                  </div>

                  <div>
                    <UserButton className={styles.user} onClick={handleMenuOpen}/>
                    <UserMenu anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                              logOut={() => {
                                logout();
                              }}
                    />
                  </div>
                </Toolbar>
              ) : (
                <Toolbar>
                  <Typography>
                    <Link
                      className={styles.link}
                      to="/authorization"
                    >
                      Войти
                    </Link>
                  </Typography>
                  <Typography>
                    <Link
                      className={styles.link}
                      to="/registration"
                    >
                      Регистрация
                    </Link>
                  </Typography>
                </Toolbar>
              )
            }
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
  navLink: {
    color: "#fff",
    marginLeft: "15px",
    padding: "10px",
    borderRadius: "5px",
    "&:hover": {
      background: "#4791db",
    }
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    padding: "10px",
    borderRadius: "5px",
    "&:hover": {
      background: "#4caf50",
    }
  },
  user: {
    marginLeft: "10px",
    "&:hover": {
      color: "#4791db",
    }
  },
  cart: {
    "&:hover": {
      color: "#4791db",
    }
  }
}));

export default Header;