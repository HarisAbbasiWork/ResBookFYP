import React, {useState,useEffect, useMemo} from 'react'
import { withRouter, useHistory } from 'react-router-dom'; 
import axios from 'axios'
import NavBar from './NavBar'
 import './loginn.css'
 import GoogleLogin from 'react-google-login';
function LoginForm({props, setEmail2,friends,setUserID,setUserPic, setUser2,setFriends, user2, setIslogged }) {
    const [email, setEmail] = useState("Profile")
    const [pass, setPass] = useState("")
    const [error, setError] = useState(null);
    const [adfname, setAdFname] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [adlname, setAdLname] = useState("")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [getAD, setGetAD] = useState(false);
    let history = useHistory();
    const [redirectToReferrer, setRedirectToReferrer] = useState("false")
    const handleChange= async (e)=>{
        //i will authenticate user
        e.preventDefault()
        
        
        const URL = "http://localhost:5000/sign-in";
        var data2 ={
            email: email,
            pass: pass,
            
        }
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
          if(response.data.success){
            setUser2(response.data.fname +" "+ response.data.lname)
            setEmail2(email)
            setUserID(response.data.id)
            setUserPic(response.data.propic)
            setFriends(response.data.friends)
            setIslogged("true")
            localStorage.setItem('data', JSON.stringify(response.data))
            console.log("We know evertything now after submission", email)
            console.log("tt",response.data.token)
            localStorage.setItem('token', response.data.token)
            history.push('/');

          }else{
              setError(response.data.message)
          }
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
        
        
        
        
        
    
        
        
        
        
    }
    const responseGoogle = (response) => {
        console.log(response.profileObj);
        setEmail(response.profileObj.email)
        setAdFname(response.profileObj.givenName)
        setAdLname(response.profileObj.familyName)
        const URL = "http://localhost:5000/googlesign-in";
        var data2 ={
            email: response.profileObj.email
            
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
        
        axios(options).then(response2 => {
            console.log("Response is ",response2.data)
            
            if(response2.data){
                
                setUser2(response2.data.fname +" "+ response2.data.lname)
                setEmail2(response.profileObj.email)
                setUserID(response2.data.id)
                setUserPic(response2.data.propic)
                setFriends(response2.data.friends)
                setIslogged("true")
                localStorage.setItem('data', JSON.stringify(response2.data))
                console.log("We know evertything now after submission", email)
                history.push('/');
            
            }else{
                console.log("User don't exist by that gmail email")
                
                setGetAD(true)
            }
        
            
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        
      }
      const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    const handleChangeAdditional=()=>{
        console.log("EMail in signup form",email)
        
            
        

        
        

        
        const data = new FormData() 
        console.log(day+month+year)
        data.append('file', selectedfile)
        data.set("email", email);
        data.set("pass", pass);
        data.set("fname", adfname);
        data.set("DOB", day+' '+month+' '+year); 
        data.set("lname", adlname);
        const URL = "http://localhost:5000/additionalsign-up";
            axios.post(URL,data)
            .then((response) => {
                console.log("Response is ",response.data.message)
                setUser2(response.data.fname +" "+ response.data.lname)
                setEmail2(email)
                setUserID(response.data.id)
                setUserPic(response.data.propic)
                setFriends(response.data.friends)
                setIslogged("true")
                localStorage.setItem('data', JSON.stringify(response.data))
                console.log("We know evertything now after submission", email)
                history.push('/');
                
                
            }).catch((error) => {

            });
        
    
        
        
        
        
    }
    const options ={
        days:[1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
    }
    useEffect(() => {
        // Update the document title using the browser API
        
        
        console.log("We know evertything now", email)
        
      },[]);
      if(getAD){
        return(
            
            <div className="back" style={{  
                height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                
              }}
              >
              			
         
                  
                 
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

		

            
  

<div className='container-fluid login_div'>
<div className="img"  style={{transform:'translateX(-15px)'}}><img width="109%" height="50%" src={'/content/bg-1.jpg'}></img></div> 
     <h3 style={{
         textAlign:"left", fontFamily:'"Times New Roman", Times, serif',margin:"7%",  marginLeft:"5%", marginBottom:"4%",
         fontweight: "lighter",     color:"#595959", fontsize: "16px",
         lineheight:"1.8"
        
    
    }}>Login With Google Successful, Kindly Enter Below Information</h3> 
    <div className='row' style={{width:'165%'}}> 
        <div className='col-md-8'>
        
    <div className="form-group" style={{marginBottom:"2%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>Day</label>
                    <select name="Day" onChange={(e)=>setDay(e.target.value)}>
                        {options.days.map(day=>(<option value={day}>{day}</option>))} 
                    </select>
            
                    <label style={{marginLeft:"1%", color:"#595959"}}>Month</label>
                    <select name="Month" onChange={(e)=>setMonth(e.target.value)}>
                        {options.months.map(month=>(<option value={month}>{month}</option>))} 
                    </select>
                    <label style={{marginLeft:"1%", color:"#595959"}}>Year</label>
                    <input type="year" onChange={(e)=>{setYear(e.target.value)}} style={{display:"inline-block", width:"50%"}} className="form-control" placeholder="Enter year" />
                </div>
                <div className="form-group" style={{marginBottom:"5%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>Add Profile Picture </label>
                    <input style={{marginLeft:"3%"}} type="file" name="file" onChange={onIMGChangeHandler}/>
                </div>
    <button type="submit" onClick={e => {e.preventDefault();handleChangeAdditional()}} style={{backgroundColor:"#bf0404" ,width:"91%" , marginLeft:"4.8%" ,marginBottom:"5%"}} className="btn btn-primary btn-block">Continue</button>
    
        </div>
    </div>

</div>
    



    
    

    
    
   
{error? <div class="alert alert-danger" role="alert">{error}</div> : null}
</form>
        {/* </div> mb-3 */}
        
</div>                  
               
           
          
            
            
            
            
            </div>
            
            
            
            
        

        )

    }else{
    return (
        
            
            <div className="back" style={{  
                height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                
              }}
              >
              			
         
                  
                 
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


            
  

<div className='container-fluid login_div'>
<div className="img"  style={{transform:'translateX(-15px)'}}><img width="109%" height="50%" src={'/content/bg-1.jpg'}></img></div> 
     <h3 style={{
         textAlign:"left", fontFamily:'"Times New Roman", Times, serif',margin:"7%",  marginLeft:"5%", marginBottom:"4%",
         fontweight: "lighter",     color:"#595959", fontsize: "16px",
         lineheight:"1.8"
        
    
    }}>Sign In</h3> 
    <div className='row' style={{width:'165%'}}> 
        <div className='col-md-8'>
        <div className="form-group" style={{margin:"5%" }}>
            <label style={{color:"#595959"}}>Email address</label>
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
    </div>
    <div className="form-group" style={{margin:"5%" , marginBottom:"9%"}}>
        <label style={{color:"#595959"}}>Password</label>
        <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
    </div>
    <button type="submit" onClick={handleChange} style={{backgroundColor:"#bf0404" ,width:"91%" , marginLeft:"4.8%" ,marginBottom:"5%"}} className="btn btn-primary btn-block">Sign-In</button>
    <div className="form-group">
        <div className="custom-control custom-checkbox" style={{color:"#bf0404" ,marginLeft:"4.8%"}}>
            <input type="checkbox" className="custom-control-input" id="customCheck1"  />
            <label style={{display:"inline-block"}} className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            <p href='/forgetpassword' style={{display:"inline-block", float:"right", color:"#595959", paddingRight:"5%" }} className="forgot-password text-right">
                Forgot <a href='/forgetpassword' style={{color:"#595959", }}>password?</a>
            </p>
        </div>
    </div>
    <GoogleLogin
            clientId="531177032810-5ectpdh8s33qmqkd0adct3gpjl0g9sju.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
  />
        </div>
    </div>

</div>
    



    
    

    
    
   
{error? <div class="alert alert-danger" role="alert">{error}</div> : null}
</form>
        {/* </div> mb-3 */}
        
</div>                  
               
           
          
            
            
            
            
            </div>
            
            
            
            
        
        
    )
}
    }
 
export default withRouter(LoginForm)
