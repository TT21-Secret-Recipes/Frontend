
import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import defaultPic from '../assets/def_prof_pic.jpg';
import { NavLink } from "react-router-dom";
import editlogo from '../assets/edit-button.png';

function EditProfile(){
    const history = useHistory()
    const initialValues ={
        username: '',
        name: '',
        bio: '',
        
    }
    const defaultProfile = {
        username: 'CookieMonster',
        name: 'Ettore Boiardi',
        pic: `${defaultPic}`,
        bio: 'I love to cook, but I need to learn more!',
        onlinestatus: 'online',
        datejoined: 'Dec 25, 2020',
        numrecipes: '0',
    }

    const [values, setValues] = useState(initialValues);
    const [userProfile, setUserProfile] = useState(defaultProfile);


    const onChange =(evt) => {
        setValues({...values, [evt.target.name]: evt.target.value })

    }
    
    const onSubmit =(evt) => {
        evt.preventDefault()
        
        axios.put('')
        .then(res => {

        })
        .catch(err =>{
            console.log(err)
        })
        console.log(values)
        setValues(initialValues)
        history.push('/userprofile')
    }


    
    return(
        <Styledpage>
            <Styledheader class = "profheader">
                    <Styledpicbox>
                        <Styleimg src={userProfile.pic}/>
                    </Styledpicbox>
                    <Styledsinimg>
                            <Styledinfobox>
                                <h1>{userProfile.username}</h1>
                                <h2>{userProfile.name}</h2>
                                <p>Bio: {userProfile.bio}</p>
                            </Styledinfobox>
                        
                    </Styledsinimg>
                </Styledheader>
            <Styledbody>
                <Styleformtitlebox>
                    <h1>Update Your Profile</h1>
                </Styleformtitlebox>
                <form onSubmit = {onSubmit}> 
                <Styleform>

                    <Stylelabel>
                    <Stylenamebox>
                            <p>Username</p>
                        </Stylenamebox>
                    <Styleinput 

                        value = {values.username}
                        name ="username"
                        type ="text"
                        onChange = {onChange}
                    />
                        
                
                    </Stylelabel>
                
                    <Stylelabel>
                        <Stylenamebox>
                            <p>First Name</p>
                        </Stylenamebox>
                    <Styleinput 
                        value = {values.firstname}
                        name = "name"
                        type = "text"
                        onChange ={onChange}
                    />
                        
                    
                    </Stylelabel>
                    <Stylelabel>
                        <Stylenamebox>
                            <p>Last Name</p>
                        </Stylenamebox>
                    <Styleinput 
                        value = {values.firstname}
                        name = "name"
                        type = "text"
                        onChange ={onChange}
                    />
                        
                    
                    </Stylelabel>
                
                    <Stylelabel>
                    <Stylenamebox>
                            <p>Bio</p>
                        </Stylenamebox>
                    <Styleinput 
                        value = {values.bio}
                        name = "bio"
                        type = "text"
                        onChange = {onChange}
                    />
                        
                
                    </Stylelabel>
                
                    <Stylebutton><p>Save</p></Stylebutton>
                  </Styleform>   
                </form>
               
            </Styledbody>
    
        </Styledpage>
    )
}

export default EditProfile

const Styledpage = styled.div`
display:flex;

width: 1000px;
// justify-content: center;
margin:0 auto;
flex-direction: column;
`
const Styledheader = styled.div`
display:flex;
width: 100%;
background-color: #d9d9d9;
margin-bottom: 20px;
border-radius: 4px;

`
const Styledpicbox = styled.div`
display: flex;
width: 200px;
height:200px;
`
const Styleimg = styled.img`
border-radius: 4px;
width: 200px;
height:200px;
`
const Styledinfobox = styled.div`


padding: .5rem 1.5rem;
`
const Styledsinimg = styled.div`
display:flex;
justify-content: space-between;
width:100%;
`
const Styledbody = styled.div`
display:flex;
width: 100%;
background-color: #d9d9d9;
border-radius: 4px;
justify-content: space-evenly;
flex-direction:column;
`

// form styles besides body

const Styleformtitlebox = styled.div`
display:flex;
color:white;
background-color: grey;
padding: .5rem 1.5rem;
border-radius: 4px 4px 0px 0px ;
`
const Styleform = styled.div`
display:flex;
flex-direction:column;
border-radius: 0px 0px 4px 4px ;

`

const Stylebutton = styled.button`
background-color: #7fa650;
color: #fff;
width: 4rem;
opacity:1;
border-radius: 4px;
margin: 1.5rem 1.5rem;

&:hover {
    cursor:pointer;
    opacity:.5;
}
`

const Stylelabel = styled.label`
padding: .5rem 1.5rem;
display:flex;
justify-content: space-between;
width:50%;

`
const Stylenamebox = styled.div`
justify-content:flex-start;
`

const Styleinput = styled.input`
display:flex;
margin:10px;
justify-content:flex-end;
`