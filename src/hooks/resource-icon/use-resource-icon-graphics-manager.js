import { useRef, useState } from "react";
import { useSelector, shallowEqual} from "react-redux";
import { approxEqual } from "../../util/MathStuff";
import { isResourcePositionsStabilized, setIsResourcePositionReevaluationPossible, setIsResourcePositionsStabilized } from "../../util/positionManager";


export const resourceGraphicsData = {}
const resourceIconPositionUpdateCounts = {
    bushScale: 0,
    subBushScale: 0
}

let positionUnchangedCheckResults = {
    bushScale: {},
    subBushScale: {}
}


export function useResourceIconGraphicsManager(thisResource) {

    // const [opacityControlGId] = useSelector((state) => state.importantElementIds.opacityControlGId)
    const visionScale = useSelector(state => state.zoom.visionScale, shallowEqual)

    let prevDatumState = undefined;
    if (thisResource){
        prevDatumState = resourceGraphicsData[thisResource.id]
    }
    
    let variables = undefined;
    const potentialVariables = useRef({ //does not trigger re-render when updated
        position: {
            bushScale: {
                center: {x:0, y:0},
                topLeft: {x:0, y:0}
            },
            subBushScale: {
                center: {x:0, y:0},
                topLeft: {x:0, y:0}
            }
        }
    })


    let isConnectedTemp = false
    let isConnectionLinesVisibleTemp = false
    //leave variables reference unchanged if there is a reference
    if (prevDatumState){
        variables = prevDatumState.variables

        isConnectedTemp = prevDatumState.state.isConnected
        isConnectionLinesVisibleTemp = prevDatumState.state.isConnectionLinesVisible
    } else {
        //define new reference if there is no previous reference
        variables = potentialVariables
    }



    const [state, setState] = useState({ //triggers re-render when updated
        isConnected: isConnectedTemp,
        isConnectionLinesVisible: isConnectionLinesVisibleTemp
    })


    const actions = {
        commitState() { //commit changes and trigger rerender
            const temp = {...state}
            setState(temp) //set state to modified copy to trigger rerender
        },
        setIsConnectionLinesVisible (isConnectionLinesVisible) {

            state.isConnectionLinesVisible = isConnectionLinesVisible

        },
        resetAllResourceIcons() { //erase all connections
            Object.keys(resourceGraphicsData).map((id) => {
                const resourceGraphicsDatum = resourceGraphicsData[id]

                resourceGraphicsDatum.state.isConnected = false
                resourceGraphicsDatum.actions.setIsConnectionLinesVisible(false)
                this.handleTreeContainer(false)
                resourceGraphicsDatum.actions.commitState()
            })
        },
        handleTreeContainer(isConnected){
            
            const opacityControlG = document.getElementById('opacityControlG')
            if (isConnected){
                opacityControlG.style.filter = 'brightness(60%)'

            } else{
                opacityControlG.style.filter = 'brightness(100%)'

            }
        },
        //master function that handles all connection related events
        setIsConnected (isConnected) { 

            if (isConnected){
                this.resetAllResourceIcons()
            }

            //update connected status for all connected resources
            thisResource.connections.map((connectedResource)=>{
                const connectedresourceGraphicsDatum = resourceGraphicsData[connectedResource.id]

                setTimeout(() => { //set delay to ensure resourceIcon rerenders go over connection lines
                    connectedresourceGraphicsDatum.state.isConnected = isConnected
                    connectedresourceGraphicsDatum.actions.commitState()
                }, 1)
            })  // update connection visibility of connected resources


            //update stuff in thisResource
            state.isConnected = isConnected
            this.setIsConnectionLinesVisible(isConnected)
            this.handleTreeContainer(isConnected)
            this.commitState()


        },
        storeAbsolutePosition(position, centerPosition){

            variables.current.position[visionScale].topLeft = position
            variables.current.position[visionScale].center = centerPosition

            resourceIconPositionUpdateCounts[visionScale] ++
            

            // stop position reports when all resource icons have reported
            if (resourceIconPositionUpdateCounts[visionScale] === 
                Object.keys(resourceGraphicsData).length * 10){ //20 reloads for stabilization
                //reset update count
                resourceIconPositionUpdateCounts[visionScale] = 0
                setIsResourcePositionReevaluationPossible(false)
            }
        },
        CheckPositionsAreUnchanged(newTopLeftPosition, newCenterPosition){


            const oldCenterPos = variables.current.position[visionScale].center
            const oldTopLeftPos = variables.current.position[visionScale].topLeft

            if (approxEqual(oldCenterPos.x, newCenterPosition.x) &&
                approxEqual(oldCenterPos.y, newCenterPosition.y) &&
                approxEqual(oldTopLeftPos.x, newTopLeftPosition.x) &&
                approxEqual(oldTopLeftPos.y, newTopLeftPosition.y)){
                    // console.log(`topleft old x ${variables.current.position[visionScale].topLeft.x}`)
                    // console.log(`topleft new x ${newTopLeftPosition.x}`)
                positionUnchangedCheckResults[visionScale][thisResource.id] = true
            } else { //stabilized true when values different (not stabilized)
                positionUnchangedCheckResults[visionScale][thisResource.id] = false
            }

            // console.log(`positionUnchangedCheckCount: ${positionUnchangedCheckResults.bushScale} ${positionUnchangedCheckResults.subBushScale}`)
            // console.log(`target: ${Object.keys(resourceGraphicsData).length}`)


            
            // console.log(positionUnchangedCheckResults[visionScale])
          
            for (let id of Object.keys(positionUnchangedCheckResults[visionScale])){
                // console.log(positionUnchangedCheckResults[visionScale][id])
                if (!positionUnchangedCheckResults[visionScale][id]){
                    setIsResourcePositionsStabilized(false)
                    // console.log('mieux')
                    return
                }
            }
            // console.log('meh')
            setIsResourcePositionsStabilized(true)
        }
    }


    //store datum in resource data if this resource parameter given
    if (thisResource){


        const resourceGraphicsDatum = {
            thisResource,
            variables,
            actions,
            state,
            setState
        }

        // console.log(resourceGraphicsDatum)
    
        resourceGraphicsData[thisResource.id] = resourceGraphicsDatum
    
    
        return [resourceGraphicsDatum, actions, visionScale] //make vision scale selector in manager
    }

    return actions

}




export function useresourceGraphicsDatumSelector(id){
    return resourceGraphicsData[id]
}


export function updateResourceIconPos(key, deltaX, deltaY){
    const thisResourcePosVars = resourceGraphicsData[key].variables.current.position

    thisResourcePosVars.bushScale.center.x += deltaX
    thisResourcePosVars.bushScale.center.y += deltaY
    thisResourcePosVars.bushScale.topLeft.x += deltaX
    thisResourcePosVars.bushScale.topLeft.y += deltaY
    thisResourcePosVars.subBushScale.center.x += deltaX
    thisResourcePosVars.subBushScale.center.y += deltaY
    thisResourcePosVars.subBushScale.topLeft.x += deltaX
    thisResourcePosVars.subBushScale.topLeft.y += deltaY
}
