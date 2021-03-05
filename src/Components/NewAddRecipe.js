import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import { RiCloseFill } from "react-icons/ri";
import useFauna, { submitRecipe } from "../FaunaAPI/FaunaAPI";
// import { useHistory } from "react-router-dom";
import { DashContext } from "../Contexts";

const DivLabelStyled = styled.div`
  font-weight: 700;
  font-size: 1.3rem;
`

const InputStyled = styled.input`
  padding: 2px 10px;
  width: 260px;
`

const TextAreaStyled = styled.textarea`
  height: 150px;
  padding: 4px 10px;
  width: 260px;
`

function parseIngredients(ingredients){
  return ingredients !== ''
    ? ingredients.split('\n').filter( str => str !== '')
    : [];
}

const placeholder = {
  title: 'Title',
  source: 'Source',
  category: 'Category',
  ingredients:
  `Ingrediant One
Ingrediant Two
Ingrediant Three`,
  instructions:
  `1. Step One
2. Step Two
3. Step Three`,
}

const blankValues = {
  title: '',
  source: '',
  category: '',
  ingredients: '',
  instructions: '',
}
export default function NewAddRecipe(props){
  const fauna = useFauna();
  const { currentUser } = useContext(DashContext);
  
  const initialValues = props.recipe === undefined ? blankValues : props.recipe;
  const [values, setValues] = useState(initialValues);

  function onChange(evt){
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value});
  }

  function submit(evt){
    evt.preventDefault();
    // console.log({
    //   ...values,
    //   ingredients: parseIngredients(values.ingredients),
    //   submittedBy: currentUser.id,
    // })

    submitRecipe(fauna, {
      ...values,
      ingredients: parseIngredients(values.ingredients),
      submittedBy: currentUser.id,
    }).then( res => {
      // console.log(res);
      // I dunno
    }).catch( err => {
      // console.log('failed', err);
    })
  }

  return (
    <div
         style={{
          display: "flex",
          flexDirection: "column",
          width: "75vw",
          alignSelf: "center",
          background: "#f1f1f1",
          borderRadius: "12px",
          padding: "1% 2%",
          marginTop: "2%",
        }}
      >Hello
        <form onSubmit={submit}>
          <label>
            <DivLabelStyled>Title:</DivLabelStyled>
            <InputStyled
              type='text'
              name='title'
              value={values.title}
              placeholder={placeholder.title}
              onChange={onChange}
            />
          </label>

          <label>
            <DivLabelStyled>Source:</DivLabelStyled>
            <InputStyled
              type='text'
              name='source'
              value={values.source}
              placeholder={placeholder.source}
              onChange={onChange}
            />
          </label>
          
          <label>
            <DivLabelStyled>Category:</DivLabelStyled>
            <InputStyled
              type='text'
              name='category'
              value={values.category}
              placeholder={placeholder.category}
              onChange={onChange}
            />
          </label>

          <label>
            <DivLabelStyled>Ingredients:</DivLabelStyled>
            <TextAreaStyled
              type='text'
              name='ingredients'
              value={values.ingredients}
              placeholder={placeholder.ingredients}
              onChange={onChange}
            />
          </label>

          <label>
            <DivLabelStyled>Instructions:</DivLabelStyled>
            <TextAreaStyled
              type='text'
              name='instructions'
              value={values.instructions}
              placeholder={placeholder.instructions}
              onChange={onChange}
            />
          </label>

          <button type='submit'>Submit</button>
         </form>
      </div>
  )
}
