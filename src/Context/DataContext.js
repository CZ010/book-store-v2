import React, {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import * as Firestore from "../Services/Firestore/Firestore";

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const user = cookies.user;

  const [cart, setCart] = useState({books: []});

  const login = userData => {
    setCookie("user", userData, {path: "/", maxAge: 2592000});
  };

  const logout = () => {
    removeCookie("user");
  };

  useEffect(() => {
    if (user) {
      Firestore.getUserCart(user.id).then(cart => {
        setCart(cart);
      });
    } else {
      setCart({books: []});
    }
  }, [user]);

  const addToCart = (bookID) => {
    Firestore.updateUserCart(user.id, bookID).catch(error => {
      console.error(error);
    });
    Firestore.getUserCart(user.id).then(cart => {
      setCart(cart);
    });
  };

  const removeFromCart = (bookID) => {
    Firestore.removeBookFromUserCart(user.id, bookID).catch(error => {
      console.error(error);
    });
    Firestore.getUserCart(user.id).then(cart => {
      setCart(cart);
    });
  };


  return (
    <DataContext.Provider
      value={{
        AuthedUser: [user],
        Login: [login],
        Logout: [logout],
        ShoppingCart: [cart],
        AddToCart: [addToCart],
        RemoveFromCart: [removeFromCart]
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
