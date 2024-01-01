
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Userlist } from './components/crud/Userlist'
import { Add } from './components/crud/Add'
import { Edit } from './components/crud/Edit'

function App() {


  return (

        <div className="container">
            <h6 className="mt-5 mb-5 text-center"><b>PHP React.js CRUD Application - <span className="text-primary">Create Delete Data API - 8</span></b></h6>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Userlist />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/edit/:user_id" element={<Edit />} />
                </Routes>
            </BrowserRouter>
        </div>
  )
}

export default App
