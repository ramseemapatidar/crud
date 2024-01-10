import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

const getData = async() =>{
    try {
        const  { data } = await axios.get('http://localhost/react/api/action.php');
        return data;
    } catch (error) {
        throw Error('data not fetching');
    }
    
}
export const Userlist = () => {
    const [users, setUsers] = useState([]);
	const query = useQuery({ queryKey: ['Userlist'], queryFn: getData })
    const handleDelete = (user_id) => {
		if(confirm("Are your sure you want to remove it?"))
		{
            axios.delete(`http://localhost/react/api/action.php?id=${user_id}`)
            .then(() => {
                setUsers((prevUser) => prevUser.filter((user) => user.id !== user_id));
            });
		}
	};
  return (
    <div className="card">
			<div className="card-header">
				<div className="row">
					<div className="col-md-6"><b>User Data</b></div>
					<div className="col-md-6">
                    <Link to="/add" className="btn btn-success btn-sm float-end">Add</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
					
					{query.data?.map((user) => (
						<tr key={user.id}>
							<td>{user.first_name}</td>
							<td>{user.last_name}</td>
							<td>{user.email}</td>
							<td>
                            <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">Edit</Link>
							<button type="button" onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</div>
  )
}
