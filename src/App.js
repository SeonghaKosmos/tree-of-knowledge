import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useEffect, useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'
import { useResourceIconGraphicsManager } from './hooks/use-resource-icon-graphics-manager';
import usePositionSimulation from './hooks/use-positions-simulation';
import { useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'd3';
import { dimensionSliceActions } from './store/store';


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
    dispatch(dimensionSliceActions.setScreenWidth(window.innerWidth))
    dispatch(dimensionSliceActions.setScreenHeight(window.innerHeight))
  }
  //store initial screen dimensions
  useEffect(() => storeScreenDimensions(), []) 
  const [screenWidth, screenHeight] = useSelector(state => [state.dimensions.screenWidth, state.dimensions.screenHeight])
  const computeRenderedTreeDimensions = () => {
    if (!availableTreeDimensionsComputationComplete.current){
      return [
        screenWidth,
        screenHeight - navBar.current.offsetHeight
      ]
    }
    return null
  }
//</dimensions>

 //<hooks>
  const [availableTreeWidth, availableTreeHeight, doDimensionsUpdate] = 
    useDimensions(computeRenderedTreeDimensions)

  const resourceIconsDataManagerActions = useResourceIconGraphicsManager()
  usePositionSimulation() //trigger storage of positions at each visionScale (render tree num-visionscales times)
 //</hooks>

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
        <BootStrapNavBar ref={navBar}/>
      </div>

    </AppRoot>
  );
}

export default App;
