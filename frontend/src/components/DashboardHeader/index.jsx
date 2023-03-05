import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FastAPIClient from '../../client';
import config from '../../config';
import jwtDecode from "jwt-decode";
import * as moment from "moment";

const client = new FastAPIClient(config);

function DashboardHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // STATE WHICH WE WILL USE TO TOGGLE THE MENU ON HAMBURGER BUTTON PRESS
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const tokenString = localStorage.getItem("token")
	if (tokenString) {
        const token = JSON.parse(tokenString)
        const decodedAccessToken = jwtDecode(token.access_token)
        if(moment.unix(decodedAccessToken.exp).toDate() > new Date()){
            setIsLoggedIn(true)
        }
    }
  }, [])

  const handleLogout = () => {
    client.logout();
    setIsLoggedIn(false)
    navigate('/login')
  }

  const handleLogin = () => {
    navigate("/login");
  }

  let displayButton;
  const buttonStyle = "inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"

  if (isLoggedIn) {
  const username=JSON.parse(localStorage.user).username
  return (
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-1">
        <div className="block lg:hidden">
        <button
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            onClick={() => setToggleMenu(!toggleMenu)}>
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
        </button>
        </div>
        <div className={`animate-fade-in-down w-full ${toggleMenu ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>
	    <span>{username}</span>
        </div>

        <div className={`animate-fade-in-down w-full ${toggleMenu ? "block" : "hidden"} flex-grow lg:flex lg:items-center lg:w-auto`}>
            <div className="text-sm lg:flex-grow">
		<Link to="/personal"
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    Персонал
                </Link>
		<Link to="/communication"
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    Зв'язок
                </Link>
		<Link to="/admin/dashboard"
                    className="block lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-4">
                    Адміністрування
                </Link>
            </div>
            <div>
              <button className={buttonStyle} onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
      </nav>
  );

    } else {
  return ( <> </>  );

    }

}

export default DashboardHeader;
