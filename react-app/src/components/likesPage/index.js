import { getAllLikesThunk, deleteLikesThunk } from "../../store/likes";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function LikesPage() {
    const dispatch = useDispatch();
    const history = useHistory();


    const likes = useSelector(state => {
      return Object.values(state.likes)
    })

    useEffect(() => {
      dispatch(getAllLikesThunk());
    }, [dispatch]);

    const handleBack = (e) => {
      e.preventDefault();
      history.push("/posts");
    };

    const handleUnlike = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
      for (const like of likes) {
        if (like.id === buttonData) {
          dispatch(deleteLikesThunk(like, buttonData))
          history.push("/posts")
        }
      }
    }


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
                          <button id={like.id} type="button" onClick={handleUnlike}>unlike</button>
                      </div>
                      )
                  })}
          </div>
      </ul>
  )
}

export default LikesPage;
