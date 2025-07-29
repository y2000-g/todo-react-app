import React from "react";
import './App.css'
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {

  state =
  {
    showModal : false,
    todoArray :
      [
        "Todo1",
        "Todo2",
        "Todo3"
      ]
  }
 
  handleShow = () => 
    {
      console.log("HandleShow")
      this.setState({ ...this.state, showModal: true })
      console.log(this.state)
    };
  handleClose = () => 
    {
      console.log("Handle Close");
      this.setState({ ...this.state, showModal: false })
    };

  addTodo()
  {
    console.log("Add to-do is called")
    let todoText = document.getElementById("addTodo").value 
    console.log("TodoText: ", todoText)
    todoText = todoText.trim();
    if(todoText === "")
    {
      alert("To-do text can't be blank")
      return;
    }
    else
    {
      this.state.todoArray.push(todoText)
    }
    // this.state.todoArray.push(todoText)
    console.log("TODO Array: ", this.state.todoArray)
    for(let index=1; index<this.state.todoArray.length; index++)
    {
      let todolistShow = document.getElementById("todoList").value
      console.log("ToDOLIST SHOW: ", todolistShow)
      this.todolistShow = this.state.todoArray[index]; 
    }
    this.handleClose()
  }

render()
{
  return (
    <div>
      <label id='headingTodo' >Add to do</label><br/><br/>
      {
      this.state.todoArray.length > 0 ?
      (<div style={{textAlign:'right', marginRight: '20px'}}>
        <button id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
      </div>) : 
      (<div style={{textAlign:'center'}}>
        <p style={{marginTop: "20%"}}>No To-Do Added yet</p>
        <button id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
      </div>) 
      }

      <ul id='todoList'>
        {this.state.todoArray.map((todo)=>
        {
          return <li><input type="checkbox"/>{todo}</li>
        })}
      </ul>

      {/* Modal Component */}
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalBody'>
          <input className="form-control" type='text' id='addTodo'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{this.addTodo()}}>
            Add
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

}

export default App;
