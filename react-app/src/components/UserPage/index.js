import { getAUser} from "../../store/users";
import { useDispatch, useSelector} from "react-redux";
import { useHistory , useParams } from "react-router-dom";
import { useEffect } from "react";
import './UserPage.css'

function UserPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {id} = useParams();
    const user = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(getAUser());
    }, [dispatch, id]);


    return (
        <div>
        <img src={user.profpic} className="profilepic"/><b className="username">{user.username}</b># posts    #followers  #following
        </div>
    )
}


export default UserPage
