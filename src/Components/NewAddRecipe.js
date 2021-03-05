import React, { useState, useContext } from "react";
import styled from "styled-components";
// import { RiCloseFill } from "react-icons/ri";
import useFauna, { submitRecipe, updateRecipe, deleteRecipe } from "../FaunaAPI/FaunaAPI";
import { DashContext } from "../Contexts";
import { DivMainStyled } from './SharedStyles';

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

function parseIngredientsArray(ingredients){
  return ingredients !== ''
    ? ingredients.join('\n')
    : [];
}

function parseIngredientsString(ingredients){
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
  
  const initialValues = props.recipe === undefined ? blankValues : { ...props.recipe, ingredients: parseIngredientsArray(props.recipe.ingredients)};
  const [values, setValues] = useState(initialValues);
  const [readyToDelete, setReadyToDelete] = useState(false); 

  function deleteFunction(evt){
    const evtValue = evt.target.value;
    if(readyToDelete === false){
      setReadyToDelete(true);
    } else {
      console.log(evtValue)
      if(evtValue === 'true'){
        deleteRecipe(fauna, props.recipe.id)
          .then( res => {
            window.location.reload();
          })
          .catch( err => console.log(err))
      } else {
        setReadyToDelete(false);
      }
    }
  }

  function onChange(evt){
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value});
  }

  function addNew(){
    submitRecipe(fauna, {
      ...values,
      ingredients: parseIngredientsString(values.ingredients),
      submittedBy: currentUser.id,
    }).then( res => {
      // console.log(res);
      // I dunno
    }).catch( err => console.log(err))
  }

  function update(){
    updateRecipe(fauna, props.recipe.id, {...values, ingredients: parseIngredientsString(values.ingredients)})
      .then( (res) => {
        // console.log(res)
        // window.location.reload();
      })
      .catch( err => console.log(err))
  }

  function submit(evt){
    evt.preventDefault();
    props.recipe === undefined
      ? addNew()
      : update();
    window.location.reload();
  }

  return (
    <DivMainStyled noPadding={props.recipe !== undefined}>
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
          
          <div>
            <button type='submit'>Submit</button>
          </div>

          <div>
            {props.recipe !== undefined && <button type='button' onClick={props.getBack}>Cancel</button>}
          </div>

          <div>
            {readyToDelete === true && <h5>Are you sure you're ready to delete this recipe?</h5>}
            {readyToDelete === true && <button type='button' value='false' onClick={deleteFunction}>Cancel</button>}
            {props.recipe !== undefined && <button type='button' value='true' onClick={deleteFunction}>Delete</button>}
          </div>
         </form>
      </DivMainStyled>
  )
}
