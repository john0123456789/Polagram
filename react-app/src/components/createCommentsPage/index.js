import { createCommentThunk } from '../../store/comments'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './createComment.css'

function CreateCommentsPage({value}) {
  const dispatch = useDispatch();
  const history = useHistory();


  const user = useSelector(state => state.session.user)

  let errorsObj = {content: ''};
  const [errors, setErrors] = useState(errorsObj);

  const [postId] = useState(value)
  const [userId] = useState(user.id);

  const [content, setContent] = useState("");

  const updateContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    errorsObj = {...errorsObj};
    if(content === '') {
      errorsObj.content = "Requires input!";
      error = true;
    } else if (content.length < 4 || content.length > 20) {
      errorsObj.content = "contents must be longer than 4 characters and shorter than 20";
      error = true;
    }
    setErrors(errorsObj);

    if(!error) {
    const newComment = {
        userId,
        postId:value,
        content
      };


    await dispatch(createCommentThunk(newComment));
    history.push("/posts/");

  }
};

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };



  return (
    <form className="commentform" >
      <input type="text"  className='inputfirst' placeholder="Content" value={content} onChange={updateContent}/>
      {errors.content && <div>{errors.content}</div>}
      <button type="submit" className="createbutton" onClick={(e)=>handleSubmit(e)}>Comment</button>
    </form>
  );

}

export default CreateCommentsPage;
