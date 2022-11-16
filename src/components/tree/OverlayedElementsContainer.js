import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import styles from './overlayed-elements-container.module.css'

const OverlayedElementsContainerRoot = styled.div`

    position: relative;
    width: 1287px;
    height: 930px;
    pointer-events: none;

    .treeOverlayElementsContainer{
        pointer-events: none;
    }

    .treeOverlayElementsContainerContainerForeignObject{
        pointer-events: none;
    }

`

function OverlayedElementsContainer(){

    const treeOverlayElementsContainerId = useSelector((state) => 
        state.importantElementIds.treeOverlayElementsContainerId, shallowEqual)

    const [renderedTreeWidth, renderedTreeHeight] = 
        useSelector(state => [state.renderedDimensions.renderedTreeWidth, state.renderedDimensions.renderedTreeHeight])


    return(
        <foreignObject width={renderedTreeWidth} height={renderedTreeHeight} className={styles.treeOverlayElementsContainerContainerForeignObject}>
            <OverlayedElementsContainerRoot>
                <svg width={renderedTreeWidth} height={renderedTreeHeight} 
                id={treeOverlayElementsContainerId}
                className='treeOverlayElementsContainer'>
                    <g id='connectionLinesContainer'/>
                    <g id='resourceIconsContainer'/>
                </svg>
            </OverlayedElementsContainerRoot>
        </foreignObject>
    )
}
export default OverlayedElementsContainer