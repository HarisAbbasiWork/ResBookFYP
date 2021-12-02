import React, {useState,useEffect} from 'react'
import ShowFriends from './ShowFriends'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch } from '@fortawesome/free-solid-svg-icons'

import './comsCSS.css'
function FriendsTab({id,islogged}) {
    const [friends, setFriends] = useState([])
    const [friends2, setFriends2] = useState([])
    const [users, setUsers] = useState([])
    const [users2, setUsers2] = useState([])
    let history = useHistory();
    const getFriends=async(id)=>{
        console.log("getting friends of", id)
        await axios.get('http://localhost:5000/user/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setFriends(response.data.friends)
                setFriends2(response.data.friends)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
            
    }
    const getData=()=>{
        axios.get('http://localhost:5000/getusers')
            .then(response => {
                console.log("Users", response.data)
                setUsers(response.data)
                /* var filteredNames = response.data.filter((x)=>{ 
                    console.log(x.firstname)
                    if(x.firstname.toLowerCase().startsWith(params.query.toLowerCase())){
                        return x
                    }
                })
                setUsers(filteredNames) */
            })
        
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    const searchHandler=(e)=>{
        console.log(e.target.value)
        var searchresults=friends2.filter(friend => friend.startsWith(e.target.value))
        setFriends(searchresults)
        console.log(searchresults)

    }
    const searchHandler2=(e)=>{
        console.log(e.target.value)
        if(e.target.value==""){
            console.log("khali")
            setUsers2([])
        }else{
            var filteredNames = users.filter((x)=>{ 
                console.log(x.firstname)
                if(x.firstname.toLowerCase().startsWith(e.target.value.toLowerCase())){
                    return x
                }
            })
            setUsers2(filteredNames) 
        }
        
        
    }
    useEffect(() => {
        console.log("Logged user ID",id,islogged)
        if(islogged=="false"){
            history.push('/sign-in')
            
        }else{
            getFriends(id)
            getData()

        }
        
    }, [])
    return (
        <div>
            <h3 id="newfriends">{friends?friends.length:null} Friends</h3>
            <div><FontAwesomeIcon icon={faSearch} size="2x" style={{position:'relative', left:'42%', top:'14%'}} color="#5B5C60" /><input type="text" id="search" placeholder="Search Friend..." onChange={searchHandler}/></div>
            {friends.map(friend=>(
            <ShowFriends fremail={friend}/>
            ))}
            <h3 id="newfriends">Find New Friends</h3>
            <div><FontAwesomeIcon icon={faSearch} size="2x" style={{position:'relative', left:'42%', top:'2%'}} color="#5B5C60" /><input type="text" id="search" placeholder="Find People..." onChange={searchHandler2}/></div>
            {users2.map(user=>(
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

export default FriendsTab
