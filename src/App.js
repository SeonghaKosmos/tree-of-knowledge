import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useEffect, useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'
import { useResourceIconGraphicsManager } from './hooks/resource-icon/use-resource-icon-graphics-manager'; 
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'd3';
import {renderedDimensionsActions } from './store/store';



function App() {

  console.log('rendering app')

  const appDiv = useRef()
  const navBar = useRef()

  const navBarHeight = navBar.current==undefined ? 0 : navBar.current.offsetHeight

  //zoomwindow

  let availableTreeDimensionsComputationComplete = useRef(false)

//<dimensions>
  const dispatch = useDispatch()

  function storeScreenDimensions() {
    dispatch(renderedDimensionsActions.setScreenDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    }))
  }

  useEffect(() => {
    storeScreenDimensions()
  }, []) 

  const [screenWidth, screenHeight] = useSelector(
    state => [state.renderedDimensions.screenWidth, 
      state.renderedDimensions.screenHeight], shallowEqual)

  const computeRenderedTreeDimensions = () => {
    if (!availableTreeDimensionsComputationComplete.current){
      return [
        screenWidth,
        screenHeight - navBar.current.offsetHeight
      ]
    }
    return null
  }


  const [availableTreeWidth, availableTreeHeight, doDimensionsUpdate] = 
    useDimensions(computeRenderedTreeDimensions)

  dispatch(renderedDimensionsActions.setZoomableScreenDimensions({
    width: availableTreeWidth,
    height: availableTreeHeight
  }))

//</dimensions>
  const resourceIconsDataManagerActions = useResourceIconGraphicsManager()


  window.onresize = function(){
    //enable dimensions update
    doDimensionsUpdate.current = true;
    storeScreenDimensions()
  }

  const onClick = () => {
    resourceIconsDataManagerActions.resetAllResourceIcons()
    resourceIconsDataManagerActions.handleTreeContainer(false)
  }

  return (


      <div className="App" ref={appDiv} onClick={onClick}>

        <div id='centeringContainer'>
          <TreeOfKnowledgeContainer 
            availableTreeWidth={availableTreeWidth}
            availableTreeHeight={availableTreeHeight}/>
        </div>

        {/* <span className="nav-icon"></span> */}
        <BootStrapNavBar ref={navBar}/>
      </div>

   
  );
}

export default App;
