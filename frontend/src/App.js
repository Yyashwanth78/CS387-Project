import './App.css';
import {BrowserRouter , Route ,Routes} from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Select from './components/select';
import Clogin from './components/company_login';
import Chome from './components/company_home';
import Merge from './components/merge';
import Remove_multi from './components/remove_multi';
import Remove_single from './components/remove_single';
import Add from './components/add';
import Book_single from './components/book_single';
import Book_multi from './components/book_multi';

function App() {
  
  return (
    <div className="App">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/home/:date/:arrival/:departure' element={<Home/>}/>
              <Route path='/select' element={<Select/>}/>
              <Route path='/clogin' element={<Clogin/>}/>
              <Route path='/chome/:date' element ={<Chome/>}/>
              <Route path='/merge/:sid1/:sid2' element={<Merge/>}/>
              <Route path='/remove_multi/:sid1/:sid2' element={<Remove_multi/>}/>
              <Route path='/remove_single/:sid' element={<Remove_single/>}/>
              <Route path='/add' element={<Add/>}/>
              <Route path='/book_single/:sid' element={<Book_single/>}/>
              <Route path='/book_multi/:sid1/:sid2' element={<Book_multi/>}/>
            </Routes>
          </BrowserRouter>
        </div>
    </div>
    
  );
}
  
export default App;