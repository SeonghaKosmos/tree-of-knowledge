let reevaluationPossible = true //automatically evaluate position on first tree render
let resourcePositionsStabilized = false
export function getRelativePositionOfElementInContainer(container, element){

    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()

    const y = elementRect.top - containerRect.top;
    const x = elementRect.left - containerRect.left;


    // console.log(`container: ${containerRect.left}, ${containerRect.top}`)

    return {
        x: x,
        y: y
    }
}


export function isResourcePositionReevaluationPossible(){
    return reevaluationPossible
}

export function setIsResourcePositionReevaluationPossible(val){
    reevaluationPossible = val
}


export function isResourcePositionsStabilized(){
    return resourcePositionsStabilized
}

export function setIsResourcePositionsStabilized(val){
    resourcePositionsStabilized = val
}

