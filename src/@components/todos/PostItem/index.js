const PostItem = (props) => {
  const { post } = props;

  const { id, title, body } = post;

  return (
    <div>
      <div>{body}</div>
      <div>{id}</div>
      <div>{title}</div>
    </div>
  );
};

export default PostItem;
