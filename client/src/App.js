import './App.css';
import Layout from './components/Layout';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'
import Page404 from './pages/Page404.jsx'
import Register from './pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Private from './components/Routes/Private';
import Dashboard from './pages/Dashboard';
import ResetAuth from './pages/Auth/ResetAuth';
import Adminroute from './components/Routes/Adminroute';
import Admindashboard from './pages/Admindashboard';
import Updateproduct from './pages/Updateproduct';
function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Private/>}>
          <Route path="user" element={<Dashboard/>}></Route>
        </Route>
        <Route path='/dashboard' element={<Adminroute/>}>
          <Route path="admin" element={<Admindashboard/>}></Route>
          <Route path="update/:slug" element={<Updateproduct/>}></Route>
          
        </Route>
        <Route path='/reset' element={<ResetAuth/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Page404/>} />
      </Routes>
    </BrowserRouter>
    
   </>
  );
}

export default App;
