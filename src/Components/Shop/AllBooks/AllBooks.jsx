import React, {useEffect, useState} from "react";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {makeStyles} from "@material-ui/core";
import BookCard from "../BookCard/BookCard";

const AllBooks = () => {
  const styles = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Firestore.getProductsCollection().then(collection => {
      setProducts(collection);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className={styles.root}>
      {
        products.map(book => (
          <BookCard key={book.id} {...book}/>
        ))
      }
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: "-10px"
  }
}));

export default AllBooks;