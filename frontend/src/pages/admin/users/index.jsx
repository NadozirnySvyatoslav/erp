import React, { useEffect, useState } from "react";
import UsersClient from "../../../data/users";
import config from "../../../config";
import DashboardHeader from "../../../components/DashboardHeader";
import Footer from "../../../components/Footer";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import FormInput from "../../../components/FormInput/FormInput";
import FormTextarea from "../../../components/FormInput/FormTextarea";
import Button from "../../../components/Button/Button";
import { NotLoggedIn } from "../../error-page/NotLoggedIn";
import Loader from "../../../components/Loader";
import PopupModal from "../../../components/Modal/PopupModal";
import UsersTable from './UsersTable'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form';

const client = new UsersClient(config);



const UsersPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [error, setError] = useState({ label: "", url: "", source: "" });
	const [userForm, setUserForm] = useState({
		id: 0,
		name: "",
		username: "",
		description: "",
		password: "",

	});

	const [showCreateForm, setShowCreateForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [users, setUsers] = useState([]);
	const [userGroups, setUserGroups] = useState([]);
	const [groups, setGroups] = useState([]);

	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = () => {
    client.getGroups().then((data)=>{
  		setGroups(data?.results)
    });
		client.getUsers().then((data) => {
			setRefreshing(false);
			setUsers(data?.results);

		});

	};

	const CreateUserForm = () => {
        return (
                <>
                <PopupModal
                    show={showCreateForm}
                    modalTitle={"Створити користувача"}
                    handleClose={() => {
                        setShowCreateForm(false);
                        setError({ name: "", password: "", description: "" });
                    }}
                >
                    <div className="mt-4 text-left" >
                        <form className="mt-5" onSubmit={(e) => onCreateUser(e)}>
		  <FormInput
                    type={"text"}
                    name={"name"}
                    label={"Ім'я для входу в систему"}
                    error={error.name}
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value })}
                  />
                  <FormInput
                    type={"password"}
                    name={"password"}
                    label={"Пароль"}
                    error={error.password}
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value })}
                  />
                  <FormTextarea
                    name={"description"}
                    label={"Додаткові дані"}
                    error={error.description}
                    value={userForm.description}
                    placeholder={"Підрозділ, в/ч, звання, прізвище ім'я, по-батькові, контактні телефони"}
                    onChange={(e) => setUserForm({...userForm, description: e.target.value })}
                  />
                        <Button
                                loading={loading}
                                error={error.source}
                                title={"Створити"}
                            />
                        </form>
                    </div>
                </PopupModal>


                </>
        );
    };

	const EditUserForm = () => {
        return (
                <>
                <PopupModal
                    size="xl"
                    show={showEditForm}
                    modalTitle={"Редагувати користувача"}
                    handleClose={() => {
                        setShowEditForm(false);
                        setError({ name: "", password: "", description: "" });
                    }}
                >
              <Tabs defaultActiveKey="profile" id="user-tabs">
                 <Tab eventKey="profile" title="Загальне">
                    <div className="text-left  pt-2">
                        <form onSubmit={(e) => onUpdateUser(e)}>
		  <FormInput
                    type={"text"}
                    name={"name"}
                    label={"Ім'я для входу в систему"}
                    error={error.name}
                    value={userForm.name}
                    onChange={(e) => setUserForm({...userForm, name: e.target.value })}
                  />
                  <FormInput
                    type={"username"}
                    name={"username"}
                    label={"Ім'я користувача"}
                    error={error.username}
                    value={userForm.username}
                    onChange={(e) => setUserForm({...userForm, username: e.target.value })}
                  />
                  <FormTextarea
                    name={"description"}
                    label={"Додаткові дані"}
                    error={error.description}
                    value={userForm.description}
                    placeholder={"Підрозділ, в/ч, звання, прізвище ім'я, по-батькові, контактні телефони"}
                    onChange={(e) => setUserForm({...userForm, description: e.target.value })}
                  />
                        <Button
                                loading={loading}
                                error={error.source}
                                title={"Зберегти"}
                            />
                        </form>
                    </div>
                 </Tab>
                 <Tab eventKey="groups" title="Групи користувачів">
                    <div className=" text-left pt-2"  >
                        <form onSubmit={(e) => onUpdateUserGroups(e)}>
                           <ListGroup>{groups.map( (g)=>{ return <ListGroup.Item key={g.id}><Form.Check type="checkbox" label={g.name} /></ListGroup.Item>  }  )}
                           </ListGroup>
                        <Button
                                loading={loading}
                                error={error.source}
                                title={"Зберегти"}
                            />
                        </form>
                    </div>
                 </Tab>
                </Tabs>
                </PopupModal>
                </>
        );
    };


	const onCreateUser = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		if (userForm.name.length <= 0) {
			setLoading(false);
			return setError({ name: "Please Enter user name" });
		}
		if (userForm.password.length <= 0) {
			setLoading(false);
			return setError({ password: "Please Enter user Password" });
		}

		client.fetchUser().then((user) => {
			client
				.createUser({
					name: userForm.name,
					password: userForm.password,
					description: userForm.description,
				})
				// eslint-disable-next-line no-unused-vars
				.then((data) => {  // eslint:ignore
					fetchUsers();
					setLoading(false);
					setShowCreateForm(false);
					setUserForm({
		name: "",
		username: "",
		description: "",
		password: "",
	});
				});
		});
	};

	const updateEditForm= async (user_id) =>{
    const user=await client.getUser(user_id)
		setUserForm( user)
		setShowEditForm(true);

	    
	}




	const onUpdateUserGroups = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		client.updateUser(userForm.id, {
					name: userForm.name,
					username: userForm.username,
					description: userForm.description,
				})
				// eslint-disable-next-line no-unused-vars
				.then((data) => {  // eslint:ignore
					fetchUsers();
					setLoading(false);
					setShowEditForm(false);
					setUserForm({
		name: "",
		username: "",
		description: "",
		password: "",
	});
				});
	};


	const onUpdateUser = (e) => {
		e.preventDefault();
		setLoading(true);
		setError(false);

		if (userForm.name.length <= 0) {
			setLoading(false);
			return setError({ name: "Please Enter user name" });
		}
		if (userForm.username.length <= 0) {
			setLoading(false);
			return setError({ password: "Please Enter user full name" });
		}

		client.updateUser(userForm.id, {
					name: userForm.name,
					username: userForm.username,
					description: userForm.description,
				})
				// eslint-disable-next-line no-unused-vars
				.then((data) => {  // eslint:ignore
					fetchUsers();
					setLoading(false);
					setShowEditForm(false);
					setUserForm({
		name: "",
		username: "",
		description: "",
		password: "",
	});
				});
	};

	useEffect(() => {
		const tokenString = localStorage.getItem("token");
		if (tokenString) {
			const token = JSON.parse(tokenString);
			const decodedAccessToken = jwtDecode(token.access_token);
			if (moment.unix(decodedAccessToken.exp).toDate() > new Date()) {
				setIsLoggedIn(true);
			}
		}
	}, []);
	const onEdit=(event) => {
	}

	if (refreshing) return !isLoggedIn ? <NotLoggedIn /> : <Loader />;

	return (
		<>
			<section
				className="flex flex-col text-justify"
				style={{ minHeight: "100vh" }}
			>
				<DashboardHeader />
				<div className="container px-5 pt-6 mx-auto lg:px-20">

<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Користувачі</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {setShowCreateForm(!showCreateForm);}}>Добавити</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Експорт</button>
            <input  type="text" className="btn btn-outline-secondary" placeholder="Пошук..."/>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar align-text-bottom" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Фільтр
          </button>
        </div>
      </div>

					<div className="mainViewport">
						{users.length && (
							<UsersTable users={users} onEdit={updateEditForm}/>
						)}
					</div>
				</div>
				<Footer />
			</section>
			{showCreateForm && ( CreateUserForm() )}
			{showEditForm && ( EditUserForm() )}
		</>
	);
};

export default UsersPage;
