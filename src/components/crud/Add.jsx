import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation,useQueryClient } from '@tanstack/react-query'

const addNewData = async({ first_name, last_name,email }) =>{
    try {
        const  { data } = await axios.post('http://localhost/react/api/action.php');
        return data;
    } catch (error) {
        throw Error('data not fetching');
    }
    
}
export const Add = () => {
    let navigate = useNavigate();

	const queryClient = useQueryClient()

	// Mutations
	const mutation = useMutation({
		mutationFn: addNewData,
		onSuccess: () => {
		  // Invalidate and refetch
		  queryClient.invalidateQueries({ queryKey: ['addData'] })
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
						
							<div className="mb-3">
								<label>First Name</label>
								<input type="text" name="first_name" className="form-control"  />
							</div>
							<div className="mb-3">
								<label>Last Name</label>
								<input type="text" name="last_name" className="form-control"  />
							</div>
							<div className="mb-3">
								<label>Email</label>
								<input type="email" name="email" className="form-control"  />
							</div>
							<div className="mb-3">
								
		<button
		className="btn btn-primary"
        onClick={() => {
          mutation.mutate({
            first_name: 'test',
            last_name: 'Do Laundry',
			email:'test@gmail.com'
          })
        }}
      >
        Add Todo
      </button>
							</div>
						
					</div>
				</div>
			</div>
		</div>
  )
}
