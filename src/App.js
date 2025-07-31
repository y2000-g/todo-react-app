import React from "react";
import './App.css'
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import deleteIcon from "./delete.png"
import EditIcon from "./edit.png"
class App extends React.Component {

  INCOMPLETE = "Incomplete"
  COMPLETE = "Complete"
  ALL = "All"
  state =
  {
    showModal : false,
    count : 0,
    todoArray : [ ],
    filter : this.ALL,
    filterTodoCount : 0
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
          let tempArray = this.state.todoArray
          tempArray.push({
            id : this.state.count++,
            todo : todoText,
            completed : false
          })
        this.setState({...this.state, todoArray : tempArray, filterTodoCount : tempArray.length})
        }
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
      let todoTempArray = this.state.todoArray.map((todo)=>
      {
          if (todo.id == id)
          {
            todo = 
            {
              id: todo.id,
              todo : todo.todo,
              completed : !todo.completed
            }
          }
          return todo
      })
      this.setState({...this.state, todoArray: todoTempArray})
    }

  filterTodo(filterApplied)
    {
      console.log("FilterTodo: ",filterApplied)

    let filteredTodos = [];

      if (filterApplied === this.INCOMPLETE) 
        {
          filteredTodos = this.state.todoArray.filter(todo => !todo.completed);
        } 
      else if (filterApplied === this.COMPLETE) 
        {
          filteredTodos = this.state.todoArray.filter(todo => todo.completed);
        } 
      else 
        {
          filteredTodos = this.state.todoArray; // ALL
        }

      this.setState({ ...this.state, filter: filterApplied, filterTodoCount: filteredTodos.length});
    }

render()
{
  return (
    <div>
      <label id='headingTodo' >Add to do</label><br/>   
    {
        this.state.todoArray.length > 0 ?
      (
        <div>
          <label style={{marginLeft: "60px"}}>Count To-do : </label>
          <label style={{fontWeight: "bold"}}>{this.state.filterTodoCount}</label>
          <label style={{marginLeft: "30%"}} onClick={()=>{this.filterTodo(this.INCOMPLETE)}}> INCOMPLETE | </label>
          <label onClick={()=>{this.filterTodo(this.COMPLETE)}}> COMPLETE | </label>
          <label onClick={()=>{this.filterTodo(this.ALL)}}> ALL</label> 
          <button style={{textAlign:'right', marginLeft: '200px'}} id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
        </div>
      ) : 
      (
        <div style={{textAlign:'center'}}>
          <p style={{marginTop: "20%"}}>No To-Do Added yet</p>
          <button id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
        </div>
      ) 
    }

      <ul id='todoList'>
        { 
          this.state.todoArray.map((todo)=>
            {
                console.log("List show")
              
              if(this.state.filter == this.completed)
                {
                  if(todo.completed)
                  {
                    this.setState({...this.state, filterTodoCount : this.state.filterTodoCount++})
                    // this.filterTodoCount = this.state.todoArray.filter(todo => todo.completed).length
                    return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/><s>{todo.todo}</s><button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>
                  }
                }
              else if(this.state.filter == this.INCOMPLETE)
                {
                  if(!todo.completed)
                  {
                    this.filterTodoCount = this.state.todoArray.filter(todo => !todo.completed).length
                    console.log("TODO INCOMPLETED")
                    return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/>{todo.todo}<button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>
                  }
                }
              else
                {
                  if(todo.completed)
                  {
                    this.filterTodoCount = this.state.todoArray.length
                    console.log("TODO ALL")
                    return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/><s>{todo.todo}</s><button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>
                  }   
                  else
                    this.filterTodoCount = this.state.todoArray.length
                    return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/>{todo.todo}<button id="editingTodo" onClick={this.editTodo}>Edit</button><button onClick={this.deleteTodo} id="DeleteTodo">Delete</button></li>          
                }
            
            })
        }
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
          <Modal.Title>Edit To-Do</Modal.Title>
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
      {/* <img src="C:\Users\hp\Documents\Todo-react app\todo-react-app\src\edit.png"/> */}
      </div> 

        
  );
}

}

export default App;
