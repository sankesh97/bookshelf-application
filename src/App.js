import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Pages/Main';
import Library from './Pages/Library';

function App() {
  return (
    <div className='container-fluid'>
      <div className='text-center m-3'>
        <h1>Bookshelf Application</h1>
        <hr />
      </div>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/search' element={<Library />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
