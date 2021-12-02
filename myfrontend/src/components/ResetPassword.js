import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
function ResetPassword(props) {
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const token = props.match.params.token;
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/nextforgetpassword";
        var data2 ={
            passwordToken: token,
            password: pass,
            
        }
        console.log("my data in front bs",data2)
        const options = {
            method: 'post',
            url: URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            data: data2,

            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
              
          }}
        
        axios(options).then(response => {
          console.log("Response is ",response.data)
          setMessage(response.data.message)
          
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("Reset Password: ", token)
        
      },[]);
    
    return (
        
             
            
                <div style={{  
                    height:'100vh',
                    Width: '100vw',
                    backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                    backgroundPosition: 'center',
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundHeight: '100%',
                    //backgroundColor:"transparent",
                    
                  }}>
                    <div class="container"
                     style={{position:'absolute',
                     marginLeft:'39%', marginTop:'8%',
                  
                
                
                
                
                
                
                }}>
            <form style={{
                           width:'350%',
                           backgroundColor:'white',
                         paddingBottom:"20px",
                         bordercollapse:"separate",
                         borderRadius:"5px",
                         overflow: 'hidden',
                         perspective: "1px",
                        paddingBottom:"10%"
                    }}>
                        <div className="img"  style={{transform:'translateX(-15px)'}}><img width="109%" height="50%" src={'/content/bg-1.jpg'}></img></div> 
                <h3>Reset Password</h3>

                

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>

                

                <button type="submit" onClick={handleChange} className="btn btn-primary btn-block">Submit</button>
                

            </form>
            {error? <div class="alert alert-danger" role="alert">{error}</div> : null}
            {message? <div class="alert alert-success" role="alert">{message}</div> : null}
            
            </div>
            
            </div>
            
            
            
        
        
    )
    
}
 
export default withRouter(ResetPassword)
