import { getAllFollowersThunk, deleteFollowThunk } from "../../store/followers";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function FollowersPage() {
    const dispatch = useDispatch();
    const history = useHistory();


    const urlArray = window.location.href.split('/');
    const num = Number(urlArray[urlArray.length - 1]);

    const followers = useSelector(state => {
      return Object.values(state.followers)
    })

    useEffect(() => {
      dispatch(getAllFollowersThunk(num));
    }, [dispatch]);

    const handleUnfollow = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
      for (const follower of followers) {
        if (follower.id === buttonData) {
          dispatch(deleteFollowThunk(follower, buttonData))
          history.push("/")
        }
      }
    }


    return(
      <ul id="Followers-container">
          <h1>Followers</h1>
          <div id="thisfollowers-container">
              { followers.map(follower =>{
                  return (
                      <div key={follower.id}>
                          <h3>{follower.follower}</h3>
                          {/* <button type="button" onClick={handleBack}>Back</button> */}
                          <button id={follower.id} type="button" onClick={handleUnfollow}>unfollow</button>
                      </div>
                      )
                  })}
          </div>
      </ul>
  )
}

export default FollowersPage;
