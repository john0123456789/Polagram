import { thunkGetAllFollowers } from "../../store/followers";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function FollowersPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const followersObject = useSelector((state) => state.followers);
  const followersArray = Object.values(followersObject);

  useEffect(() => {
    dispatch(thunkGetAllFollowers());
  }, [dispatch]);


  return (
    followersArray.map((follower) => {
    <ul key={follower.id}>
      <div>
      <li>Your Followers: {follower.followerId}</li>
      </div>
    </ul>
    }
  ));
}

export default FollowersPage;
