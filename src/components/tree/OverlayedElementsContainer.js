import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import styles from './overlayed-elements-container.module.css'

const OverlayedElementsContainerRoot = styled.div`

    position: relative;
    width: 1287px;
    height: 930px;
    pointer-events: none;

    .resourceConnectionLinesContainer{
        pointer-events: none;
    }

    .resourceConnectionLinesContainerContainerForeignObject{
        pointer-events: none;
    }

`

function OverlayedElementsContainer(){

    const resourceConnectionLinesContainerId = useSelector((state) => 
        state.importantElementIds.resourceConnectionLinesContainerId, shallowEqual)


    return(
        <foreignObject width={1287} height={930} className={styles.resourceConnectionLinesContainerContainerForeignObject}>
            <OverlayedElementsContainerRoot>
                <svg width={1287} height={930} 
                id={resourceConnectionLinesContainerId}
                className='resourceConnectionLinesContainer'>
                    <g id='connectionLinesContainer'/>
                    <g id='resourceIconsContainer'/>
                </svg>
            </OverlayedElementsContainerRoot>
        </foreignObject>
    )
}
export default OverlayedElementsContainer