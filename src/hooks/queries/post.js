import { useMutation, useQuery } from "react-query";
import { createPost, getPosts } from "../../api/posts";

const key = "posts";

export const useFetchPostList = () => {
  const { data: getPostsResponse, isStale } = useQuery(key, getPosts, {});

  return {
    posts: getPostsResponse?.data ?? [],
    isStale,
  };
};

export const useCreatePostMutation = () => {
  return useMutation(createPost, {
    onSuccess() {
      console.log("Mutation"); // call first
    },
  });
};
