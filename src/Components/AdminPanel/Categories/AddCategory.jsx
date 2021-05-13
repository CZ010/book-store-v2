import React from "react";
import {makeStyles, Paper} from "@material-ui/core";
import {Form, Input, Submit} from "../../../UI-kit/Forms";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as Firestore from "../../../Services/Firestore/Firestore";
import {useNotifications} from "../../../Hooks";

const AddCategory = () => {
  const styles = useStyles();
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const {Success, Error} = useNotifications();

  const onSubmit = (data) => {
    Firestore.setCategoryDocument(data).then((message) => {
      Success(message);
    }).catch(error => {
      Error(error.message);
    });
    reset();
  };

  return (
    <Paper className={styles.root}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Название*"
          type="text"
          ref={register("title")}
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <Submit>Добавить категорию</Submit>
      </Form>
    </Paper>
  );
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Вы должны указать название категории!")
    .matches(/^[a-zа-яё]+(?: [a-zа-яё]+)?$/i, "Введите коректное название!"),
});

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px"
  }
}));

export default AddCategory;