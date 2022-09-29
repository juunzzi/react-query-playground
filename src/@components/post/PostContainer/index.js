import { useQueryClient } from "react-query";
import { useCreatePost } from "../../../hooks/post/useCreatePost";
import {
  useFetchPostList,
  useFetchPostListSecond,
} from "../../../hooks/queries/post";
import PostList from "../PostList";
const PostContainer = () => {
  const { posts } = useFetchPostList();
  const { posts: postsSecond } = useFetchPostListSecond();

  const { createPost } = useCreatePost();

  const queryClient = useQueryClient();

  const onClickCreatePostButton = () => {
    const body = JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    });

    const result = createPost(body);

    queryClient.invalidateQueries("posts");
  };

  return (
    <div>
      <button onClick={onClickCreatePostButton}>Post 생성하기</button>
      <PostList posts={posts}></PostList>
      <PostList posts={postsSecond}></PostList>
    </div>
  );
};

export default PostContainer;
