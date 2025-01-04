import { useState, useEffect } from "react";

export function Todos({ todos }) {

    const [allTodo, setTodos] = useState([]);

    useEffect(() => {
        if (todos && Array.isArray(todos)) {
            setTodos(todos);
        }
    },[todos]);

    if (!todos || !Array.isArray(todos)) {
        return <div>No todos available</div>;
    }

    return (
        <div>
            {allTodo.map((todo) => (
                <div key={todo._id} style={{ backgroundColor: "lightblue", margin: "10px", padding: "10px" , width:"fit-content" , borderRadius:"6px"}}>
                    <h1 style={{ padding: 0, margin: "0" }}>{todo.title}</h1>
                    <h2 style={{ padding: "0", margin: "0" }}>{todo.description}</h2>
                    <button style={{ marginBottom: "10px" }} onClick={async () => {
                        const res = await fetch(`http://localhost:3000/donetodos`,{
                            method:"PUT",
                            body:JSON.stringify({
                                id:todo._id
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        const data = await res.json()
                        if (todo.completed) {
                            if (data.msg === "updated successfully") {
                                alert(data.msg)
                                setTodos(function (prevTodos) {
                                    return prevTodos.map(item => {
                                        if (item._id === todo._id) {
                                            return { ...item, completed: false }
                                        }
                                        else {
                                            return item
                                        }
                                    })
                                })
                            }
                        } else {
                            if (data.msg === "updated successfully") {
                                alert(data.msg)
                                setTodos(function (prevTodos) {
                                    return prevTodos.map(item => {
                                        if (item._id === todo._id) {
                                            return { ...item, completed: true }
                                        }
                                        else {
                                            return item
                                        }
                                    })
                                })
                            }
                        }

                    }}>
                    {todo.completed ? "completed" : "mark as done"}
                    </button>
                    <button style={{ margin: "10px" , textDecoration:"none"}} onClick={async () => {
                        const res = await fetch(`http://localhost:3000/deletetodos`,{
                            method:"DELETE",
                            body:JSON.stringify({
                                id:todo._id
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        const data = await res.json()
                        if(data.msg === "deleted successfully"){
                            alert(data.msg)
                            setTodos(function(prevTodos){
                                return prevTodos.filter(item => item._id !== todo._id)
                            })
                        }
                    }}>
                    delete
                    </button>
                </div>
            ))}
        </div>
    );
}

