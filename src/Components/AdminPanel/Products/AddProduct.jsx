import React, {useEffect, useState} from "react";
import {Form, Input, Submit, SelectList} from "../../../UI-kit/Forms";
import {makeStyles, MenuItem, Paper} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Firestore from "../../../Services/Firestore/Firestore";
import * as yup from "yup";
import {useNotifications} from "../../../Hooks";

const AddProduct = () => {
  const styles = useStyles();
  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const [categories, setCategories] = useState([]);
  const {Success, Error} = useNotifications();

  useEffect(() => {
    Firestore.getCategoriesCollection().then(collection => {
      setCategories(collection);
    });
  }, []);

  const onSubmit = (data) => {
    Firestore.setProductDocument(data).then(message => {
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
        <Input
          label="Автор*"
          type="text"
          ref={register("author")}
          error={!!errors.author}
          helperText={errors?.author?.message}
        />
        <SelectList ref={register("category")} label="Категория*" error={!!errors.category}
                    helperText={errors?.category?.message}>
          {
            categories.map(role => {
              return (
                <MenuItem key={role.id} value={role.id}>{role.title}</MenuItem>
              );
            })
          }
        </SelectList>
        <Input
          label="Описание*"
          type="text"
          ref={register("description")}
          error={!!errors.description}
          helperText={errors?.description?.message}
          multiline
          rows={5}
        />
        <Input
          label="Цена*"
          type="number"
          ref={register("price")}
          error={!!errors.price}
          helperText={errors?.price?.message}
        />
        <Input
          label="Количество на скалде*"
          type="number"
          ref={register("count")}
          error={!!errors.count}
          helperText={errors?.count?.message}
        />
        <p><input type="file" {...register("image")}/></p>
        {errors.image && (<p>{errors.image.message}</p>)}
        <Submit>Добавить товар</Submit>
      </Form>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    padding: "10px"
  },
  imageError: {
    color: "red"
  }
}));

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Вы должны указать название книги!"),
  author: yup
    .string()
    .required("Вы должны указать автора книги!"),
  category: yup
    .string()
    .required("Вы должны выбрать категорию книги!"),
  description: yup
    .string()
    .required("Вы должны указать описание!"),
  price: yup
    .string()
    .required("Вы должны указать цену книги!"),
  count: yup
    .string()
    .required("Вы должны указать количество на скалде!"),
  image: yup
    .mixed()
    .required("Вы должны выбрать картинку для обложки!")
});

export default AddProduct;