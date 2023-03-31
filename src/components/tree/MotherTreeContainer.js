import D3Tree from "./D3Tree";
import BushNode from "../bush/BushNode";
import { shallowEqual, useSelector } from "react-redux";
import styles from '../tree.module.css'
import React, { useState } from "react";
import {setAllCreatedResources } from "../../util/Resource";
import TreeLoadingStatusMessage from "./TreeLoadingStatusMessage";
import { sendGetTreeDataGetReq } from "../../network/requests";
import useDefaultTreeDimParams from "../../hooks/use-tree-dim-params";





function MotherTreeContainer() {

  console.log('rendering tree container')
  const treeOverlayElementsContainerId = useSelector((state) =>
    state.importantElementIds.treeOverlayElementsContainerId, shallowEqual)

  const treeScale = useSelector((state) => state.scale.treeScale, shallowEqual)

  //tree dimensions
  const defaultTreeDimParams = useDefaultTreeDimParams()


  const [treeData, setTreeData] = useState()
  const [loadingStatusText, setLoadingStatusText] = useState('loading...')

  async function receiveTreeData() {
    try {
      const [treeData, allResources] = await sendGetTreeDataGetReq()

      setTreeData(treeData)
      setAllCreatedResources(allResources)
    } catch (err) {
      setLoadingStatusText('something went wrong :(')
    }

  }

  if (!treeData){
    console.log('treedata not set')
    receiveTreeData()

  }

  // console.log(`renderedTreeWidth ${renderedTreeWidth} renderedTreeHeight ${renderedTreeHeight}`)




  return (

    <>
      {treeData &&
        <D3Tree
          hierarchy={treeData.hierarchy}
          bushPositions={treeData.bushPositions}
          setupTree={true}
          editable={true}
          fadeIn={true}
          nodesGId={'mainNodes'}
          linksGId={'mainLinks'}
          containerGId={'treeContainerG'}
          treeOverlayElementsContainerId={treeOverlayElementsContainerId}
          containerSvgId='treeContainerSvg'
          positionReferenceContainerId={'positionReferenceContainer'}
          brightnessControlGId={'brightnessControlG'}
          resourceConnectionLinesContainerId={'resourceConnectionLinesContainer'}
          resourceIconsContainerId={'resourceIconsContainer'}
          treeScale={treeScale}
          treeDimParams = {defaultTreeDimParams}
          linkClass={styles.mainLink}
          nodeComponentFunc={BushNode} />
      }
      {!treeData && <TreeLoadingStatusMessage msg={loadingStatusText}/>}
    </>


  )
}
export default React.memo(MotherTreeContainer)