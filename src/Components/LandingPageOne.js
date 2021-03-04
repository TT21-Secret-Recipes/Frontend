import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../assets/images/bg.jpg'

const StyledSection = styled.div`
    position:fixed;
    align-items:center;
    justify-content:center;
    background-repeat:no-repeat;
    background-size:cover;
    background-image: url(${backgroundImage});
    width:35%;
    height:100%;
    z-index: 2;
`

const StyledHeader = styled.h1`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    text-align:center;
    padding-right:1rem;
    font-weight:425;
    font-size:1.5rem;
    margin-left:10%;
    justify-items:center;
    margin-top:50%;
    width:75%;
    color:whitesmoke;
`

const Span = styled.span`
    color:whitesmoke;
    font-weight:bolder;
`
const StyledPara = styled.p`
`

const LandingPageOne = () => {

    return (
        <StyledSection>
            <StyledHeader>
                <Span>Secret Family Recipes</Span> 
                <StyledPara>Your place for generation after generation of tradition</StyledPara> 
            </StyledHeader>   
        </StyledSection>
    )
}

export default LandingPageOne;



