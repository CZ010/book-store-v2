import firebase from "../../firebase";
import {v4 as uuid} from "uuid";

const db = firebase.firestore();
const storage = firebase.storage();

const getSum = (cart) => {
  let sum = 0;
  for (const book of cart) {
    sum += Number.parseInt(book.book.price) * Number.parseInt(book.quantity);
  }
  return sum;
};

export const getUsersCollection = async () => {
  const roles = await getRolesCollection();
  const usersRef = await db.collection("users").get();
  const users = usersRef.docs.map(doc => {
    const user = doc.data();
    user.role = roles.find(x => x.id === user.role);
    return user;
  });
  users.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return users;
};

export const getRolesCollection = async () => {
  const rolesRef = await db.collection("roles").get();
  return rolesRef.docs.map(doc => doc.data());
};

export const setUserDocument = async (data) => {
  const ID = uuid();
  const createDate = Date.now();
  const userEmailValid = await checkUserByEmail(data.email);

  if (!userEmailValid) {
    db.collection("users").doc(ID).set({
      id: ID,
      name: data.name,
      address: data.address,
      phone: data.phone,
      role: data.role,
      email: data.email,
      password: data.password,
      createDate: createDate,
      status: true
    }).then(() => {
      console.log("User successfully added!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
    await createUsersCart(ID, createDate);
    return "Пользователь успешно добавлен!";
  } else {
    throw new Error("Пользователь с такой почтой уже существует!");
  }
};

export const getUserByEmailAndPassword = async (data) => {
  const usersRef = await db.collection("users")
    .where("email", "==", data.email)
    .where("password", "==", data.password)
    .where("status", "==", true).get();
  const users = usersRef.docs.map(doc => doc.data());
  return users[0];
};

export const auth = async (data) => {
  return await getUserByEmailAndPassword(data);
};

export const checkUserByEmail = async (email) => {
  const usersRef = await db.collection("users")
    .where("email", "==", email).get();
  const users = usersRef.docs.map(doc => doc.data());
  return users.length > 0;
};

export const checkCategoryByTitle = async (title) => {
  const categoriesRef = await db.collection("categories")
    .where("title", "==", title).get();
  const categories = categoriesRef.docs.map(doc => doc.data());
  return categories.length > 0;
};

export const setCategoryDocument = async (data) => {
  const ID = uuid();
  const createDate = Date.now();
  const categoryValid = await checkCategoryByTitle(data.title);

  if (!categoryValid) {
    db.collection("categories").doc(ID).set({
      id: ID,
      title: data.title,
      createDate: createDate,
      status: true
    }).then(() => {
      console.log("Category successfully added!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
    return "Категория успешно добавлена!";
  } else {
    throw new Error("Такая категория уже существует!");
  }
};

export const getActiveCategories = async () => {
  const categoriesRef = await db.collection("categories")
    .where("status", "==", true).get();
  const categories = categoriesRef.docs.map(doc => doc.data());
  categories.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return categories;
};

export const getCategoriesCollection = async () => {
  const categoriesRef = await db.collection("categories").get();
  const categories = categoriesRef.docs.map(doc => doc.data());
  categories.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return categories;
};

export const setProductDocument = async (data) => {
  const ID = uuid();
  const createDate = Date.now();

  const storageRef = storage.ref();
  const fileRef = storageRef.child(ID);
  await fileRef.put(data.image[0]);

  db.collection("products").doc(ID).set({
    id: ID,
    title: data.title,
    author: data.author,
    description: data.description,
    category: data.category,
    price: Number.parseInt(data.price),
    count: Number.parseInt(data.count),
    createDate: createDate,
    status: true,
    image: await fileRef.getDownloadURL()
  }).then(() => {
    console.log("Product successfully added!");
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });
  return "Книга успешно добавлена!";
};

export const getProductsCollection = async () => {
  const categories = await getCategoriesCollection();
  const productsRef = await db.collection("products").get();
  const products = productsRef.docs.map(doc => {
    const product = doc.data();
    product.category = categories.find(x => x.id === product.category);
    return product;
  });
  products.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return products;
};


export const getProductsByCategory = async (categoryId) => {
  const categories = await getCategoriesCollection();
  const productsRef = await db.collection("products")
    .where("category", "==", categoryId).get();
  const products = productsRef.docs.map(doc => {
    const product = doc.data();
    product.category = categories.find(x => x.id === product.category);
    return product;
  });
  products.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return products;
};

export const createUsersCart = async (userID, createDate) => {
  const ID = uuid();
  db.collection("carts").doc(ID).set({
    id: ID,
    user: userID,
    books: [],
    createDate: createDate,
    lastUpdateDate: createDate
  }).then(() => {
    console.log("Cart successfully added!");
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });
};

export const getUserCart = async (userID) => {
  const books = await getProductsCollection();
  const cartsRef = await db.collection("carts")
    .where("user", "==", userID).get();
  const carts = cartsRef.docs.map(doc => {
    const cart = doc.data();
    cart.books = cart.books.map(bookID => {
      const bookIndex = books.findIndex(element => element.id === bookID);
      const newBooks = books[bookIndex];
      return {book: newBooks, quantity: 1};
    });
    return cart;
  });
  return carts[0];
};

export const getUserCartArray = async (userID) => {
  const cartsRef = await db.collection("carts")
    .where("user", "==", userID).get();
  const carts = cartsRef.docs.map(doc => doc.data());
  return carts[0];
};

export const updateUserCart = async (userID, bookID) => {
  const cart = await getUserCartArray(userID);
  const books = cart.books.slice();
  books.push(bookID);

  const cartRef = await db.collection("carts").doc(cart.id);
  cartRef.update({
    books: books
  }).then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
};

export const removeBookFromUserCart = async (userID, bookID) => {
  const cart = await getUserCartArray(userID);
  const books = cart.books.filter(x => x !== bookID);

  const cartRef = await db.collection("carts").doc(cart.id);
  cartRef.update({
    books: books
  }).then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
};

export const setOrderDocument = async (data) => {
  const sum = getSum(data.books);
  const order = {
    id: data.id,
    createDate: data.createDate,
    books: data.books.map(element => {
      return {book: element.book.id, quantity: element.quantity};
    }),
    user: data.user,
    sum: sum,
    status: false
  };

  for (const item of data.books) {
    const cartRef = await db.collection("products").doc(item.book.id);
    cartRef.update({
      count: item.book.count - item.quantity
    }).then(() => {
      console.log("Document successfully updated!");
    }).catch((error) => {
      console.error("Error updating document: ", error);
    });
  }


  db.collection("orders").doc(data.id).set(order).then(() => {
    console.log("Order successfully added!");
  }).catch((error) => {
    console.error("Error writing document: ", error);
  });
  return "Ваш заказ успешно оформлен!";
};

export const getOrdersCollection = async () => {
  const books = await getProductsCollection();
  const users = await getUsersCollection();

  const ordersRef = await db.collection("orders").get();
  const orders = ordersRef.docs.map(doc => {
    const order = doc.data();
    order.books = order.books.map(element => {
      element.book = books.find(x => x.id === element.book);
      return element;
    });
    order.user = users.find(x => x.id === order.user);

    return order;
  });
  orders.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0));
  return orders;
};

export const updateDocument = async (col, ID, changes) => {
  const userRef = await db.collection(col).doc(ID);
  userRef.update({
    ...changes
  }).then(() => {
    console.log("Document successfully updated!");
  }).catch((error) => {
    console.error("Error updating document: ", error);
  });
};