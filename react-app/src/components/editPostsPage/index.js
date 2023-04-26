import { updatePostThunk } from '../../store/posts'
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import './editPosts.css'

function EditPostsPage({postId}) {
  const dispatch = useDispatch();
  const history = useHistory();

  let errorsObj = {content: ''};
  const [errors, setErrors] = useState(errorsObj);

  const {id} = useParams();
  const user = useSelector(state => state.session.user)
  const post = useSelector(state => state.posts)
  const singlePost = post[postId]

  const[userId] = useState(user.id);
  const [imageURL, setUrl] = useState(singlePost.imageURL);
  const [caption, setCaption] = useState(singlePost.caption);


  const updateUrl = (e) => setUrl(e.target.value)
  const updateCaption = (e) => setCaption(e.target.value);

  const handleSubmit = (e) => {
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
    const updatedPost = {
        userId,
        imageURL,
        caption
      };

      dispatch(updatePostThunk(updatedPost, postId));
    history.push("/posts/");
  }
};

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };


  return (
    <form>
      {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
      <input type="text" className='inputs' placeholder="Image Url" value={imageURL} onChange={updateUrl}/>
      <input type="text" className='inputs' placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button type="submit" className="submitbutton" onClick={handleSubmit}>Submit Edit</button>
    </form>
  );

}

export default EditPostsPage;
