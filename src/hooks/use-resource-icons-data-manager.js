import { useRef, useState } from "react";


const resourceData = {}

export function useResourceIconsDataManager(resource) {

    const variables = useRef({ //does not trigger re-render when updated
        absoluteCenterPosition: {x:0, y:0},
        absolutePosition: {x:0, y:0}
    })

    const [state, setState] = useState({ //triggers re-render when updated
        isConnectionsVisible: false,
    })

    const resourceDatum = {
        variables,
        state,
        setState
    }

    if (resourceData[resource.id] == undefined){ //prevent reset (data loss) after rerender
        resourceData[resource.id] = resourceDatum
    }
    resourceData[resource.id].state = state
    resourceData[resource.id].setState = setState


    const actions = {
        setIsConnectionsVisible: (isConnectionsVisible) => {
            state.isConnectionsVisible = isConnectionsVisible
            setState(state) //set state to modified copy to trigger rerender

            for (let connectedResource of resource.connections){  // update connection visibility of connected resources
                const connectedResourceDatum = resourceData[connectedResource.id]

                setTimeout(() => { //set delay to ensure resourceIcon rerenders go over connection lines
                    const temp = {...connectedResourceDatum.state.isConnectionsVisible}
                    temp.isConnectionsVisible = isConnectionsVisible //change state object to trigger rerender
                    connectedResourceDatum.state.isConnectionsVisible = isConnectionsVisible
                    connectedResourceDatum.setState(temp)
                }, 1)
                
            }
        },
        setAbsoluteCenterPosition: position => {
            variables.current.absoluteCenterPosition = position
        },
        setAbsolutePosition: position => {
            variables.current.absolutePosition = position
        }
    }


    return [resourceDatum, actions]
}




export function useResourceDatumSelector(id){
    return resourceData[id]
}