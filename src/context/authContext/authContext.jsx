import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

import { BACKEND_HOST } from '@Utils/exportDataFromEnv/exportDataFromEnv';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    const [is_superuser, setSuperUser] = useState(() => user ? user.is_superuser : null);

    const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = async (data) => {
    const response = await fetch(`${BACKEND_HOST}/api/token/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': data.username, 'password': data.password })
    });
    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
        setAuthTokens(result);
        setUser(jwtDecode(result.access));
        setSuperUser(jwtDecode(result.access).is_superuser);
        localStorage.setItem('authTokens', JSON.stringify(result));
        navigate('/');
    } else {
        alert('Что-то пошло не так!');
    }
  };

  const registerUser = async (data)=> {
    const response = await fetch(`${BACKEND_HOST}/api/register`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username :data.username,
            email :data.email,
            password :data.password
        })
    })
    
    if(response.status === 200){
        navigate('/login/')
    }else{
        alert('Что-то пошло не так!');
    }
  }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setSuperUser(null)
        localStorage.removeItem('authTokens')
    }

    const updateToken = async ()=> {

        const response = await fetch(`${BACKEND_HOST}/api/token/refresh/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })

        const data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            setSuperUser(jwtDecode(data.access).is_superuser)
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

   const contextData = {
    user,
    is_superuser,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
  };

    useEffect(()=> {

        if(loading && authTokens ) updateToken()

        const fourMinutes = 1000 * 60 * 4

        const interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
