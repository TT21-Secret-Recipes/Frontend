import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/thumbs/01.jpg";
import img2 from "../assets/images/thumbs/02.jpg";
import img3 from "../assets/images/thumbs/03.jpg";
import img4 from "../assets/images/thumbs/04.jpg";
import img5 from "../assets/images/thumbs/05.jpg";
import img6 from "../assets/images/thumbs/06.jpg";
import styled from "styled-components";

const StyledPage = styled.div`
   display: flex;
   flex-direction: row;
   font-weight: 200;
   max-width: 100%;
   padding: 1rem;
   width: 60%;
`;
const StyledSection = styled.div`
   display: flex;
   flex-direction: column;
   align-content: center;
   align-items: center;
   position: absolute;
   width: 65%;
   margin-left: 35%;
   margin-top: 7rem;
   padding-bottom: 2rem;
`;

const DivOne = styled.div`
   display: flex;
   flex-direction: column;
   position: relative;
   padding-bottom: 2rem;
   border-bottom: 2px solid lightgrey;
   font-size: 0.8rem;
   margin: 10% 10%;
   width: 80%;
`;

const DivTwo = styled.div`
   display: flex;
   flex-direction: column;
   width: 65%;
   position: relative;
   align-items: left;
`;
const H1 = styled.h1``;
const H2 = styled.h2`
   text-align: center;
`;
const H4 = styled.h4`
   text-align: center;
`;
const RecipeDiv = styled.div`
   margin-top: 2rem;
   display: flex;
   width: 100%;
   align-items: center;
   flex-wrap: wrap;
   justify-content: space-between;
`;
const StyledPara = styled.p`
   font-size: 1rem;
   text-align: center;
`;

const ParaDiv = styled.div`
   justify-content: space-evenly;
   width: 35%;
   padding-right: 2rem;
   padding-left: 2rem;
   padding-bottom: 5rem;
`;

const InfoButton = styled.button`
   border: 2px solid black;
   border-radius: 8px;
   width: 30%;
   padding: 1.7rem;
   background: none;
   margin-top: 2rem;
   font-size: 1rem;
   min-width: 125px;
   margin-bottom: 2rem;
   max-width: 125px;
   &:hover {
      background: #006b0e;
      color: #adadad;
   }
`;
const Img = styled.img`
   height: 100%;
   width: 100%;
   min-width: 200px;
   border-radius: 8px;
`;
const LandingPageTwo = () => {
   return (
      <StyledPage>
         <StyledSection>
            <DivOne>
               <H1>
                  Anyone can go out and buy a cookbook these days, but you want
                  a place to store all your secret family recipes, handed down
                  from generation to generation.
               </H1>
               <StyledPara>
                  The little cards grandma wrote her recipes on in her beautiful
                  cursive are getting lost or are hard to read. You need
                  somewhere secure to keep my recipes with me forever!
               </StyledPara>
               <InfoButton>
                  <Link
                     to="/auth/login"
                     style={{ textDecoration: "none", color: "inherit" }}
                  >
                     Learn More
                  </Link>
               </InfoButton>
            </DivOne>
            <DivTwo>
               <H2>Some of our favorite recipes</H2>

               <RecipeDiv>
                  <ParaDiv>
                     <Img src={img1} />
                     <H4>Magna sed consequat tempus</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
                  <ParaDiv>
                     <Img src={img2} />
                     <H4>Ultricies lacinia interdum</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
                  <ParaDiv>
                     <Img src={img3} />
                     <H4>Tortor metus commodo</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
                  <ParaDiv>
                     <Img src={img4} />
                     <H4>Quam neque phasellus</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
                  <ParaDiv>
                     <Img src={img5} />
                     <H4>Nunc enim commodo aliquet</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
                  <ParaDiv>
                     <Img src={img6} />
                     <H4>Risus ornare lacinia</H4>
                     <StyledPara>
                        Lorem ipsum dolor sit amet nisl sed nullam feugiat.
                     </StyledPara>
                  </ParaDiv>
               </RecipeDiv>
               <InfoButton>
                  <Link
                     to="/auth/login"
                     style={{ textDecoration: "none", color: "inherit" }}
                  >
                     For More Info
                  </Link>
               </InfoButton>
            </DivTwo>
         </StyledSection>
      </StyledPage>
   );
};

export default LandingPageTwo;
