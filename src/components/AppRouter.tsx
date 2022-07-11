import React from 'react';
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Event from "../pages/Event";
import {useTypedSelector} from "../hooks/useTypedSelector";


const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.AuthReducer)
    return (
        isAuth?
        <Routes>
            <Route path='/event' element={<Event/>}/>
            <Route path='*' element={<Event/>}/>

            <Route/>
        </Routes>
            :
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='*' element={<Login/>}/>
            </Routes>

    );
};

export default AppRouter;
