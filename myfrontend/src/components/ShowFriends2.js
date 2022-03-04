import React, {useState,useEffect} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import { withRouter, useHistory} from 'react-router-dom'; 
import './comsCSS.css';
function ShowFriends({fremail}) {
    const [ishide, setIshide] = useState("false")
    const [ID, setID] = useState()
    const [name, setName] = useState()
    const [img, setImg] = useState()
    let history = useHistory();
    const getuserIDName=()=>{
        const URL = "http://localhost:5000/getuserIDName";
      var data2 ={
        email: fremail
    }
    console.log(data2);
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
      console.log(response)
      setID(response.data._id)
      setName(response.data.firstname+''+response.data.lastname)
      setImg(response.data.propic)
  })
  .catch(error => {
      console.log(error.response)
  });
    }
    useEffect(() => {
        if(fremail===""){
            setIshide("true")
            
        }else{
            console.log(fremail)
            getuserIDName()
        }
     
      },[fremail]);

    return (
        <div>
        <div> 
            {ishide==="true"
                    ? null
                    : <div style={{marginTop:'1%'}} >
                    <Jumbotron className="jumbo2" fluid>
                        <Container>
                        <img width="100" height="100" style={{position:'relative', left:'-140%', top:'-50%' ,borderRadius:'50px'}} src={img}></img><a className="title" href={'/profile/'+ID}> {name}</a>
                        </Container>
                    </Jumbotron></div>}
            
            
        </div>
        </div>
    )
}

export default withRouter(ShowFriends)
