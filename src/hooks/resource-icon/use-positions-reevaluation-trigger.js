import { useRef, useState } from "react"


// let reevaluationPossible = true


const allTriggers = {}

export function usePositionsReevaluationTrigger(resourceId) {

    const trigger = useRef({})
    if (resourceId){
        allTriggers[resourceId] = trigger
    }
    
    const actions = {
        triggerReevaluation() {
            trigger.current = {}
        },
        triggerReevaluateAll(){
            for (let key of Object.keys(allTriggers)){
                const trigg = allTriggers[key]
                trigg.current = {}
            }
        }
    }

    return [trigger, actions]
}

