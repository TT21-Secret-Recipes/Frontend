import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const LinkStyled = styled(Link)`
  background: #00a816;
  border-radius: 4px;
  color: white;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: #006b0e;
    color: #adadad
  }
`

// For forms specifically
export const DivFlexStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const DivFlexGrowStyled = styled.div`
  flex: 1 0 auto;
`

export const DivToggleFormStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

export const H1TitleStyled = styled.h1`
  margin-top: 0;
`
// Thank you Chris from css tricks for giving me the css to make the "fieldset" work, ready to copy and paste
// https://css-tricks.com/snippets/css/non-form-fieldset-look/
export const DivFieldsetStyled = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 10px;
  position: relative;
  text-align: left;
  width: 300px;
`

// needs boolean focus prop
// needs boolean 'hasData' prop. Otherwise it will cover userinput :/
export const LabelStyled = styled.label`
  background: #fff;
  color: ${props => {
    if(!props.hasData)
        return props.focus ? 'black' : 'grey'
      return 'black'
  }};
  font-size: ${props => {
      if(!props.hasData)
        return props.focus ? '18px' : '24px'
      return '18px'
    }
  };
  line-height: 1;
  margin-top: ${props => {
      if(!props.hasData)
        return props.focus ? '-9px' : '8px'
      return '-9px'
    }
  }; /* negative margin half of fontsize, other margin trial and error ig */
  padding: 0 3px;
  position: absolute;
  top: 0;
  transition: margin-top 0.15s, font-size 0.15s, color 0.15s; // transitions from over input to part of div
`

export const InputStyled = styled.input`
  border: none;
  display: inline-block;
  font-size: 20px;
  outline: none;
  width: 250px;
`

export const DivButtonPaddingStyled = styled.div`
  padding-bottom: 10px;
`

export const ButtonSubmitStyled = styled.button`
  background: #00a816;
  border: none;
  border-radius: 4px;
  color: white;
  display: inline-block;
  flex-shrink: 0;
  padding: 5px 10px;

  &:hover {
    background: #006b0e;
    color: #adadad
  }
`
export const PRedStyled = styled.p`
  color: red;
`

export const ImgEyeStyled = styled.img`
  display: inline-block;
  height: 16px;
  margin-top: 4px;
  width: 20px;
`

// for newAddRecipe and Recipe Card
export const DivMainStyled = styled.div`
  align-self: center;
  background: #f1f1f1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  margin-top: 2%;
  padding: 1% 2%;
  padding-left: ${props => props.noPadding === true ? '0' : '2%'};
  width: 75vw;
`