import React, {useContext, useEffect, useState} from "react";
import {Button, Divider, Grid, IconButton, List, ListItem, makeStyles, Paper, Typography} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import {DataContext} from "../../Context/DataContext";
import {v4 as uuid} from "uuid";
import * as Firestore from "../../Services/Firestore/Firestore";
import {useNotifications} from "../../Hooks";
import {useHistory} from "react-router-dom";

const getSum = (cart) => {
  let sum = 0;
  for (const book of cart) {
    sum += Number.parseInt(book.book.price) * Number.parseInt(book.quantity);
  }
  return sum;
};

const Checkout = () => {
  const styles = useStyles();
  const {AuthedUser, ShoppingCart} = useContext(DataContext);
  const [user] = AuthedUser;
  const [cart] = ShoppingCart;

  const [order, setOrder] = useState({books: []});
  const {Success, Error} = useNotifications();
  const history = useHistory();

  useEffect(() => {
    setOrder({
      id: uuid(),
      createDate: Date.now(),
      books: cart.books.map(book => book),
      user: user.id,
    });
  }, [cart, user]);

  const addOneCopy = (bookID) => {
    const bookIndex = order.books.findIndex((element) => element.book.id === bookID);
    const updatedOrder = {...order};
    if (!(updatedOrder.books[bookIndex].quantity + 1 > Number.parseInt(updatedOrder.books[bookIndex].book.count))) {
      updatedOrder.books[bookIndex] = {
        book: updatedOrder.books[bookIndex].book,
        quantity: updatedOrder.books[bookIndex].quantity + 1,
      };
      setOrder(updatedOrder);
    }
  };

  const removeOneCopy = (bookID) => {
    const bookIndex = order.books.findIndex((element) => element.book.id === bookID);
    const updatedOrder = {...order};
    if (!(updatedOrder.books[bookIndex].quantity - 1 <= 0)) {
      updatedOrder.books[bookIndex] = {
        book: updatedOrder.books[bookIndex].book,
        quantity: updatedOrder.books[bookIndex].quantity - 1,
      };
      setOrder(updatedOrder);
    }
  };

  const onSubmit = () => {
    Firestore.setOrderDocument({...order}).then(message => {
      Success(message);
    }).catch(error => {
      Error(error.message);
    });
    history.push("/shop");
  };

  const handleRemoveFromOrderClick = (bookID) => {
    const updatedOrderBooks = order.books.filter(x => x.book.id !== bookID);
    setOrder({...order, books: updatedOrderBooks});
  };


  return (
    <Grid container spacing={3} className={styles.root}>
      <Grid item xs={6}>
        <Paper className={styles.paper1}>
          <List className={styles.list}>
            {order.books.map((book) => {
              return (
                <React.Fragment key={book.book.id}>
                  <ListItem className={styles.listItem} key={book.book.id}>
                    <div className={styles.listItemInfo}>
                      <div className={styles.listItemImage}>
                        <img
                          style={{width: "60px"}}
                          src={book.book.image}
                          alt={book.book.title}
                        />
                      </div>
                      <div className={styles.listItemText}>
                        <div>
                          <Typography variant="h6">
                            {book.book.title}
                          </Typography>
                        </div>
                        <div>{book.book.author}</div>
                        <div>
                          <Typography variant="subtitle2">
                            {book.book.price} сом
                          </Typography>
                        </div>
                      </div>
                    </div>

                    <div className={styles.listItemButtons}>
                      <div className={styles.listItemCounter}>
                        <IconButton onClick={() => addOneCopy(book.book.id)}>
                          <AddIcon/>
                        </IconButton>
                        <Typography variant="subtitle2">
                          {book.quantity}
                        </Typography>
                        <IconButton onClick={() => removeOneCopy(book.book.id)}>
                          <RemoveIcon/>
                        </IconButton>
                      </div>
                      <div>
                        <IconButton onClick={() => {
                          handleRemoveFromOrderClick(book.book.id);
                        }}>
                          <DeleteIcon/>
                        </IconButton>
                      </div>
                    </div>
                  </ListItem>
                  <Divider/>
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={styles.paper2}>
          <div className={styles.checkoutHeader}>
            <Typography variant="h6">Предпросмотр заказа</Typography>
            <Typography variant="subtitle1">
              № заказа: {order.id}
            </Typography>
          </div>
          <div className={styles.divider}>
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </div>
          <div className="checkout-body">
            {order.books.map((book) => {
              return (
                <div className={styles.checkoutItem} key={book.book.id}>
                  <Typography variant="body1" noWrap>
                    {book.book.title}
                  </Typography>
                  <Typography variant="body1" noWrap>
                    {book.book.price} &#215; {book.quantity} &#8801;{" "}
                    {book.book.price * book.quantity}
                  </Typography>
                </div>
              );
            })}
          </div>
          <div className={styles.divider}>
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          </div>
          <div className={styles.checkoutFooter}>
            <Typography variant="body1" noWrap>
              {
                new Date(order.createDate).toLocaleDateString("ru-RU", {
                  year: "numeric",
                  month: "2-digit",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              }
            </Typography>
            <Typography variant="h6">
              Итог: {getSum(order.books)} сом
            </Typography>
          </div>
          <Button
            size="large"
            startIcon={<CheckIcon/>}
            color="primary"
            fullWidth
            variant="contained"
            onClick={onSubmit}
          >
            подтвердить заказ
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "12px 0 12px 0"
  },
  paper1: {
    padding: "0 10px 0 10px"
  },
  paper2: {
    padding: "10px"
  },
  list: {
    paddingBottom: "0"
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemText: {
    maxWidth: "500px",
  },
  listItemButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemCounter: {
    widthMax: "400px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center"
  },
  listItemImage: {
    marginRight: "15px"
  },
  checkoutHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px"
  },
  checkoutItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0"
  },
  divider: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginBottom: "15px"
  },
  checkoutFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  }
}));

export default Checkout;