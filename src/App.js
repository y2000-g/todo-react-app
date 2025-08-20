import React from "react";
import './App.css'
import { Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import deleteIcon from "./delete.png"
import EditIcon from "./edit.png"

class App extends React.Component 
{

  INCOMPLETE = "Incomplete"
  COMPLETE = "Complete"
  ALL = "All"
  state =
  {
    showModal : false,
    count : 0,
    todoArray : [ ],
    filter : this.INCOMPLETE,
    filterTodoCount : 0,
    showEditModal: false,
    editingTodo: {},
    showDeleteModal: false
  }

  testFunction()
  {
    let tempArray = this.state.todoArray
      tempArray.push(
      {
        id : this.state.count++,
        todo : "Buy groseries from market",
        completed : false
      })
       tempArray.push(
      {
        id : this.state.count++,
        todo : "Pay Electricity Bill",
        completed : false
      })
       tempArray.push(
      {
        id : this.state.count++,
        todo : "Completing Home Work",
        completed : true
      })
       tempArray.push(
      {
        id : this.state.count++,
        todo : "Make a To-do Application",
        completed : false
      })
         if(this.state.filter == this.ALL)
            {
              this.setState({...this.state, todoArray : tempArray, filterTodoCount: tempArray.length, showModal: false })           
            }
             else 
            {
              let filteredTodos = tempArray.filter((todo) => 
                {
                  switch(this.state.filter)
                  {
                    case this.INCOMPLETE : 
                    {
                      if(todo.completed == false)
                        return true
                      else 
                        return false
                      break;
                    }
                      case this.COMPLETE : 
                    {
                      if(todo.completed == true)
                        return true 
                      else
                        return false
                      break;
                    }
                  }

                });
                this.setState({...this.state, todoArray : tempArray, filterTodoCount: filteredTodos.length, showModal: false })
            }
  }
 
  handleShow = () => 
    {
      this.setState({ ...this.state, showModal: true })
    };
  handleClose = () => 
    {
      this.setState({ ...this.state, showModal: false })
    };

  handleEditShow = (todoId) => 
    {
      let editingTodoObj = (this.state.todoArray.find(({id})=> id == todoId))
      this.setState({ ...this.state, showEditModal: true, editingTodo: editingTodoObj })
    };
  handleEditClose = () => 
    {
      this.setState({ ...this.state, showEditModal: false })
    };

  handleDeleteShow = (todoId) => 
    {
      let todoInputText = (this.state.todoArray.find(({id})=> id == todoId))
      this.setState({ ...this.state, showDeleteModal: true, editingTodo: todoInputText })
    };
  handleDeleteClose = () => 
    {
      this.setState({ ...this.state, showDeleteModal: false })
    };

  addTodo()
  {
    let todoText = document.getElementById("addTodo").value 
    todoText = todoText.trim();
      if(todoText === "")
        {
          alert("To-do text can't be blank")
          return;
        }
      else
        {
          let tempArray = this.state.todoArray
            tempArray.push(
            {
              id : this.state.count++,
              todo : todoText,
              completed : false
            })
            if(this.state.filter == this.ALL)
            {
              this.setState({...this.state, todoArray : tempArray, filterTodoCount: tempArray.length, showModal: false })
            }
            else 
            {
              let filteredTodos = tempArray.filter((todo) => 
                {
                  switch(this.state.filter)
                  {
                    case this.INCOMPLETE : 
                    {
                      if(todo.completed == false)
                        return true
                      else 
                        return false
                      break;
                    }
                      case this.COMPLETE : 
                    {
                      if(todo.completed == true)
                        return true 
                      else
                        return false
                      break;
                    }
                  }

                });
                this.setState({...this.state, todoArray : tempArray, filterTodoCount: filteredTodos.length, showModal: false })
            }
        }
  }

  deleteTodo = ()=>
    {
      let updatedArray = this.state.todoArray.filter((todoObj)=> todoObj.id != this.state.editingTodo.id)
      this.setState({...this.state, todoArray: updatedArray, editingTodo: {}, showDeleteModal: false})
    }

  saveTodo = ()=>
    {
      let savetodoText = document.getElementById("editTodoInput").value 
      savetodoText = savetodoText.trim();
      if(savetodoText === "")
        {
          alert("To-do text can't be blank")
          return;
        }
      else
        {
          const editedTodo = this.state.todoArray.map((todoObj)=> {
            if (todoObj.id == this.state.editingTodo.id)
            {
              todoObj.todo = savetodoText 
            }
            return todoObj
          } )
          this.setState({...this.state, todoArray: editedTodo, editedTodo:{}})
          this.handleEditClose()
        }
    }

  completeClickHandler = (id)=>
    {
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
      if(this.state.filter == this.ALL)
            {
              this.setState({...this.state, todoArray : todoTempArray, filterTodoCount: todoTempArray.length })
            }
            else 
            {
              let filteredTodos = todoTempArray.filter((todo) => 
                {
                  switch(this.state.filter)
                  {
                    case this.INCOMPLETE : 
                    {
                      if(todo.completed == false)
                        return true
                      else 
                        return false
                      break;
                    }
                      case this.COMPLETE : 
                    {
                      if(todo.completed == true)
                        return true 
                      else
                        return false
                      break;
                    }
                  }

                });
                this.setState({...this.state, todoArray : todoTempArray, filterTodoCount: filteredTodos.length, showModal: false })
            }     
    }

  filterTodo(filterApplied)
    {
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
          filteredTodos = this.state.todoArray; 
        }

      this.setState({ ...this.state, filter: filterApplied, filterTodoCount: filteredTodos.length});
    }

render()
{
  return (
    <div>   
    {
        this.state.todoArray.length > 0 ?
      (
        <div>
          <label id='headingTodo1' >To-Do App</label><br/>
          <label style={{marginLeft: "60px"}}>Count To-do : </label>
          <label style={{fontWeight: "bold"}}>{this.state.filterTodoCount}</label>
          <label style={{marginLeft: "28%", fontWeight:'bold', fontStyle:'oblique'}}>Filters :</label>
          <label style={{marginLeft: "10px", fontWeight : this.state.filter === this.INCOMPLETE ? "bold" : "normal"}} onClick={()=>{this.filterTodo(this.INCOMPLETE)}}> Incomplete | </label>
          <label style={{fontWeight : this.state.filter === this.COMPLETE ? "bold" : "normal"}} onClick={()=>{this.filterTodo(this.COMPLETE)}}> &nbsp; Completed | </label> 
          <label style={{fontWeight : this.state.filter === this.ALL ? "bold" : "normal"}} onClick={()=>{this.filterTodo(this.ALL)}}> &nbsp;All</label> 
          <button style={{textAlign:'right', marginLeft: '500px'}} id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
        </div>
      ) : 
      (
        <div style={{textAlign:'center'}}>
          <label id='headingTodo' >To-Do App</label><br/>
          <p style={{marginTop: "20%"}}>No To-Do Added yet</p>
          <button id='AddTodoButton' onClick={()=>{this.handleShow()}}>Add to-do +</button>
        </div>
      ) 
    }

      <ul id='todoList'>
        { 
          this.state.todoArray.map((todo)=>
            { 
              if(this.state.filter == this.COMPLETE)
                {
                  if(todo.completed)
                    {
                      return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/><s>{todo.todo}</s><img src={deleteIcon} alt="deleteLogo" className="deleteImg" onClick={()=>{this.handleDeleteShow(todo.id)}} id="DeleteTodo" width="20"/><img src={EditIcon} alt="editLogo" width="20" id="editingTodo"/></li>
                    }
                }
              else if(this.state.filter == this.INCOMPLETE)
                {
                  if(!todo.completed)
                    {
                      return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/>{todo.todo}<img src={deleteIcon} alt="deleteLogo" className="deleteImg" onClick={()=>{this.handleDeleteShow(todo.id)}} id="DeleteTodo" width="20"/><img src={EditIcon} alt="editLogo" width="20" id="editingTodo" onClick={()=>{this.handleEditShow(todo.id)}}/></li>
                    }
                }
              else
                {
                  if(todo.completed)
                    {
                      return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/><s>{todo.todo}</s><img src={deleteIcon} alt="deleteLogo" className="deleteImg" onClick={()=>{this.handleDeleteShow(todo.id)}} id="DeleteTodo" width="20"/><img src={EditIcon} alt="editLogo" width="20" id="editingTodo"/></li>
                    }   
                  else
                    return <li id='TodolistStyle'><input onClick={()=>{this.completeClickHandler(todo.id)}} type="checkbox" style={{margin:'10px'}}/>{todo.todo}<img src={deleteIcon} alt="deleteLogo" className="deleteImg" onClick={()=>{this.handleDeleteShow(todo.id)}} id="DeleteTodo" width="20"/><img src={EditIcon} alt="editLogo" width="20" id="editingTodo"  onClick={()=>{this.handleEditShow(todo.id)}}/></li>          
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
          <input className="form-control" placeholder="Add To-Do here" type='text' id='addTodo'/>
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
      <Modal show={this.state.showEditModal} onHide={this.handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body id='editBody'>
          <input className="form-control" type='text' placeholder="Editing To-do" id='editTodoInput' defaultValue={this.state.editingTodo.todo}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.saveTodo}>
            Save
          </Button>
          <Button variant="secondary" onClick={this.handleEditClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    

      {/* Modal Component */}
      <Modal show={this.state.showDeleteModal} onHide={this.handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete To-Do</Modal.Title>
        </Modal.Header>
        <Modal.Body id='modalDeleteBody'>
          <label>Confirm To Delete : {this.state.editingTodo.todo}</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.deleteTodo}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.handleDeleteClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <button onClick={()=>{this.testFunction()}}>Add Dummy To-dos</button><br/><br/>
      </div> 
  );
}

}

export default App;
