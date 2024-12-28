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
                <div key={todo._id}>
                    <h1 style={{ padding: 0, margin: "0" }}>{todo.title}</h1>
                    <h2 style={{ padding: "0", margin: "0" }}>{todo.description}</h2>
                    <button style={{ marginBottom: "20px" }} onClick={()=>{
                        setTodos(function(prevTodos){
                            return prevTodos.map(item =>{
                                if(item._id === todo._id){
                                    return{...item, completed:true}
                                }
                                else{
                                    return item
                                }
                            })
                        })
                        fetch(`http://localhost:3000/donetodos`,{
                            method:"PUT",
                            body:JSON.stringify({
                                id:todo._id
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(async (res) => {
                            const data = await res.json();
                            if(data.msg === "updated successfully"){
                                alert(data.msg);
                            }
                        })
                    }}>
                    {todo.completed ? "completed" : "mark as done"}
                    </button>
                </div>
            ))}
        </div>
    );
}