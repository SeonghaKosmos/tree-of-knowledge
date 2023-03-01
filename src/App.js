import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useEffect, useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'
import { handleTreeContainer, resetAllResourceIcons, useResourceIconGraphicsManager } from './hooks/resource-icon/use-resource-icon-graphics-manager';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { dispatch } from 'd3';
import { renderedDimensionsActions } from './store/store';



function App() {

  console.log('rendering app')

  const appDiv = useRef()
  const navBar = useRef()

  const navBarHeight = navBar.current == undefined ? 0 : navBar.current.offsetHeight

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
    document.getElementById('App').addEventListener('mousemove', onAppMouseMoved)
  }, [])


  //</dimensions>
  const resourceIconsDataManagerActions = useResourceIconGraphicsManager()


  window.onresize = function () {
    //enable dimensions update
    storeScreenDimensions()
  }

  const onAppClicked = (event) => {
    resetAllResourceIcons()
    handleTreeContainer(false)
    console.log('click')


  }

  const onAppMouseMoved = (event) => {
    event.stopPropagation()
  }


  // const onHoverPanDetectorMouseMoved = (event) => {
  //   console.log('onHoverPanDetectorMouseMoved')
  // }


  return (


    <div id="App" ref={appDiv} onClick={onAppClicked}>

      <div className='centeringContainer'>
        <TreeOfKnowledgeContainer />
      </div>

      {/* <span className="nav-icon"></span> */}
      <BootStrapNavBar ref={navBar} />
    </div>



  );
}

export default App;
