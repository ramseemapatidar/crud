import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query'

const addNewData = async ({ first_name, last_name, email }) => {
	try {
		const { data } = await axios.post('http://localhost/react/api/action.php');
		return data;
	} catch (error) {
		throw Error('data not fetching');
	}

}
export const Add = () => {
	let navigate = useNavigate();

	const queryClient = useQueryClient()
	const [user, setUser] = useState({
		first_name : '',
		last_name : '',
		email : ''
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({
			...user,
			[name] : value
		});
	};

	// const handleSubmit = (event) => {

	// 	event.preventDefault();
	// 	mutate(user)
		
	// };



	
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', e.target.elements.image.files[0]);
		for (const key in user) {
			if (Object.hasOwnProperty.call(user, key)) {
			  formData.append(key, user[key]);
			}
		  }
		mutate(formData)
		
	  };

	const { mutate } = useMutation({ 
		mutationFn: (newTodo) => 
			axios.post('http://localhost/react/api/action.php', newTodo),
			onSuccess:async()=>{
				
				navigate("/");
			},
			onError:async(error)=>{
				console.log(error.message);
				
			},
		
	})

	return (
		<div className="card">
				<div className="card-header">
					<div className="row">
						<div className="col-md-6">Add User</div>
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
									<input type="text" name="first_name" className="form-control" onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label>Last Name</label>
									<input type="text" name="last_name" className="form-control" onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label>Email</label>
									<input type="email" name="email" className="form-control" onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label>File</label>
									<input type="file" name="image" />
								</div>
								<div className="mb-3">
									<input type="submit" className="btn btn-primary" value="Add" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
	  )
	}

