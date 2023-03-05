import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

const client = new FastAPIClient(config);

const Login = () => {
  const [error, setError] = useState({username: "", password: ""});
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onLogin = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true)

    if(loginForm.username.length <= 0)
    {
      setLoading(false)
      return setError({username: "Вкажіть ім'я для входу в систему"}) 
    }
    if(loginForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Вкажіть пароль"})
    }

    client.login(loginForm.username, loginForm.password)
      .then( () => {
        navigate('/')
      })
      .catch( (err) => {
        setLoading(false)
        setError(true);
        console.err(err)
      });
  }


  return (
      <>
      <section className="bg-black ">
        <DashboardHeader />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-left ">
            <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 shadow-lg">  
              <header>
                {/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
                <div className="flex items-center justify-center h-24 w-24 mx-auto mb-5 rounded-full ">
		<img src="/images/modlogo.svg" />
                </div>
              </header>
              <form onSubmit={(e) => onLogin(e)}>
                <FormInput 
                  type={"text"}
                  name={"username"}
                  label={"Ім'я"}
                  error={error.username}
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value })}
                />
                <FormInput 
                  type={"password"}
                  name={"password"}
                  label={"Пароль"}
                  error={error.password}
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}
                />
                <Button 
                  title={"Вхід"}  
                  loading={loading}
                  error={error.password}
                  />
              </form>
              <footer>
                <Link className="text-teal-700 hover:text-blue-900 text-sm float-right" to="/sign-up">Зареєструватися</Link>
              </footer> 
            </div>
          </div>
      </section>
    </>
  )
}

export default Login;
