import React from "react";
import './App.css'
// import './index.css'
class App extends React.Component {

  todoArray = 
  [
    "TODO1",
    "TODO2",
    "TODO3"
  ]
  addTodo()
  {
    console.log("Add to-do is called")
    let todoText = document.getElementById("addTodo").value 
    console.log("TodoText: ", todoText)
    this.todoArray.push(todoText)
    console.log("TODO Array: ", this.todoArray)

  }

render()
{
  return (
    <div>
      <label id='headingTodo'>Add to do</label><br/><br/>
      <p style={{marginTop: "20%"}}>No To-Do Added yet</p>
      <input type='text' id='addTodo'/>
      <button id='AddTodoButton' onClick={()=>{this.addTodo()}}>Add to-do +</button>
      <ol id='todoList'>
      </ol>
    </div>
  );
}

}

export default App;
