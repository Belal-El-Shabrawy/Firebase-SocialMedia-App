import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Main } from "./Pages/Main/Main-Page"
import { Login } from "./Pages/Login"
import { NavBar } from "./Components/NavBar"
import { CreatePost } from "./Pages/CreatePost/CreatePost"
function App() {
  return (
    <>
     <Router>
      <NavBar/> 
      <div className="app-container">
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/CreatePost" element= {<CreatePost/>}></Route>
      </Routes>
      </div>
     </Router>
    </>
  )
}

export default App
