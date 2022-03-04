import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios'
function Todos() {
    const [newtodo, setNewtodo] = useState(null)
    const [alltodos, setAlltodos] = useState(null)
    const [onStatusChange, setonStatusChange] = useState(1)
    const [all, setAll] = useState(1)
    const [donepending, setDonepending] = useState(null)
    const handleChange= async ()=>{
        axios.post('http://localhost:5000/addtask', {
            task:newtodo
          })
            .then(function (response) {
              console.log(response.data)
              axios.get('http://localhost:5000/taskscount')
              .then(response => {
                  console.log(response.data) 
                  setAll(response.data.all)
                  setDonepending(response.data.result)
            
          })
          .catch(function (error) {
            console.log(error);
            console.log("Aey te error hai bro")
          })
    
            })
            .catch(function (error) {
              console.log('Error is ', error);
            });
            const newList = alltodos.concat({ 
                task:newtodo,
                status:"Pending"
             });
            setAlltodos(newList);
            
    }
    const updateStatus= async (id,status)=>{
        console.log(id,status)
        axios.post('http://localhost:5000/updatestatus', {
            todoid:id,
            status:status
          })
            .then(function (response) {
              console.log(response.data)
              setonStatusChange(onStatusChange+1)
            })
            .catch(function (error) {
              console.log('Error is ', error);
            });
    }
    useEffect(() => {
        axios.get('http://localhost:5000/gettasks')
          .then(response => {
            console.log(response.data)
            setAlltodos(response.data);  
            
          })
          .catch(function (error) {
            console.log(error);
            console.log("Aey te error hai bro")
          })
          axios.get('http://localhost:5000/taskscount')
          .then(response => {
            console.log(response.data) 
            setAll(response.data.all)
            setDonepending(response.data.result)
            
          })
          .catch(function (error) {
            console.log(error);
            console.log("Aey te error hai bro")
          })
        
    
    
    
      }, [onStatusChange])
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Phebsoft (Pvt.) Ltd. Task</h1>
        <label style={{marginLeft:"1%", color:"#595959"}}>New Task: </label>
        <div class="row" style={{marginLeft:"10px"}}>
        <input type="year" onChange={(e)=>{setNewtodo(e.target.value)}} style={{width:"50%"}} className="form-control" placeholder="Enter Task" />
        <div class="form-group">
            <button type="submit" onClick={e => {e.preventDefault();handleChange()}} id="newloginbutton" >Submit</button>
        </div>
        

        </div>
        <div class="taskdetails row">
            <h1 style={{paddingLeft:'20px'}}>Total Tasks: {all}</h1>
            {donepending&& donepending.map((todo) => (
                <h1 style={{paddingLeft:'20px'}}>Total {todo._id}: {todo.count}</h1>
            ))}
            
        </div>
        
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update</th>
                </tr>
            </thead>
            <tbody>
                {alltodos&& alltodos.map((todo,index) => (
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td>{todo.task}</td>
                    <td>{todo.status}</td>
                    <button type="submit" onClick={e => {e.preventDefault();updateStatus(todo._id,todo.status)}} id="newloginbutton" >Update {todo.status=="Pending"?"To Done":"To Pending"}</button>
                </tr>

                ))}
                
                
            </tbody>
        </table>

        </div>
  )
}

export default Todos