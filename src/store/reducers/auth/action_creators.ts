import {AuthActEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import { Dispatch } from 'redux'
import axios from "axios";

export const AuthActionCreators={
    setUser: (user: IUser): SetUserAction =>({
        type: AuthActEnum.SET_USER, payload: user
    }),
    setIsAuth: (auth: boolean): SetAuthAction =>({
        type: AuthActEnum.SET_AUTH, payload: auth
    }),
    setIsLoading: (isLoading: boolean): SetIsLoadingAction =>({
        type: AuthActEnum.SET_IS_LOADING, payload: isLoading
    }),
    setError: (error: string): SetErrorAction =>({
        type: AuthActEnum.SET_ERROR, payload: error
    }),
    login: (username: string, password: string) => async (dispatch: Dispatch)=> {
        try{
              dispatch(AuthActionCreators.setIsLoading(true))
              const response = await axios.get<IUser[]>('./user.json')
              const user = response.data.find(user => user.username == username && user.password == password)
              if(user){
                  localStorage.setItem('isAuth', 'true' )
                  localStorage.setItem('username', user.username)
                  dispatch(AuthActionCreators.setUser(user))
                  dispatch(AuthActionCreators.setIsAuth(true))

              } else {
                  dispatch(AuthActionCreators.setError('login Error'))
              }
            dispatch(AuthActionCreators.setIsLoading(false))

        }catch(e){
              dispatch(AuthActionCreators.setError('Error'))
        }
    },
    logout: () => async (dispatch: Dispatch)=> {
        try {
            localStorage.removeItem('username')
            localStorage.removeItem('isAuth')
            dispatch(AuthActionCreators.setIsAuth(false))
            dispatch(AuthActionCreators.setUser({} as IUser))




        } catch (e) {

        }
    }
}