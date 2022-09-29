import { useMutation, useQuery } from "react-query";
import { createPost, getPosts } from "../../api/posts";

const KEY = {
  posts: "posts",
  postsSecond: "postsSecond",
};

export const useFetchPostList = () => {
  const { data: getPostsResponse, isStale } = useQuery(KEY.posts, getPosts, {
    staleTime: 10000,
  });

  return {
    posts: getPostsResponse?.data ?? [],
    isStale,
  };
};

export const useFetchPostListSecond = () => {
  const { data: getPostsResponse, isStale } = useQuery(
    KEY.postsSecond,
    getPosts,
    {
      staleTime: 10000,
    }
  );

  return {
    posts: getPostsResponse?.data ?? [],
    isStale,
  };
};

export const useCreatePostMutation = () => {
  return useMutation(createPost, { useErrorBoundary: false });
};
