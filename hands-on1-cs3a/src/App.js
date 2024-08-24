import logo from './logo.svg';
import './App.css';
import Name from './components/UserInformation/Name/Name';
import Section from './components/UserInformation/Section/Section';
import Details from './components/UserInformation/Details/Details';
import { useState } from 'react';

function App() {

  const [userInformation, setUserInformation] = useState( {   
    firstName: "Jecho",
    middleInitial: "P.",
    lastName: "Torrefranca",
    section: "BSCS-3A",
    description: "I'm currently doing React JS!"});

  const [isDay, setIsDay] = useState(true)

  function updateName() {
    userInformation.firstName = "Kouji";
    setUserInformation({...userInformation})
  }

  function changeTime() {
    setIsDay(!isDay);
  }

  return (
    <div className='App-header'>
        <div className="App">

          <img src={logo} className="App-logo" alt="logo" />

          <Name firstName={userInformation.firstName} 
            middleInitial={userInformation.middleInitial} 
            lastName={userInformation.lastName}/>
          <Section section={userInformation.section}/>
          <Details details={userInformation.description}/>

            <div className={isDay ? 'day' : 'night'}>

            </div>

          <button type='button' className="button" onClick={changeTime}>
            Change Time
          </button>


          <button type='button' className="button" onClick={updateName}>
            Update Name
          </button>

      </div>
    </div>


  );
}

export default App;
