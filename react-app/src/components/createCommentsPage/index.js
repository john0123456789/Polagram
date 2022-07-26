import { createCommentThunk } from '../../store/comments'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function CreateCommentsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)
  const post = useSelector(state => state.posts)

  const[userId] = useState(user.id);
  const[postId] = useState(post.id);

  const [content, setContent] = useState("");

  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
        userId,
        postId,
        content
      };

    dispatch(createCommentThunk(newComment));
    history.push("/comments");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/comments");
  };



  return (
    <form>
      <h1>CREATE A COMMENT!</h1>
      <input type="text" placeholder="Content" value={content} onChange={updateContent}/>
      <button type="submit" onClick={handleSubmit}>Comment</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default CreateCommentsPage;
