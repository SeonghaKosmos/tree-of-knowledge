import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'


const AppRoot = styled.div`

  position:relative;
  & #zoomWindow{
    position:absolute;
    top: ${props => (`${props.navBarHeight}px`)};
    /* left:0 ; */
    width: ${props => (`${props.availableTreeWidth}px`)};
    height: ${props => (`${props.availableTreeHeight}px`)};
  }

  & #mainContainer{

    width: ${props => (`${props.availableTreeWidth}px`)};
    height: ${props => (`${props.availableTreeHeight}px`)};
    position: absolute;
    /* border: 1px solid green; */

    display: flex;
    align-items: center;
    justify-content: center;
  }
  
`

function App() {

  const appDiv = useRef()
  const navBar = useRef()

  const navBarHeight = navBar.current==undefined ? 0 : navBar.current.offsetHeight

  //zoomwindow

  let availableTreeDimensionsComputationComplete = useRef(false)


  const computeRenderedTreeDimensions = () => {
    if (!availableTreeDimensionsComputationComplete.current){
      return [
        appDiv.current.offsetWidth,
        appDiv.current.offsetHeight - navBar.current.offsetHeight
      ]
    }
    return null
  }


  const [availableTreeWidth, availableTreeHeight] = 
    useDimensions(computeRenderedTreeDimensions)

  // useEffect(()=>{
  //   if (!availableTreeDimensionsComputationComplete.current){
  //     setAvailableTreeWidth(appDiv.current.offsetWidth)
  //     setAvailableTreeHeight(appDiv.current.offsetHeight - navBar.current.offsetHeight)
  //     availableTreeDimensionsComputationComplete.current = true
  //   }
    
  // })

  return (
    <AppRoot 
        availableTreeWidth={availableTreeWidth}
        availableTreeHeight={availableTreeHeight}
        navBarHeight={navBarHeight}>
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
