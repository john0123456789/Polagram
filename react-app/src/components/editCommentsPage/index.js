import { updateCommentThunk } from '../../store/comments'
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

function EditCommentsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const user = useSelector(state => state.session.user)
  const comment = useSelector(state => state.comments)
  const post = useSelector(state => state.posts)

  const singleComment = comment[id]

  const[userId] = useState(user.id);
  const[postId] = useState(post.id)

  const [content, setContent] = useState(singleComment.content);

  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedComment = {
        userId,
        postId,
        content
      };

      dispatch(updateCommentThunk(updatedComment, id));
    history.push("/posts");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/comments");
  };


  return (
    <form>
      <h1>Edit your COMMENT!</h1>
      <input type="text" className='inputs' placeholder="Content" value={content} onChange={updateContent}/>
      <button type="submit" onClick={handleSubmit}>Update Comment</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default EditCommentsPage;
