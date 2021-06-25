import React, {useEffect, useState} from 'react';
import {makeStyles, MenuItem, Paper} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNotifications} from '../../Hooks';
import * as Firestore from '../../Services/Firestore/Firestore';
import {Form, Input, SelectList, Submit} from '../../UI-kit/Forms';
import * as yup from 'yup';
import {Link} from 'react-router-dom';

const Registration = () => {
  const styles = useStyles();
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {Success, Error} = useNotifications();

  const onSubmit = (data) => {
    Firestore.setUserDocument({
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: 'customer'
    }).then(() => {
      Success('Вы успешно зарегистрировались!');
    }).catch(error => {
      Error(error.message);
    });
    reset();
  };
  return (
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Имя*"
                 type="text"
                 ref={register('name')}
                 error={!!errors.name}
                 helperText={errors?.name?.message}/>

          <Input label="Адрес*"
                 type="text"
                 ref={register('address')}
                 error={!!errors.address}
                 helperText={errors?.address?.message}/>

          <Input label="Телефон*"
                 type="tel"
                 ref={register('phone')}
                 error={!!errors.phone}
                 helperText={errors?.phone?.message}/>

          <Input label="Почта*"
                 type="email"
                 ref={register('email')}
                 error={!!errors.email}
                 helperText={errors?.email?.message}/>

          <Input label="Пароль*"
                 type="password"
                 ref={register('password')}
                 error={!!errors.password}
                 helperText={errors?.password?.message}/>

          <Input label="Подтверждение пароля*"
                 type="password"
                 ref={register('confirmPassword')}
                 error={!!errors.confirmPassword}
                 helperText={errors?.confirmPassword?.message}/>

          <Submit>Зарегистрироваться</Submit>
          <Link to="/authorization">Уже есть аккаунта? Авторизуйся!</Link>
        </Form>
      </Paper>
    </div>
  );
};

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Вы должны указать свое имя!')
    .matches(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i, 'Введите коректное имя!')
    .min(3, 'Длина имени должна быть больше 3!'),
  address: yup.string().required('Вы должны указать свой адрес!'),
  phone: yup.string().required('Вы должны указать свой номер телефона!'),
  email: yup
    .string()
    .email('Введите корректный email!')
    .required('Вы должны указать свою почту!'),
  password: yup
    .string()
    .required('Вы должны указать пароль!')
    .min(4, 'Пароль слишком короткий'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль!')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают!'),
});

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 140px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '100px'
  },
  paper: {
    width: '500px',
    padding: '10px'
  },
  image: {
    height: '200px'
  }
}));

export default Registration;