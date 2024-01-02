import {useState, useEffect} from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
export const Edit = () =>{

	const navigate = useNavigate();
  const { user_id } = useParams();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

//   const fetchUserData = () => {
//     axios.get(`http://localhost/practice/api/action.php?id=${user_id}`)
//       .then(function (response) {
//         console.log('rr',response);
//         setUser(response.data);
//       })
//       .catch(function (error) {
//         console.error('Error fetching user data', error);
//       });
//   };
const fetchUserData = async () => {
    try {
        const response = await axios.get(`http://localhost/practice/api/action.php?id=${user_id}`);
        setUser(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []); // Include user_id in the dependency array

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost/practice/api/action.php?id=${user_id}`, user)
      .then(function () {
        navigate('/');
      })
      .catch(function (error) {
        console.error('Error updating user data', error);
      });
  };


	return (
		<div className="card">
			<div className="card-header">
				<div className="row">
					<div className="col-md-6">Edit User</div>
					<div className="col-md-6">
						<Link to="/" className="btn btn-success btn-sm float-end">View All</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-md-4">&nbsp;</div>
					<div className="col-md-4">
						<form method="POST" onSubmit={handleSubmit}>
							<div className="mb-3">
								<label>First Name</label>
								<input type="text" name="first_name" className="form-control" value={user.first_name} onChange={handleChange} />
							</div>
							<div className="mb-3">
								<label>Last Name</label>
								<input type="text" name="last_name" className="form-control" value={user.last_name} onChange={handleChange} />
							</div>
							<div className="mb-3">
								<label>Email</label>
								<input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
							</div>
							<div className="mb-3">
								<input type="submit" className="btn btn-primary" value="Edit" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}


