import firebase from "../../firebase"
import {v4 as uuid} from 'uuid'

const db = firebase.firestore()

export const getUsersCollection = async () => {
  const roles = await getRolesCollection()
  const usersRef = await db.collection('users').get()
  const users = usersRef.docs.map(doc => {
    const user = doc.data()
    user.role = roles.find(x => x.id === user.role)
    return user
  })
  users.sort((a, b) => (a.createDate < b.createDate) ? 1
    : ((b.createDate < a.createDate) ? -1 : 0))
  return users
}

export const getRolesCollection = async () => {
  const rolesRef = await db.collection('roles').get()
  return rolesRef.docs.map(doc => doc.data())
}

export const setUserDocument = async (data) => {
  const ID = uuid()
  // const createDate = new Date().toLocaleDateString('ru-RU', {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  // })
  const createDate = Date.now();
  db.collection('users').doc(ID).set({
    id: ID,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    createDate: createDate,
    status: true
  }).then(() => {
    console.log("Document successfully written!")
  }).catch((error) => {
    console.error("Error writing document: ", error)
  })
}

export const auth = async (data) => {
  const user = await getUserByEmail(data.email)
  if (user) {
    return user.password === data.password ? user : false;
  } else {
    return false
  }
}

const getUserByEmail = async (email) => {
  const usersRef = await db.collection('users')
    .where('email', '==', email).get()
  const users = usersRef.docs.map(doc => doc.data())
  if (users.length > 0) {
    return users[users.length - 1]
  } else {
    return false
  }
}