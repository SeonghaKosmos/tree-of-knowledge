import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useEffect, useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'
import { useResourceIconGraphicsManager } from './hooks/resource-icon/use-resource-icon-graphics-manager'; 
import usePositionSimulation from './hooks/resource-icon/use-positions-simulation';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'd3';
import {renderedDimensionsActions } from './store/store';


const AppRoot = styled.div`

  & #zoomWindow{
    /* position:absolute; */
    /* top: ${props => (`${props.navBarHeight}px`)}; */
    /* left:0 ; */
    /* width: ${props => (`${props.availableTreeWidth}px`)};
    height: ${props => (`${props.availableTreeHeight}px`)}; */
    flex-grow: 1;
    width: 100%;
  }

  & #mainContainer{

    /* width: ${props => (`${props.availableTreeWidth}px`)};
    height: ${props => (`${props.availableTreeHeight}px`)}; */
    /* position: absolute; */
    /* border: 1px solid green; */
    width:100%;
    height: 100%;
    max-width: ${props => (`${props.availableTreeWidth}px`)};
    max-height: ${props => (`${props.availableTreeHeight}px`)};

    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .nav-icon{
    display: inline-block;
    width:30px;
    height: 30px;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    background-position: center;
    background-size: 100%;
  }
  
`

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

  const [screenWidth, screenHeight] = useSelector(state => [state.renderedDimensions.screenWidth, state.renderedDimensions.screenHeight])

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
  usePositionSimulation() //trigger storage of positions at each visionScale (render tree num-visionscales times)


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
    <AppRoot 
    availableTreeWidth={availableTreeWidth}
    availableTreeHeight={availableTreeHeight}
    onClick={onClick}>

      <div className="App" ref={appDiv}>
        <div id='zoomWindow'>
          <div id='mainContainer'>
            <TreeOfKnowledgeContainer 
              availableTreeWidth={availableTreeWidth}
              availableTreeHeight={availableTreeHeight}/>
          </div>
        </div>
        {/* <span className="nav-icon"></span> */}
        <BootStrapNavBar ref={navBar}/>
      </div>

    </AppRoot>
  );
}

export default App;
