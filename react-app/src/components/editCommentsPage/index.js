import { updateCommentThunk } from '../../store/comments'
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import './editcomments.css'
function EditCommentsPage({commentId}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const user = useSelector(state => state.session.user)
  const comment = useSelector(state => state.comments)
  const post = useSelector(state => state.posts)

  const singleComment = comment[commentId]

  let errorsObj = {content: ''};
  const [errors, setErrors] = useState(errorsObj);

  const[userId] = useState(user.id);
  const[postId] = useState(post.id)

  const [content, setContent] = useState(singleComment.content);

  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    let error = false;
    errorsObj = {...errorsObj};
    if(content === '') {
      errorsObj.content = "Requires input!";
      error = true;
    } else if (content.length < 5 || content.length > 20) {
      errorsObj.content = "contents must be longer than 5 characters and shorter than 20";
      error = true;
    }
    setErrors(errorsObj);

    if(!error) {
    const updatedComment = {
        userId,
        postId,
        content
      };

      dispatch(updateCommentThunk(updatedComment, commentId));


    history.push("/posts/");
  }
};



  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/comments/");
  };


  return (
    <form>
      {/* <h1>Edit your COMMENT!</h1> */}
      <input type="text" className='inputs' placeholder="Content" value={content} onChange={updateContent}/>
      {errors.content && <div>{errors.content}</div>}
      <button type="submit" className="editcombutt" onClick={handleSubmit}>Update Comment</button>
      {/* <button type="button" className="editcombutt" onClick={handleCancelClick}>Cancel</button> */}
    </form>
  );

}

export default EditCommentsPage;
