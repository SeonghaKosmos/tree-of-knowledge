import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import TreeOfKnowledgeContainer from './components/tree/TreeOfKnowledgeContainer';
import { useRef } from 'react';
import BootStrapNavBar from './components/GUI/BootStrapNavBar';
import useDimensions from './hooks/use-dimensions';
import './global.css'


const AppRoot = styled.div`
  & #zoomWindow{
    position:relative;
    z-index: 9;
    top:0;
    left:0;
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
  position:relative;
  
`

function App() {

  const appDiv = useRef()
  const navBar = useRef()

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
        availableTreeHeight={availableTreeHeight}>
      <div className="App" ref={appDiv}>
        <BootStrapNavBar ref={navBar}/>
        <div id='mainContainer'>
          <TreeOfKnowledgeContainer 
            availableTreeWidth={availableTreeWidth}
            availableTreeHeight={availableTreeHeight}/>
        </div>
        <div id='zoomWindow'/>

      </div>
    </AppRoot>
  );
}

export default App;
