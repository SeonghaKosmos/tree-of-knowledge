import { useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { isResourcePositionReevaluationPossibleGlobal, setIsResourcePositionReevaluationPossibleGlobal } from "../../util/positionManager";


export const resourceGraphicsData = {}
export let connectedResourceGraphicsDataIdsGlobal = []
export let potentialconnectedResourceGraphicsDataIdsGlobal = []

export function useResourceIconGraphicsManager(thisResource) {

    // const [brightnessControlGId] = useSelector((state) => state.importantElementIds.brightnessControlGId)
    const visionScale = useSelector(state => state.zoom.visionScale, shallowEqual)

    let prevDatumState = undefined;
    if (thisResource) {
        prevDatumState = resourceGraphicsData[thisResource.id]
    }

    let variables = undefined;
    const potentialVariables = useRef({ //does not trigger re-render when updated
        position: {
            x: 0,
            y: 0
        },
        isResourcePositionReevaluationPossible: true
    })


    let isConnectedTemp = false
    let isConnectionLinesVisibleTemp = false
    let delayLightUpStyleTemp = false
    //leave variables reference unchanged if there is a reference
    if (prevDatumState) {
        variables = prevDatumState.variables

        isConnectedTemp = prevDatumState.state.isConnected
        isConnectionLinesVisibleTemp = prevDatumState.state.isConnectionLinesVisible
        delayLightUpStyleTemp = prevDatumState.state.isConnectionLinesVisible.delayLightUpStyle
    } else {
        //define new reference if there is no previous reference
        variables = potentialVariables
    }



    const [state, setState] = useState({ //triggers re-render when updated
        isConnected: isConnectedTemp,
        isConnectionLinesVisible: isConnectionLinesVisibleTemp,
        delayLightUpStyle: delayLightUpStyleTemp
    })


    const actions = {
        commitState() { //commit changes and trigger rerender
            const temp = { ...state }
            setState(temp) //set state to modified copy to trigger rerender
        },
        setIsResourcePositionReevaluationPossible(val) {
            resourceGraphicsData[thisResource.id].variables.isResourcePositionReevaluationPossible = val
        },
        getConnectedResourceGraphicsDataIds() {

            const connectedIds = [...thisResource.connections]
            const connectedResourceGraphicsData = [thisResource.id, ...connectedIds]

            //set potention connected icons to just evaluated icons
            potentialconnectedResourceGraphicsDataIdsGlobal = [...connectedResourceGraphicsData]
            return connectedResourceGraphicsData
        },
        updateConnectedResourceIconPositions() {

            updateResourceIconPositions(this.getConnectedResourceGraphicsDataIds())

        },
        setIsConnectionLinesVisible(isConnectionLinesVisible) {

            state.isConnectionLinesVisible = isConnectionLinesVisible

        },
        //master function that handles all connection related events
        setIsConnected(isConnected) {
            resetAllResourceIcons()
            if (isConnected) {
                //clicked to confirm icon connected: potential=real
                connectedResourceGraphicsDataIdsGlobal = [...potentialconnectedResourceGraphicsDataIdsGlobal]

                //update connected status for all connected resources
                this.getConnectedResourceGraphicsDataIds().map((id) => {
                    const connectedresourceGraphicsDatum = resourceGraphicsData[id]


                    connectedresourceGraphicsDatum.state.isConnected = isConnected
                    //light up delay for thisResource
                    connectedresourceGraphicsDatum.state.delayLightUpStyle = true
                    connectedresourceGraphicsDatum.actions.commitState()

                })

                state.delayLightUpStyle = false


                //update stuff in thisResource
                state.isConnected = isConnected
                this.setIsConnectionLinesVisible(isConnected)
                handleTreeContainer(isConnected)
                this.commitState()
            }



        },
        storeAbsolutePosition(position, centerPosition) {

            variables.current.position.topLeft = position
            variables.current.position.center = centerPosition
        }
    }


    //store datum in resource data if this resource parameter given
    if (thisResource) {


        const resourceGraphicsDatum = {
            thisResource,
            variables,
            actions,
            state,
            setState,
        }

        // console.log(resourceGraphicsDatum)

        resourceGraphicsData[thisResource.id] = resourceGraphicsDatum


        return [resourceGraphicsDatum, actions, visionScale] //make vision scale selector in manager
    }

    return actions

}




export function useresourceGraphicsDatumSelector(id) {
    return resourceGraphicsData[id]
}


export function handleTreeContainer(isConnected) {

    const brightnessControlG = document.getElementById('brightnessControlG')
    if (isConnected) {
        brightnessControlG.style.filter = 'brightness(60%)'

    } else {
        brightnessControlG.style.filter = 'brightness(100%)'

    }
}

export function resetAllResourceIcons() { //erase all connections
    Object.keys(resourceGraphicsData).map((id) => {
        const resourceGraphicsDatum = resourceGraphicsData[id]

        resourceGraphicsDatum.state.isConnected = false
        resourceGraphicsDatum.state.delayLightUpStyle = false
        resourceGraphicsDatum.actions.setIsConnectionLinesVisible(false)
        handleTreeContainer(false)
        resourceGraphicsDatum.actions.commitState()
    })

    // setIsResourcePositionReevaluationPossibleGlobal(true)
}

export function updateResourceIconPositions(ids) {
    if (isResourcePositionReevaluationPossibleGlobal()) {
        ids.forEach(function (id) {

            resourceGraphicsData[id].actions.setIsResourcePositionReevaluationPossible(true)
            resourceGraphicsData[id].actions.commitState()

        });
    }
}

export function getGraphicsDataFromIds(idList) {
    const graphicsData = {}
    idList.map((id) => graphicsData[id] = resourceGraphicsData[id])
    return graphicsData
}




