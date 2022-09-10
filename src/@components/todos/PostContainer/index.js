import { useCreatePost } from "../../../hooks/post/useCreatePost";
import { useFetchPostList } from "../../../hooks/queries/post";
import PostList from "../PostList";

const PostContainer = () => {
  const { posts } = useFetchPostList();

  const { createPost } = useCreatePost();

  const successAction = (successResponse) => {};

  const failureAction = (errorResponse) => {};

  const onClickCreatePostButton = () => {
    const body = JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    });

    try {
      const result = createPost(body);

      successAction(result);
    } catch (error) {
      failureAction(error);
    }
  };

  return (
    <div>
      <button onClick={onClickCreatePostButton}>Post 생성하기</button>
      <PostList posts={posts}></PostList>
    </div>
  );
};

export default PostContainer;
