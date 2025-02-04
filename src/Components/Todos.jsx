import { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';


export default function Todos() {
    const [ todos , setTodos ] = useState([
        {
            id:uuidv4(),
            title : 'go to school and read books',
            status: false
        },
        {
            id:uuidv4(),
            title : 'go to gym at 17:00',
            status : true
        }
    ]);
    const [ newTodoTitle , setNewTodoTitle ] = useState("");
    const UpdateTodos = (state)=>{
        let deletestate=[]
        deletestate = todos.filter((item)=>item.id!==state)
        setTodos(deletestate)
    }
    // console.log(todos)
    const ChangeStatus=(changeStaus)=>{
        let TodosChangesStatus=todos.map((todoItem)=>{
            if(changeStaus.id===todoItem.id){
                todoItem.status=!todoItem.status
            }
            return todoItem
        })
        setTodos(TodosChangesStatus);
    }
    const editTodoTitleHandler=(todo,newTitle)=>{
        let newTodos=todos.map((todoItem)=>{
            if(todoItem.id===todo.id){
                todoItem.title=newTitle;
            }
            return todoItem
        })
        setTodos(newTodos);
    }



    const onInputNewTodoChangeHandler = (event) => {
        setNewTodoTitle(event.target.value)

    }

    const addNewTodoHandler = (event) => {
        if( event.key === 'Enter' && newTodoTitle !== ""){
            setTodos([
                ...todos,
                {
                    id:uuidv4(),
                    title : newTodoTitle,
                    status : false,
                }
            ])

            setNewTodoTitle("");

            }

    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <input id="todoInput" type="text" placeholder="What needs to be done today?"
                        onChange={onInputNewTodoChangeHandler}
                        onKeyDown={addNewTodoHandler}
                        value={newTodoTitle}
                        className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                </div>
                <TodoList todos={todos} update={UpdateTodos} changeStatus={ChangeStatus} editTodo={editTodoTitleHandler} />
            </div>
        </div>
    )
}
