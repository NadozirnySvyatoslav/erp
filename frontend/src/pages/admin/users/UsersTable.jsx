import Table from 'react-bootstrap/Table';

const UsersTable = ({ users, onEdit }) => {
        return (
                <>
        <Table striped bordered hover>
                <thead>
                <tr><th>№</th><th>Ім'я входу в систему</th><th>Прізвище, Ім'я</th><th>Опис</th></tr>
                </thead>
                <tbody>
          {users.length && (
              users.map((user) => (
                <tr key={user?.id} onClick={(e)=>{ e.preventDefault(); onEdit(user.id)}} className="pointer">
		    <td><a href='' >{user?.id}</a></td>
		    <td>{user?.name}</td>
		    <td>{user?.username}</td>
		    <td>{user?.description}</td>
		</tr>
              ))
          )}
          {!users.length && (
              <p>Немає даних</p>
          )}
                </tbody>
                        </Table>
                </>
        );
};


export default UsersTable;