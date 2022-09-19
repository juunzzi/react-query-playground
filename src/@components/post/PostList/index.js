import PostItem from "../PostItem";

const PostList = (props) => {
  const { posts } = props;

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post}></PostItem>
      ))}
    </div>
  );
};

export default PostList;
