import React, {useContext} from "react";
import {makeStyles, Paper} from "@material-ui/core";
import {Form, Submit, EmailInput, PasswordInput} from "../../UI-kit/Forms";
import {useForm} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Firestore from "../../Services/Firestore/Firestore";
import {useNotifications} from "../../Hooks";
import {DataContext} from "../../Context/DataContext";


const Authorization = () => {
  const styles = useStyles();
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const {Login} = useContext(DataContext);
  const [login] = Login;
  const {Error} = useNotifications();
  const history = useHistory();

  const onSubmit = (data) => {
    Firestore.auth(data).then(user => {
      if (user) {
        login(user);
        history.push("/shop");
      } else {
        Error("Неверный логин или пароль!");
        reset();
      }
    });

  };

  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <img
          className={styles.image}
          src="https://www.ci.oswego.or.us/sites/default/files/styles/large/public/reading-book-icon-74.png?itok=S4FoKN3q"
          alt=""/>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EmailInput
            ref={register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}/>

          <PasswordInput
            ref={register("password")}
            error={!!errors.password}
            helperText={errors?.password?.message}/>
          <Submit size={"large"}>Войти</Submit>
          <Link to="/registration">Нет аккаунта? Зарегистрируйся!</Link>
        </Form>
      </Paper>
    </div>

  );
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введите корректный email!")
    .required("Вы должны указать свою почту!"),
  password: yup
    .string()
    .required("Вы должны ввести пароль!")
});

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "calc(100vh - 140px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",

  },
  paper: {
    width: "500px",
    padding: "10px"
  },
  image: {
    height: "200px"
  }
}));

export default Authorization;