import styled from "styled-components";
import D3Tree from "./D3Tree";
import BushNode from "../bush/BushNode";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from '../tree.module.css'
import React, { useEffect } from "react";
import useZoom from "../../hooks/use-zoom";
import useDimensions from "../../hooks/use-dimensions";
import { renderedDimensionsActions } from "../../store/store";
import { getRenderedDimensions } from "../../util/DimensionsLogic";
import { scale } from "../../store/visuals/zoomSlice";



const TreeOfKnowledgeContainerRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};
    /* border:1px solid red; */
    
    scale: ${props => (props.scale)};


    & #treeContainerG{
      position:relative;
      /* visibility: visible; */
      pointer-events: visible;
      border: 2px solid black;
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
    const [data, treeOverlayElementsContainerId] = useSelector((state) => [
      state.treeData.structure, 
      state.importantElementIds.treeOverlayElementsContainerId], shallowEqual)
    const treeScale = useSelector((state) => state.scale.treeScale, shallowEqual)

    //tree dimensions
    const [treeWidth, treeHeight] = useSelector((state) => [
      state.dimensions.treeWidth, 
      state.dimensions.treeHeight], shallowEqual)


    const [bushWidth, bushHeight, bushPadding] = useSelector((state) => [
      state.dimensions.bushWidth, 
      state.dimensions.bushHeight, 
      state.dimensions.bushPadding], shallowEqual)



    const nodesGId = "mainNodes"
    const linksGId = "mainLinks"
    const containerGId = useSelector((state) => 
      state.importantElementIds.treeContainerGId, shallowEqual)

    const zoomActionTargetDivId = 'zoomActionTargetDiv'

    



    useDimensions(treeScale)





    // console.log(`renderedTreeWidth ${renderedTreeWidth} renderedTreeHeight ${renderedTreeHeight}`)

    useZoom('treeContainerSvg', `${containerGId}`)
    



    return(
        <TreeOfKnowledgeContainerRoot 
              id='treeOfKnowledgeContainerRoot' 
              zoomActionTargetDivId={zoomActionTargetDivId}
              // width={renderedTreeWidth} 
              // height={renderedTreeHeight} 
              scale={treeScale}>  

            <D3Tree 
              data={data} 
              nodesGId={nodesGId} 
              linksGId={linksGId}
              containerGId={containerGId}
              treeOverlayElementsContainerId={treeOverlayElementsContainerId}
              containerSvgId='treeContainerSvg'
              treeWidth={treeWidth}
              treeHeight={treeHeight}
              treeScale={treeScale}
              nodeWidth={bushWidth}
              nodeHeight={bushHeight}
              nodePadding={bushPadding}
              linkClass={styles.mainLink}
              nodeComponentFunc={BushNode}/> 
             
        </TreeOfKnowledgeContainerRoot>

    )
}
export default React.memo(TreeOfKnowledgeContainer)