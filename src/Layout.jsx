import React, {useEffect, useState} from 'react';
import './layout.css'
import {Link, Outlet, redirect, useNavigate} from "react-router-dom";



const Layout = () => {

    console.log(window.location.href)

    return (
        <div>


            <main>
                <Outlet/>
            </main>


        </div>

    );
};

export default Layout;




