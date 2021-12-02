import React, {useState,useEffect, useContext}  from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
function SearchedUsers() {
    const [users, setUsers]=useState([])
    let params = useParams();
    const getData=(query)=>{
        axios.get('http://localhost:5000/getusers')
            .then(response => {
                console.log("Users", response.data)
                var filteredNames = response.data.filter((x)=>{ 
                    console.log(x.firstname)
                    if(x.firstname.toLowerCase().startsWith(params.query.toLowerCase())){
                        return x
                    }
                })
                setUsers(filteredNames)
                console.log("searched users", filteredNames)
            })
        
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    useEffect(() => {
        
        console.log("We opening profile"+ params.query)
        var ret = params.query
        
        
        getData(ret)
        
    }, [params.query])
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #1423A4', backgroundColor: '#552624', color: '#FFFFFF ' }}>{users.length} Results</h3>
            
            {users.map(user=>(
            <div style={{marginTop:'1%'}} >
            <Jumbotron className="jumbo" fluid>
                <Container>
                <img width="100" height="100" style={{position:'relative', left:'-140%', top:'-50%' ,}} src={user.propic}></img><a className="title" href={'/profile/'+user._id}>{user.firstname+''+user.lastname}</a>
                </Container>
            </Jumbotron></div>
            ))}
        </div>
    )
}

export default SearchedUsers
