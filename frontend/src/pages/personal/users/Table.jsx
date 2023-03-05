const Table = ({ users, onEdit }) => {
        return (
                <>
        <table className="table table-responsive">
                <thead>
                <tr><th>№</th><th>Ім'я входу в систему</th><th>Прізвище, Ім'я</th><th>Опис</th></tr>
                </thead>
                <tbody>
          {users.length && (
              users.map((user) => (
                <tr key={user?.id}>
		    <td><a href='' onClick={(e)=>{ e.preventDefault(); onEdit(user.id)}}>{user?.id}</a></td>
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
                        </table>
                </>
        );
};


export default Table;