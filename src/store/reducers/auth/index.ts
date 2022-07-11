import {AuthActEnum, AuthAction, AuthState} from "./types";
import {IUser} from "../../../models/IUser";

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    error: '',
    isLoading: false
}

export default function AuthReducer(state = initialState, action: AuthAction): AuthState{
     switch (action.type){
         case AuthActEnum.SET_AUTH:
             return {...state, isAuth: action.payload, isLoading: false}
         case AuthActEnum.SET_ERROR:
             return {...state, error: action.payload, isLoading: false}
         case AuthActEnum.SET_IS_LOADING:
              return {...state, isLoading: action.payload}
         case AuthActEnum.SET_USER:
             return {...state, user: action.payload}
         default:
             return state
     }
}