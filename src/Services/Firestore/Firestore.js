import firebase from "../../firebase";
import {v4 as uuid} from "uuid";

const db = firebase.firestore();
const storage = firebase.storage();

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
  const userEmailValid = await getUserByEmail(data.email);

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
    return "Пользователь успешно добавлен!";
  } else {
    throw new Error("Пользователь с такой почтой уже существует!");
  }
};

export const auth = async (data) => {
  const user = await getUserByEmail(data.email);
  if (user) {
    return user.password === data.password ? user : false;
  } else {
    return false;
  }
};

export const getUserByEmail = async (email) => {
  const usersRef = await db.collection("users")
    .where("email", "==", email).get();
  const users = usersRef.docs.map(doc => doc.data());
  return users.length > 0;
};

export const getCategoryByTitle = async (title) => {
  const categoriesRef = await db.collection("categories")
    .where("title", "==", title).get();
  const categories = categoriesRef.docs.map(doc => doc.data());
  return categories.length > 0;
};

export const setCategoryDocument = async (data) => {
  const ID = uuid();
  const createDate = Date.now();
  const categoryValid = await getCategoryByTitle(data.title);

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
