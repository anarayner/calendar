import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {AuthActionCreators} from "../store/reducers/auth/action_creators";
import {EventActionCreators} from "../store/reducers/event/action-creators";

export const useAuthActions=()=>{
    const dispatch = useDispatch()
    return bindActionCreators(AuthActionCreators, dispatch)
}

export const useEventActions=()=>{
    const dispatch = useDispatch()
    return bindActionCreators(EventActionCreators, dispatch)
}