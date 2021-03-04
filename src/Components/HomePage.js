import React from 'react';
import LandingPageOne from './LandingPageOne'
import LandingPageTwo from './LandingPageTwo'
import styled from 'styled-components'



const StyledHome = styled.div`
`

const Home = () => {

    return(
        <StyledHome>
            <LandingPageOne/>
            <LandingPageTwo/>
        </StyledHome>
        )
}

export default Home;

