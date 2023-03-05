import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import FormTextarea from '../../components/FormInput/FormTextarea';

const client = new FastAPIClient(config);

const SignUp = () => {
  const [error, setError] = useState({ name: '', password: '', description: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', password: '', description: '' });
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    setError(false);

    if(registerForm.name.length <= 0)
    {
      setLoading(false)
      return setError({name: "Вкажіть ім'я"}) 
    }
    if(registerForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Вкажіть пароль"})
    }

    client.register(registerForm.name, registerForm.password, registerForm.description)
      .then( () => {
        navigate('/login')
      })
      .catch( (err) => {
        setLoading(false)
        setError(true);
        alert(err)
      });
  }

  return (
      <>
      <section className="bg-black ">
        <DashboardHeader />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-left ">
            <div className="w-full max-w-sm m-auto bg-indigo-100 rounded p-5 shadow-lg">  
              <header>
                {/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-teal-500 rounded-full ">
                <svg className=" h-8 w-8" width="54" height="54" viewBox="0 0 54 54" fill='white'  xmlns="http://www.w3.org/2000/svg" >
                  <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
                </svg>
                </div>
              </header>
              <form onSubmit={(e) => onRegister(e)}>
                  <FormInput 
                    type={"text"} 
                    name={"name"} 
                    label={"Ім'я для входу в систему"}
                    error={error.name} 
                    value={registerForm.name} 
                    onChange={(e) => setRegisterForm({...registerForm, name: e.target.value })}
                  />
                  <FormInput 
                    type={"password"} 
                    name={"password"} 
                    label={"Пароль"} 
                    error={error.password}
                    value={registerForm.password} 
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value })} 
                  />
                  <FormTextarea 
                    name={"description"} 
                    label={"Додаткові дані"} 
                    error={error.description}
                    value={registerForm.description}
                    placeholder={"Підрозділ, в/ч, звання, прізвище ім'я, по-батькові, контактні телефони"}
                    onChange={(e) => setRegisterForm({...registerForm, description: e.target.value })}
                  />
                <Button title={"Зареєструватися"} error={error.password} loading={loading} />
              </form>
              <footer>
                <Link className="text-teal-700 hover:text-blue-900 text-sm float-right" to="/login">Вже зареєстрований?</Link>
              </footer>
            </div>
          </div>
      </section>
    </>
  )
}

export default SignUp;