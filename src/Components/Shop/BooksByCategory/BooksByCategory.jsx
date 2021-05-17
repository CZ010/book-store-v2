import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as Firestore from "../../../Services/Firestore/Firestore";
import BookCard from "../BookCard/BookCard";
import {makeStyles} from "@material-ui/core";

const BooksByCategory = () => {
  const styles = useStyles();
  const {categoryId} = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Firestore.getProductsByCategory(categoryId).then(collection => {
      setProducts(collection);
    }).catch(error => {
      console.error(error);
    });
  }, [categoryId]);

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

export default BooksByCategory;