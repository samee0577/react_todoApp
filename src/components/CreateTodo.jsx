import { useState } from "react"

export function CreateTodo() {

const [title ,setTitle] = useState("")
const [description ,setDescription] = useState("")

    return (
        <div>
            <h1>ADD TODO</h1>
            <div>
                <input type="text" placeholder="title" onChange={function(e){setTitle(e.target.value)}}/>
                <input type="text" placeholder="description" onChange={function(e){setDescription(e.target.value)}}/>
                <button 
                onClick={function(){
                    fetch("http://localhost:3000/createtodos",{
                        method:"POST",
                        body:JSON.stringify({
                            title,
                            description
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((res) => res.json())
                    .then((data) => {
                        if(data.msg === "Todo created successfully"){
                            alert(data.msg)
                        }  
                    })
                }}
                >create new todo</button>
            </div>

        </div>
    )
}
