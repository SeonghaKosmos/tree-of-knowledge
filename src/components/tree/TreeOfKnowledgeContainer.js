import D3Tree from "./D3Tree";
import BushNode from "../bush/BushNode";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from '../tree.module.css'
import React, { useEffect } from "react";





function TreeOfKnowledgeContainer() {

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





  // console.log(`renderedTreeWidth ${renderedTreeWidth} renderedTreeHeight ${renderedTreeHeight}`)




  return (
    <>

      <D3Tree
        data={data}
        setupMotherTree={true}
        editable={true}
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

    </>

  )
}
export default React.memo(TreeOfKnowledgeContainer)