import D3Tree from "./D3Tree";
import BushNode from "../bush/BushNode";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from '../tree.module.css'
import React, { useState } from "react";
import axios from 'axios';
import { allCreatedResources, setAllCreatedResources } from "../../util/Resource";
import LoadingMessage from "./LoadingMessage";





function TreeOfKnowledgeContainer() {

  console.log('rendering tree container')
  const treeOverlayElementsContainerId = useSelector((state) =>
    state.importantElementIds.treeOverlayElementsContainerId, shallowEqual)

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



  const [treeData, setTreeData] = useState()

  if (!treeData){
    axios.get('http://localhost:3001')
    .then(res => {
      console.log(res.data)
      setTreeData(res.data.treeData)
      setAllCreatedResources({...res.data.allResources})
      // console.log(allCreatedResources)
    })
    .catch(e => {
      console.log(e)
    })
  }

  // console.log(`renderedTreeWidth ${renderedTreeWidth} renderedTreeHeight ${renderedTreeHeight}`)




  return (

    <>
      {treeData &&
        <D3Tree
          data={treeData}
          setupMotherTree={true}
          editable={true}
          fadeIn={true}
          nodesGId={nodesGId}
          linksGId={linksGId}
          containerGId={containerGId}
          treeOverlayElementsContainerId={treeOverlayElementsContainerId}
          containerSvgId='treeContainerSvg'
          positionReferenceContainerId={'positionReferenceContainer'}
          brightnessControlGId={'brightnessControlG'}
          resourceConnectionLinesContainerId={'resourceConnectionLinesContainer'}
          resourceIconsContainerId={'resourceIconsContainer'}
          treeWidth={treeWidth}
          treeHeight={treeHeight}
          treeScale={treeScale}
          nodeWidth={bushWidth}
          nodeHeight={bushHeight}
          nodePadding={bushPadding}
          linkClass={styles.mainLink}
          nodeComponentFunc={BushNode} />
      }
      {!treeData && <LoadingMessage/>}
    </>


  )
}
export default React.memo(TreeOfKnowledgeContainer)