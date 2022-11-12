import { useRef, useState } from "react";


const resourceData = {}

export function useResourceIconsDataManager(resource) {

    const variables = useRef({ //does not trigger re-render when updated
        absoluteCenterPosition: {x:0, y:0},
        absolutePosition: {x:0, y:0}
    })

    const [state, setState] = useState({ //triggers re-render when updated
        isConnected: false,
        isConnectionLinesVisible: false
    })


    const actions = {
        commitState: () => { //commit changes and trigger rerender
            const temp = {...state}
            setState(temp) //set state to modified copy to trigger rerender
        },
        setIsConnected: (isConnected) => {
            // const temp = {...state}
            // temp.isConnected = isConnected
            // state.isConnected = isConnected
            // setState(temp) 
            state.isConnected = isConnected

            for (let connectedResource of resource.connections){  // update connection visibility of connected resources
                const connectedResourceDatum = resourceData[connectedResource.id]

                setTimeout(() => { //set delay to ensure resourceIcon rerenders go over connection lines
                    connectedResourceDatum.state.isConnected = isConnected
                    connectedResourceDatum.actions.commitState()
                }, 1)
                
            }
        },
        setIsConnectionLinesVisible: (isConnectionLinesVisible) => {
            state.isConnectionLinesVisible = isConnectionLinesVisible
        },
        setAbsoluteCenterPosition: position => {
            variables.current.absoluteCenterPosition = position
        },
        setAbsolutePosition: position => {
            variables.current.absolutePosition = position
        }
    }

    const resourceDatum = {
        variables,
        actions,
        state,
        setState
    }

    resourceData[resource.id] = resourceDatum

    // if (resourceData[resource.id] == undefined){ //prevent reset (data loss) after rerender
    //     resourceData[resource.id] = resourceDatum
    // }
    // resourceData[resource.id].state = state //but state must be updated after rerender
    // resourceData[resource.id].setState = setState


    return [resourceDatum, actions]
}




export function useResourceDatumSelector(id){
    return resourceData[id]
}