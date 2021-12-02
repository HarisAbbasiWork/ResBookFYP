import React, {useState,useEffect, useMemo} from 'react'
import axios from 'axios'
import validator from 'validator'
import Select from "react-select";
function SignupForm() {
    const [email, setEmail] = useState("")
    const [propic, setPropic] = useState("")
    const [pass, setPass] = useState("")
    const [fname, setFname] = useState("")
    const [error, setError] = useState("")
    const [lname, setLname] = useState("")
    const [selectedfile, setSelectedfile] = useState("")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const handleChange=(e)=>{
        console.log("EMail in signup form",email)
        e.preventDefault()
        //i will authenticate user
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if(pattern.test(email)){
            
        

        
        
        if(validator.isNumeric(year)){

        
        //const data = new FormData() 
        console.log(day+month+year)
        //data.append('file', selectedfile)
        //data.set("email", email);
        //data.set("pass", pass);
        //data.set("fname", fname);
        //data.set("DOB", day+' '+month+' '+year);
        //data.set("lname", lname);
        const data2 = new FormData()
        data2.append("file", selectedfile)
        data2.append("upload_preset", "gohp28zp")
        data2.append("cloud_name","ResBook")
        
        const URL = "	https://api.cloudinary.com/v1_1/resbook/image/upload";
            axios.post(URL,data2)
            .then((response) => {
                console.log("Response is ",response.data.url)
                //data.set("fileurl", response.data.url);
                var data ={
                    email: email,
                    pass: pass,
                    fname: fname,
                    DOB: day+' '+month+' '+year,
                    lname: lname,
                    fileurl: response.data.url
                }
                const URL2 = "http://localhost:5000/sign-up";
                axios.post(URL2,data)
                .then((response) => {
                    console.log("Response is ",response.data.message)
                }).catch((error) => {

                });
                
                
            })
                .catch(err => console.log(err))
        
        alert("You are now a user please login")
        }else{
            setError("Year Should Be Interger And Have 4 Characters")
        }
    }else{
        setError("Email Format Not Correct")
        }
        
        
        
        
    }
    const style2 = {
      
        marginright: "20px"
      };
    const options ={
        days:[1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Nov','Dec']
    }
    const onIMGChangeHandler=(event)=>{

        console.log(event.target.files[0])
        setSelectedfile(event.target.files[0])
    
    }
    useEffect(()=>{
        
    })
    return (
        <div style={{  
            height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
          }}
          >
       
       <div class="container"
                     style={{position:'absolute',
                     marginLeft:'39%', marginTop:'2%',
     
                }}>
       
        <form style={{

width:'350%',
backgroundColor:'white',
paddingBottom:"20px",
bordercollapse:"separate",
borderRadius:"5px",
overflow: 'hidden',
perspective: "1px",
paddingBottom:"0%"


// boxSizing:'border-box',
// overflow: 'hidden',
// background: '#fff',

// boxShadow: '0px 10px 34px -15px rgb(0 0 0 / 24%)',
// display: 'block',
// fontFamily: '"Lato", Arial, sansserif',
// fontSize: '16px',
// lineHeight: '1.8',
// fontWeight: 'normal',

// color: 'gray',
// position: 'relative',
// width: '22%',
// paddingRight: '15px',
// // paddingLeft: '15px',
//  marginLeft:"31%",






}}>

<div className='container-fluid login_div'>
            <div className="img" style={{transform:'translateX(-15px)'}}><img width="110%" height="200" src={'/content/bg-1.jpg'}></img></div>
                <h3 style={{textAlign:"left", fontFamily:'"Times New Roman", Times, serif',margin:"7%",  marginLeft:"5%", marginBottom:"4%",
         fontweight: "lighter",     color:"#595959", fontsize: "16px",
         lineheight:"1.8"}}>Sign Up</h3>

                <div className="form-group" style={{marginBottom:"2%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>First name</label>
                    <input type="text" onChange={(e)=>{setFname(e.target.value)}} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group" style={{marginBottom:"2%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>Last name</label>
                    <input type="text" onChange={(e)=>{setLname(e.target.value)}} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group" style={{marginBottom:"2%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>Email address</label>
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group" style={{marginBottom:"2%",margin:"5%"}}>
                    <label style={{color:"#595959"}}>Password</label>
                    <input type="password" onChange={(e)=>{setPass(e.target.value)}} className="form-control" placeholder="Enter password" />
                </div>
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
                {error? <div class="alert alert-danger" role="alert">{error}</div> : null}

                <button type="submit" onClick={handleChange} style={{backgroundColor:"#bf0404" ,width:"91%" , marginLeft:"4.8%" ,marginBottom:"5%"}} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right" style={{color:"#595959"}}>
                    Already registered <a style={{color:"#bf0404"}}href="/sign-in">sign in?</a>
                </p>
                </div>
            </form>
            </div>
        </div>
        
    )
}

export default SignupForm
