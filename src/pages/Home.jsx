import React, { useState, useEffect } from 'react';
import { getQuestionnaires } from '../services/questionnaireService';
import style from './Home.module.css';
import Title from '../components/Title';
import Input from '../components/Input';
import DropDown from '../components/DropDown';
import Loader from '../components/Loader';

const Home = props => {

  const [questionnaire, setQuestionnaire] = useState({});
  const [errorDescription, setErrorDescription] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);
    const response = await getQuestionnaires();
    if (response.success === true) {
      setQuestionnaire(response.data);
    }
    else {
      setErrorDescription(response.errorDescription);
    }
    setIsLoading(false);
  };


  const setFormSection = question => {
    switch (question.type) {
      case 'title':
        return <Title key={question.id} question={question} />;
      case 'dropdown':
        return <DropDown key={question.id} question={question} handleChange={handleChange} />;
      case 'input':
        return <Input key={question.id} question={question} handleChange={handleChange} />;
      default:
        return ''
    };
  };

  const handleChange = event => {
    console.log('event: ', event)
    console.log('checked: ', event.target.checked)
    let inputs = [...inputFields];
    const name = event.target.name;
    const selectedValue = event.target.value;
    const newItem = { name: name, value: selectedValue };
    const result = inputs.find((question, index) => {
      if (question.name === name) {
        inputs[index] = newItem;
        return true;
      }
      else if (question.otherName === name) {
        inputs[index] = newItem;
        return true;
      }
    });
    if (result === undefined) {
      inputs = [...inputFields, newItem];
    }
    setInputFields(inputs);
  };

  const verifForm = () => {
    let result = false;
    const requiredFields = questionnaire.questions.filter(question => question.isRequired === true).map(item => item.name);
    const fieldsname = inputFields.map(item => item.name);
    let allExist = requiredFields.every(item => fieldsname.includes(item));
    if (allExist) {
      let valueEmptyFound = inputFields.some(item => (requiredFields.includes(item.name) && (item.value === undefined || item.value === '')));
      if (!valueEmptyFound) {
        result = true;
      }
    }
    return result;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const result = verifForm();
    if (result) {
      setErrorDescription(null);
      setIsSuccess(true);
      console.log('inputFields: ', inputFields);
      //send inputFields data to api
    }
    else {
      setErrorDescription('Please fill all the mandatory fields.');
    }
  };

  return <>
    <div className={style.container}>
      {isSuccess && <div className={style.successContainer}><p>Form send successfully!</p></div>}
      {errorDescription && <div className={style.errorContainer}><p>{errorDescription}</p></div>}
      {isLoading ? <Loader /> :
        <form onSubmit={handleSubmit}>
          {questionnaire.questions && questionnaire.questions.map(question => setFormSection(question))}
          {questionnaire.questions && <div><input type="submit" className={style.buttonSubmit} value="Submit" /></div>}
        </form>}
    </div>
  </>
}

export default React.memo(Home);