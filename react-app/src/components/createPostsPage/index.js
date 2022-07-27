import { createPostThunk } from '../../store/posts'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './createpost.css'

function CreatePostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)

  const[userId] = useState(user.id);
  const [imageURL, setUrl] = useState("");
  const [caption, setCaption] = useState("");


  const updateUrl = (e) => setUrl(e.target.value)
  const updateCaption = (e) => setCaption(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdPost = {
        userId,
        imageURL,
        caption
      };

      dispatch(createPostThunk(createdPost));
    history.push("/posts");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts");
  };



  return (
    <form className="post-form">
      <h2 className="postword">Create new post</h2>
      <input type="text" className='inputfirst' placeholder="Image Url" value={imageURL} onChange={updateUrl}/>
      <input type="text" className='inputs' placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button className="button" type="submit" onClick={handleSubmit}>Post</button>
      <button className="button" type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default CreatePostsPage;
