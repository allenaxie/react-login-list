import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage';
import TodoListPage from '../TodoListPage/TodoListPage';

function App() {

  return (
    <div className='App'>
     
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/todoList' element={<TodoListPage/>} />
    </Routes>
    </div>
  );
}

export default App;
