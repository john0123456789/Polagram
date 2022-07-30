import { createPostThunk } from '../../store/posts'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './createpost.css'

function CreatePostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user)

  let errorsObj = {content: ''};
  const [errors, setErrors] = useState(errorsObj);

  const[userId] = useState(user.id);
  const [imageURL, setUrl] = useState("");
  const [caption, setCaption] = useState("");


  const updateUrl = (e) => setUrl(e.target.value)
  const updateCaption = (e) => setCaption(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;
    errorsObj = {...errorsObj};
    if (!imageURL.includes(".jpg") && !imageURL.includes(".png") && !imageURL.includes(".JPG") && !imageURL.includes(".PNG") && !imageURL.includes("image")) {
      errorsObj.imageURL = "imageURL must be jpg/png or contain image"
      error = true
    }
    else if (imageURL.length < 4) {
      errorsObj.imageURL = "imageURL must be at least 4 characters."
      error = true
    }
    if(caption === '') {
      errorsObj.caption = "Requires input!";
      error = true;
    } else if (caption.length < 5 || caption.length > 20) {
      errorsObj.caption = "captions must be longer than 5 characters and shorter than 20";
      error = true;
    }
    setErrors(errorsObj);

    if(!error) {
    const createdPost = {
        userId,
        imageURL,
        caption
      };

      let newPost = await dispatch(createPostThunk(createdPost))
          if(newPost) {
          history.push('/posts/')
        }
      }

}

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };



  return (
    <form className="post-form">
      <h2 className="postword">Create new post</h2>
      {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
      <input type="text" className='inputfirst' placeholder="Image Url" value={imageURL} onChange={updateUrl}/>
      <input type="text" className='inputs' placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button className="button" type="submit" onClick={handleSubmit}>Post</button>
      <button className="button" type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default CreatePostsPage;
