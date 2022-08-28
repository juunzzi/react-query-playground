import { client } from "..";

export const getPosts = () => client.get("/posts");

export const getPost = (id) => client.get(`/post/${id}`);

export const createPost = (body) => client.post(`/posts`, body);
