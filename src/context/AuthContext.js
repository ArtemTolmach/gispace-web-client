import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [is_superuser, setSuperUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    let [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  let loginUser = async (data) => {
    let response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': data.username, 'password': data.password })
    });
    let result = await response.json();

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

  let registerUser = async (data)=> {
    let response = await fetch('http://127.0.0.1:8000/register', {
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

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        setSuperUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
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

  let contextData = {
    user: user,
    is_superuser: is_superuser,
    authTokens:authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  };

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
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
