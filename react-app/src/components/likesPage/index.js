import { getAllLikesThunk  } from "../../store/likes";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function LikesPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const likesObject = useSelector((state) => state.likes);
    console.log(likesObject)
    const likes = Object.values(likesObject);


    useEffect(() => {
      dispatch(getAllLikesThunk());
    }, [dispatch]);

    const handleBack = (e) => {
      e.preventDefault();
      history.push("/posts");
    };


    return(
      <ul id="Likes-container">
          <h1>Likes</h1>
          <div id="thislikes-container">
              { likes.map(like =>{
                  return (
                      <div key={like.id}>
                          <h3>{like.userId}</h3>
                          <h3>{like.postId}</h3>
                          <h3>{like.totalLikes}</h3>
                          <button type="button" onClick={handleBack}>Back</button>
                      </div>
                      )
                  })}
          </div>
      </ul>
  )
}

export default LikesPage;
