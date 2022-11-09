import React from 'react';
import classes from './TodoListPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '../../components';

export default function TodoListPage() {
  let navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <h1>My To-Do List</h1>
        <div className={classes.logoutBtnContainer}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <TodoList/>
    </div>
  )
}

