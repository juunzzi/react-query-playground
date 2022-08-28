import { useCreatePost } from "../../../hooks/post/useCreatePost";
import { useFetchPostList } from "../../../hooks/queries/post";
import PostList from "../PostList";

const PostContainer = () => {
  const { posts } = useFetchPostList();

  const { createPost } = useCreatePost();

  const onClickCreatePostButton = () => {
    const body = JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    });

    createPost(body);
  };

  return (
    <div>
      <button onClick={onClickCreatePostButton}>Post 생성하기</button>
      <PostList posts={posts}></PostList>
    </div>
  );
};

export default PostContainer;
