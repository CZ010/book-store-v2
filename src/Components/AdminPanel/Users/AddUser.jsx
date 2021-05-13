import React, {useEffect, useState} from "react";
import {Form, Input, Submit, SelectList} from "../../../UI-kit/Forms";
import {useForm} from "react-hook-form";
import {makeStyles, MenuItem, Paper} from "@material-ui/core";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {useNotifications} from "../../../Hooks";

const AddUser = () => {
  const styles = useStyles();
  const [roles, setRoles] = useState([]);
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const {Success, Error} = useNotifications();

  useEffect(() => {
    Firestore.getRolesCollection().then(collection => {
      setRoles(collection);
    }).catch(error => {
      console.error("ERROR!!! => ", error);
    });
  }, []);

  const onSubmit = (data) => {
    Firestore.setUserDocument(data).then((message) => {
      Success(message);
    }).catch(error => {
      Error(error.message);
    });
    reset();
  };

  return (
    <Paper className={styles.root}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Имя*"
               type="text"
               ref={register("name")}
               error={!!errors.name}
               helperText={errors?.name?.message}/>

        <Input label="Адрес*"
               type="text"
               ref={register("address")}
               error={!!errors.address}
               helperText={errors?.address?.message}/>

        <Input label="Телефон*"
               type="tel"
               ref={register("phone")}
               error={!!errors.phone}
               helperText={errors?.phone?.message}/>

        <SelectList ref={register("role")} label="Роль*" error={!!errors.role} helperText={errors?.role?.message}>
          {
            roles.map(role => {
              return (
                <MenuItem key={role.id} value={role.id}>{role.title}</MenuItem>
              );
            })
          }
        </SelectList>

        <Input label="Почта*"
               type="email"
               ref={register("email")}
               error={!!errors.email}
               helperText={errors?.email?.message}/>

        <Input label="Пароль*"
               type="password"
               ref={register("password")}
               error={!!errors.password}
               helperText={errors?.password?.message}/>

        <Input label="Подтверждение пароля*"
               type="password"
               ref={register("confirmPassword")}
               error={!!errors.confirmPassword}
               helperText={errors?.confirmPassword?.message}/>

        <Submit>Добавить пользователя</Submit>
      </Form>
    </Paper>
  );
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Вы должны указать свое имя!")
    .matches(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i, "Введите коректное имя!")
    .min(3, "Длина имени должна быть больше 3!"),
  address: yup.string().required("Вы должны указать свой адрес!"),
  phone: yup.string().required("Вы должны указать свой номер телефона!"),
  role: yup.string().required("Выберите роль пользователя!"),
  email: yup
    .string()
    .email("Введите корректный email!")
    .required("Вы должны указать свою почту!"),
  password: yup
    .string()
    .required("Вы должны указать пароль!")
    .min(4, "Пароль слишком короткий"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль!")
    .oneOf([yup.ref("password"), null], "Пароли не совпадают!"),
});

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px"
  }
}));

export default AddUser;