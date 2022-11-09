import React, { useState, useEffect } from 'react';
import classes from './TodoList.module.scss';
import { BsFillPencilFill, BsFillTrashFill, BsSearch } from "react-icons/bs";


const TodoList = () => {
    const todos = JSON.parse(localStorage.getItem('todoItems')) || [];

    const [newFormVisible, setNewFormVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(-1);
    const [todoItems, setTodoItems] = useState(todos);
    const [filteredItems, setFilteredItems] = useState([]);
    const [newTodoInput, setNewTodoInput] = useState('');
    const [searchInput, setSearchInput] = useState('');


    // everytime todo items list is updated
    useEffect(() => {
        // reset filter
        setSearchInput('');
        setFilteredItems([]);
    }, [todoItems])

    const handleNewItem = () => {
        setNewFormVisible(true);
    }

    const handleSave = (e) => {
        if (newTodoInput?.length > 0) {
            setNewFormVisible(false);
            setTodoItems([{
                todoText: newTodoInput,
            }, ...todoItems])
            localStorage.setItem('todoItems', JSON.stringify([{
                todoText: newTodoInput,
            }, ...todoItems]))
            setNewTodoInput('');
        } else {
            e.preventDefault();
        }
    }

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
        setFilteredItems(todoItems.filter((item) => item?.todoText.includes(e.target.value)));
    }

    const handleDelete = (deleteIndex) => {
        let newList = todoItems?.filter((item, index) => index !== deleteIndex);
        setTodoItems([...newList]);
        localStorage.setItem('todoItems', JSON.stringify([...newList]))
    }

    const handleEditIcon = (index) => {
        setEditFormVisible(index);
    }

    const handleEditSave = (e, editItemIndex) => {
        e.preventDefault();

        let newList = todoItems.map((item, idx) => {
            if (editItemIndex === idx) {
                item.todoText = e.target.editTodo.value;
            }
            return item;
        })

        localStorage.setItem('todoItems', JSON.stringify([...newList]))
        setTodoItems([...newList]);
        setEditFormVisible(-1);
    }

    // show edit form if edit index matches item's index
    const todoItem = (item, index) =>
        editFormVisible === index ?
            editForm(item, index)
            :
            (
                <div key={index} className={classes.todoItem}>
                    <span>{item?.todoText}</span>
                    <div className={classes.todoItemActions}>
                        <button onClick={() => handleEditIcon(index)}><BsFillPencilFill /></button>
                        <button onClick={() => handleDelete(index)}><BsFillTrashFill /></button>
                    </div>
                </div>
            )

    const editForm = (item, index) => (
        <form key={index} id='editTodo' className={classes.editTodoItem} onSubmit={(e) => handleEditSave(e, index)}>
            <div className={classes.editInputContainer}>
                <input
                    type='text'
                    name='editTodo'
                    placeholder='Workout'
                    minLength={1}
                    maxLength={25}
                    defaultValue={item?.todoText}
                />
            </div>
            <button className={classes.saveBtn} type='submit' form='editTodo'>Save</button>
        </form>
    )

    return (
        <div className={classes.container}>
            <div className={classes.headingActions}>
                <div className={classes.searchInputContainer}>
                    <BsSearch className={classes.searchIcon} />
                    <input
                        type='search'
                        placeholder='search'
                        onChange={(e) => handleSearch(e)}
                        value={searchInput}
                    />
                </div>
                <button className={classes.newBtn} onClick={handleNewItem}>New</button>
            </div>
            <div className={classes.todoList}>
                {newFormVisible && (
                    <form id='newTodo' className={classes.newTodoItem} onSubmit={(e) => handleSave(e)}>
                        <input
                            type='text'
                            name='newTodo'
                            placeholder='Workout'
                            minLength={1}
                            maxLength={25}
                            onChange={(e) => setNewTodoInput(e.target.value)}
                            value={newTodoInput}
                        />
                        <button className={classes.saveBtn} type='submit' form='newTodo'>Save</button>
                    </form>
                )}
                {searchInput?.length ? filteredItems.map((item, index) =>
                    todoItem(item, index)
                )
                    :
                    todos.map((item, index) => todoItem(item, index))
                }
            </div>
        </div>
    )
}

export default TodoList;