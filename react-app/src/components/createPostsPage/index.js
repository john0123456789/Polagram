import { createPostThunk } from '../../store/posts'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

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
    <form>
      <h1>POSTS A POST!</h1>
      <input type="text" placeholder="Image Url" value={imageURL} onChange={updateUrl}/>
      <input type="text" placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button type="submit" onClick={handleSubmit}>POST THAT POST HOMIE</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default CreatePostsPage;
