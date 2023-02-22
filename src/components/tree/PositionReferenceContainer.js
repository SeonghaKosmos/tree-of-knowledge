import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import styles from './overlayed-elements-container.module.css'
import React from "react";

const PositionReferenceContainerRoot = styled.div`

    position: relative;
    pointer-events: none;
    width: 700px;
    height: 700px;

`

function PositionReferenceContainer(){

    const treeOverlayElementsContainerId = useSelector((state) => 
        state.importantElementIds.treeOverlayElementsContainerId, shallowEqual)

    const [renderedTreeWidth, renderedTreeHeight] = 
        useSelector(state => [state.renderedDimensions.renderedTreeWidth, state.renderedDimensions.renderedTreeHeight])


    return(
        <foreignObject width={renderedTreeWidth} height={renderedTreeHeight} className={styles.treeOverlayElementsContainerContainerForeignObject}>
            <PositionReferenceContainerRoot id={'positionReferenceContainer'}/>
        </foreignObject>
    )
}
export default React.memo(PositionReferenceContainer)