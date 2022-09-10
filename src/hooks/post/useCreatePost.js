import { useCreatePostMutation } from "../queries/post";

export const useCreatePost = () => {
  const mutation = useCreatePostMutation();

  const createPost = async (body) => {
    return mutation.mutateAsync(body, {
      onSuccess(data) {
        alert("성공");
        console.log(data);
      },
      onError(error) {
        alert(error);
        console.log(error);
      },
    });
  };

  return { createPost };
};
