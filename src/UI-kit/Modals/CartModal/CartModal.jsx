import {
  List,
  ListItem,
  Modal,
  Paper,
  Typography,
  Button,
  IconButton, makeStyles,
} from "@material-ui/core";
import React, {useContext} from "react";
import {DataContext} from "../../../Context/DataContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import {useHistory} from "react-router";

const CartModal = ({open, onClose}) => {
  const styles = useStyles();
  const {ShoppingCart, RemoveFromCart} = useContext(DataContext);
  const [cart] = ShoppingCart;
  const [removeFromCart] = RemoveFromCart;

  const history = useHistory();

  const redirectToCheckout = () => {
    history.push("/checkout");
    onClose();
  };

  const handleRemoveFromCartClick = (bookID) => {
    removeFromCart(bookID);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className={styles.root}>
          <Paper className={styles.header}>
            <ShoppingCartIcon fontSize="default"/>
            {cart.books.length === 0 ? (
              <Typography variant="h5">Корзина пуста</Typography>
            ) : (
              <Typography variant="h5">Корзина</Typography>
            )}
            <IconButton onClick={onClose}>
              <CloseIcon
                className="cartmodal-close-btn"
                fontSize="default"
                color="secondary"
              />
            </IconButton>
          </Paper>
          <List className={styles.list}>
            {cart.books.map((book) => {
              return (
                <ListItem key={book.id} className={styles.listItem}>
                  <Paper className={styles.listItemBox}>
                    <div className={styles.listItemImg}>
                      <img
                        style={{width: "60px"}}
                        src={book.image}
                        alt={book.title}
                      />
                    </div>
                    <div className={styles.listItemInfo}>
                      <div>
                        <Typography
                          style={{maxWidth: "200px", fontSize: "16px"}}
                          variant="h6"
                          noWrap
                        >
                          {book.title}
                        </Typography>
                      </div>
                      <div>{book.author}</div>
                      <div>
                        <Typography variant="subtitle2">
                          {book.price} сом
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <IconButton onClick={() => {
                        handleRemoveFromCartClick(book.id);
                      }}>
                        <DeleteIcon/>
                      </IconButton>
                    </div>
                  </Paper>
                </ListItem>
              );
            })}
          </List>
          {cart.books.length === 0 ? null : (
            <Paper className="cartmodal-footer">
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                onClick={redirectToCheckout}
              >
                оформить заказ
              </Button>
            </Paper>
          )}
        </div>
      </>
    </Modal>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fafafa",
    padding: "10px",
    borderRadius: "5px",
  },
  list: {
    width: "400px",
    maxHeight: "450px",
    overflow: "auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 3px 5px 10px",
    marginBottom: "5px"
  },
  listItem: {
    padding: "8px 8px 8px 0px"
  },
  listItemBox: {
    display: "flex",
    width: "100%",
    padding: "5px 10px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listItemInfo: {
    width: "100%",
  },
  listItemImg: {
    marginRight: "10px"
  }
}));

export default CartModal;