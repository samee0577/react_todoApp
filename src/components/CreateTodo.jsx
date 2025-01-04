import { useState } from "react"

export function CreateTodo({ onNewTodo }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const createTodoHandle = async () => {
        const response = await fetch("http://localhost:3000/createtodos", {
            method: "POST",
            body: JSON.stringify({
                title,
                description
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.msg === "Todo created successfully") {
            alert(data.msg)
            onNewTodo({ title, description }); // Assuming the backend returns an `id`
            setTitle("");
            setDescription( "");
        }
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", width: "fit-content", gap: "5px", margin: "10px", backgroundColor: "pink", padding: "7px", borderRadius: "6px" }}>
                <h1>ADD TODO</h1>
                <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} />
                <button onClick={createTodoHandle}>create new todo</button>
            </div>
        </div>
    )
}

