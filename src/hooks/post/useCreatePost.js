import { useCreatePostMutation } from "../queries/post";

export const useCreatePost = () => {
  const mutation = useCreatePostMutation();

  const createPost = (body) => {
    mutation.mutate(body, {
      onSuccess() {
        console.log("Business"); // call second
      },
    });
  };

  return { createPost };
};
