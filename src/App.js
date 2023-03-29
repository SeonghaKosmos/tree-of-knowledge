import './App.css';
import MotherTreeContainer from './components/tree/MotherTreeContainer';
import { useEffect, useRef, useState } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import './global.css'
import { handleTreeContainer, resetAllResourceIcons } from './hooks/resource-icon/use-resource-icon-graphics-manager';
import React from "react";



function App() {

  console.log('rendering app')

  const appDiv = useRef()
  const navBar = useRef()



  useEffect(() => {
    document.getElementById('App').addEventListener('mousemove', onAppMouseMoved)
  }, [])


  //</dimensions>

  const onAppClicked = (event) => {
    resetAllResourceIcons()
    handleTreeContainer(false)
    console.log('click')

  }

  const onAppMouseMoved = (event) => {
    event.stopPropagation()
  }


  return (


    <div id="App" ref={appDiv} onClick={onAppClicked}>

      <div className='centeringContainer'>
        <MotherTreeContainer />
      </div>

      {/* <span className="nav-icon"></span> */}
      <BootStrapNavBar ref={navBar} />
    </div>



  );
}

export default React.memo(App);
