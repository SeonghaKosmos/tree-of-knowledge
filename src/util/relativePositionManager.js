let reevaluationPossible = true //automatically evaluate position on first tree render

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


export function isReevaluationPossible(){
    return reevaluationPossible
}

export function setReevaluationPossible(val){
    reevaluationPossible = val
}