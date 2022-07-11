import React, {useEffect} from 'react';
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {store} from "./store";
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import Navbar from "./components/Navbar";
import {useAuthActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

function App() {
    const {setUser, setIsAuth} = useAuthActions()
    useEffect(() => {
        if(localStorage.getItem('isAuth')){
            setUser({username: localStorage.getItem('username') || '' } as IUser)
            setIsAuth(true)
        }
    }, []);

    return (

              <Layout>
                  <Navbar/>
                  <AppRouter/>
              </Layout>


  );
}

export default App;
