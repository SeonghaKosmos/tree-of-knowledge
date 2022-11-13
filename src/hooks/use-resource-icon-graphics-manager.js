import { useRef, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";


const resourceGraphicsData = {}

export function useResourceIconGraphicsManager(thisResource) {

    const treeContainerGId = useSelector((state) => 
    state.importantElementIds.treeContainerGId, shallowEqual)

    const variables = useRef({ //does not trigger re-render when updated
        absoluteCenterPosition: {x:0, y:0},
        absolutePosition: {x:0, y:0}
    })

    const [state, setState] = useState({ //triggers re-render when updated
        isConnected: false,
        isConnectionLinesVisible: false
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
                resourceGraphicsDatum.actions.commitState()
            })
        },
        handleTreeContainer(isConnected){
    
            const treeContainerG = document.getElementById(treeContainerGId)
            if (isConnected){
                treeContainerG.style.opacity = 0.8
            } else{
                treeContainerG.style.opacity = 1
            }
        },
        setIsConnected (isConnected) { //master function that handles all connection related events



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
        setAbsoluteCenterPosition(position){
            variables.current.absoluteCenterPosition = position
        },
        setAbsolutePosition(position){
            variables.current.absolutePosition = position
        }
    }


    //store datum in resource data if this resource parameter given
    if (thisResource){
        const resourceGraphicsDatum = {
            variables,
            actions,
            state,
            setState
        }
    
        resourceGraphicsData[thisResource.id] = resourceGraphicsDatum
    
    
        return [resourceGraphicsDatum, actions]
    }

    return actions

}




export function useresourceGraphicsDatumSelector(id){
    return resourceGraphicsData[id]
}