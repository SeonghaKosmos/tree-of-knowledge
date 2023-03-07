import './App.css';
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useEffect, useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import './global.css'
import { handleTreeContainer, resetAllResourceIcons } from './hooks/resource-icon/use-resource-icon-graphics-manager';
import { getZoomParams } from './util/positionManager';
import setupZoom from './util/tree/setupZoom';
import setupMotherTree from './util/tree/setupMotherTree';



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
        <TreeOfKnowledgeContainer />
      </div>

      {/* <span className="nav-icon"></span> */}
      <BootStrapNavBar ref={navBar} />
    </div>



  );
}

export default App;
