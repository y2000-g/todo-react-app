import React from "react";
import './App.css'
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends React.Component {

  state =
  {
    showModal : false,
    count : 0,
    todoArray :
      [
        // {
        //   id : count++,
        //   todo : "Todo1",
        //   completed : false
        // }
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
      this.state.todoArray.push({
        id : this.state.count++,
        todo : todoText,
        completed : false
      })
    }
    // this.state.todoArray.push(todoText)
    console.log("TODO Array: ", this.state.todoArray)
    this.handleClose()
  }

  editTodo = ()=>
  {
    console.log("Edit Todo")
  }

  deleteTodo = ()=>
  {
    console.log("Delete Todo")
  }

  saveTodo = ()=>
  {
    console.log("Save Todo")
  }

  completeClickHandler = (id)=>
  {
    console.log("completeClickHandler Clicked!!");
    console.log("Id : ", id)
    let todoTempArray = this.state.todoArray.map((todo)=>{
        if (todo.id == id){
          todo = {
            id: todo.id,
            todo : todo.todo,
            completed : !todo.completed
          }
        }
        return todo
    })
    this.setState({...this.state, todoArray: todoTempArray})
  }
  
render()
{
  return (
    <div>
      <label id='headingTodo' >Add to do</label><br/>
      <label>Count To-do : </label><label style={{fontWeight: "bold", marginLeft:'6px'}}>{this.state.todoArray.length}</label>
      <label style={{ marginLeft:'30%'}}>Incomplete | </label><label> Complete | </label><label> All</label>
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
          if(todo.completed)
          {
            return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/><s>{todo.todo}</s><button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>
          }
          else
          {
            return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/>{todo.todo}<button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>
          }
          
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

      {/* Modal Component */}
      {/* <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To-do</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalBody'>
          <input className="form-control" type='text' id='SaveTodo'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.saveTodo}>
            Save
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    

      {/* Modal Component */}
      {/* <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalBody'>
          <input className="form-control" type='text'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.deleteTodo}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      <button onClick={()=>{console.log(this.state)}}>Test Button</button>
      </div> 

        
  );
}

}

export default App;
