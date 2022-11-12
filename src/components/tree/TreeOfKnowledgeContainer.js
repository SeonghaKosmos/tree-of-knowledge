import styled from "styled-components";
import D3Tree from "./D3Tree";
import BushNode from "../bush/BushNode";
import { shallowEqual, useSelector } from "react-redux";
import styles from '../tree.module.css'
import React from "react";
import useZoom from "../../hooks/use-zoom";
import useDimensions from "../../hooks/use-dimensions";



const TreeOfKnowledgeContainerRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};
    /* border:1px solid red; */
    
    scale: ${props => (props.scale)};

    /* z-index: -1; */

    & #treeContainerG{
      position:relative;
    }

    & #treeContainerSvg{
      overflow: visible;
    }

    & #${props => (props.zoomActionTargetDivId)}{
      width: ${props => (`${props.width}px`)};
      height: ${props => (`${props.height}px`)};
      position:relative;
    }

`


function TreeOfKnowledgeContainer(props){

    console.log('rendering tree container')
    const [data, resourceConnectionLinesContainerId] = useSelector((state) => [
      state.treeData.structure, 
      state.importantElementIds.resourceConnectionLinesContainerId], shallowEqual)
    const visionScale = useSelector((state) => state.zoom.visionScale, shallowEqual)
    const scale = useSelector((state) => state.scale.treeScale, shallowEqual)


    //tree dimensions
    const [treeWidth, treeHeight] = useSelector((state) => [
      state.dimensions[visionScale].treeWidth, 
      state.dimensions[visionScale].treeHeight], shallowEqual)


    const [bushWidth, bushHeight, bushPadding] = useSelector((state) => [
      state.dimensions[visionScale].bushWidth, 
      state.dimensions[visionScale].bushHeight, 
      state.dimensions.bushPadding], shallowEqual)



    const nodesGId = "mainNodes"
    const linksGId = "mainLinks"
    const containerGId = useSelector((state) => 
      state.importantElementIds.treeContainerGId, shallowEqual)

    const zoomActionTargetDivId = 'zoomActionTargetDiv'

    const treeContainerG = document.getElementById('treeContainerG')
    
    const computeRenderedTreeDimensions = () => 
      [
        treeContainerG.getBoundingClientRect().width / scale, //width  
        treeContainerG.getBoundingClientRect().height / scale //height
      ]
    

    const [renderedTreeWidth, renderedTreeHeight] = 
      useDimensions(computeRenderedTreeDimensions, treeWidth, treeHeight)

    useZoom(
      `#${containerGId}`, 
      '#zoomWindow', 
      renderedTreeWidth, 
      renderedTreeHeight)
    



    return(
        <TreeOfKnowledgeContainerRoot 
              id='treeOfKnowledgeContainerRoot' 
              zoomActionTargetDivId={zoomActionTargetDivId}
              width={renderedTreeWidth} 
              height={renderedTreeHeight} 
              scale={scale}>  

            <D3Tree 
              data={data} 
              nodesGId={nodesGId} 
              linksGId={linksGId}
              containerGId={containerGId}
              resourceConnectionLinesContainerId={resourceConnectionLinesContainerId}
              containerSvgId='treeContainerSvg'
              treeWidth={treeWidth}
              treeHeight={treeHeight}
              nodeWidth={bushWidth}
              nodeHeight={bushHeight}
              nodePadding={bushPadding}
              linkClass={styles.mainLink}
              nodeComponentFunc={BushNode}/> 
             
        </TreeOfKnowledgeContainerRoot>

    )
}
export default React.memo(TreeOfKnowledgeContainer)