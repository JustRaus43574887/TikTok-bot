import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import CREATE_BLOGGER_MUTATION from "../src/apollo/client/graphql/mutations/CreateBlogger";
import { initializeApollo } from "../src/apollo/client/startup";
import { showMessage } from "../src/apollo/client/startup/cache";
import BLOGGERS_QUERY from "../src/apollo/client/graphql/queries/Bloggers";
import Router from "next/router";

const schema = yup
  .object({
    name: yup.string().required("Обязательное поле!"),
    tiktok_id: yup.string().required("Обязательное поле!"),
  })
  .required();

const AddUser: NextPage = () => {
  const [create] = useMutation<
    { createBlogger: AppTypes.Blogger },
    { args: AppTypes.BloggerArgs }
  >(CREATE_BLOGGER_MUTATION, {
    client: initializeApollo(),
    onCompleted: () => {
      showMessage({ message: "Успешно!", type: "success" });
      Router.push("/");
    },
    update: (cache, { data }) => {
      if (data) {
        const cachedBloggers = cache.readQuery<{
          bloggers: AppTypes.Blogger[];
        }>({ query: BLOGGERS_QUERY });
        if (cachedBloggers)
          cache.writeQuery<{ bloggers: AppTypes.Blogger[] }>({
            query: BLOGGERS_QUERY,
            data: {
              bloggers: [...cachedBloggers.bloggers, data.createBlogger],
            },
          });
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppTypes.BloggerArgs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      tiktok_id: "",
    },
  });

  const onSubmit = (args: AppTypes.BloggerArgs) =>
    create({ variables: { args } });

  return (
    <>
      <Head>
        <title>Добавить блоггера</title>
      </Head>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item mb={5}>
          <Typography variant="h4">Добавить блоггера</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardContent>
                <Grid container direction={"column"} alignItems={"center"}>
                  <Grid item>
                    <TextField
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      label="Имя"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item mt={2}>
                    <TextField
                      {...register("tiktok_id")}
                      error={!!errors.tiktok_id}
                      helperText={errors.tiktok_id?.message}
                      label="TikTok id"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item mt={3}>
                    <Button variant="contained" type="submit">
                      Добавить
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default AddUser;
