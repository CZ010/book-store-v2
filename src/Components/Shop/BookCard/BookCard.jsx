import React, {useContext} from "react";
import {Button, Divider, makeStyles, Paper, Typography} from "@material-ui/core";
import {DataContext} from "../../../Context/DataContext";
import {useNotifications} from "../../../Hooks";


const BookCard = (book) => {
  const styles = useStyles();
  const {AuthedUser, AddToCart, ShoppingCart, RemoveFromCart,} = useContext(DataContext);
  const [user] = AuthedUser;
  const [addToCart] = AddToCart;
  const [cart] = ShoppingCart;
  const [removeFromCart] = RemoveFromCart;
  const {Warning} = useNotifications();


  const handleAddToCartClick = (bookID) => {
    if (user) {
      addToCart(bookID);
    } else {
      Warning("Авторизуйтесь чтобы положить товар в корзину!");
    }
  };

  const handleRemoveFromCartClick = (bookID) => {
    removeFromCart(bookID);
  };

  return (
    <Paper className={styles.root}>
      <div className="bookCard-container">
        <div className={styles.imageBox}>
          <img className={styles.image} src={book.image} alt=""/>
        </div>
        <Divider variant="fullWidth"/>
        <div>
          <Typography variant="h6" noWrap>
            {book.title}
          </Typography>
        </div>
        <div>
          <Typography variant="caption" gutterBottom>
            {book.author}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" gutterBottom>
            {book.price} сом
          </Typography>
        </div>
        <div className={styles.buttonsBox}>
          {!cart.books.some((x) => x.book.id === book.id) ? (
            <Button
              variant="contained"
              className={styles.addToCart}
              onClick={() => {
                handleAddToCartClick(book.id);
              }}
            >
              В корзину
            </Button>
          ) : (
            <Button
              variant="contained"
              className="bookCard-btn-cart-rem"
              onClick={() => {
                handleRemoveFromCartClick(book.id);
              }}
            >
              Из корзины
            </Button>
          )}
          <Button
            className="bookCard-btn-details"
            onClick={(e) => {
              console.log("show details");
            }}
          >
            подробнее
          </Button>
          {/* <a className='bookCard-details-link' href='#'>Подробнее</a> */}
        </div>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px",
    margin: "10px",
    width: "255px"
  },
  imageBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"
  },
  image: {
    height: "260px"
  },
  buttonsBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addToCart: {
    color: "#fff",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#388e3c"
    }
  }
}));

export default BookCard;