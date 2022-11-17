let elementWidth
let elementHeight


export function setEdge(elemWidth, elemHeight){
    elementWidth = elemWidth
    elementHeight = elemHeight
}

export function isInEdge(x, y){
    const edgeConditions = [
        [0, y], //left
        [elementWidth, y], //right
        [x, 0], //top
        [x, elementHeight] //bottom
    ]

    for (let condition of edgeConditions){
        const [xCondition, yCondition] = condition
        // console.log(`condition: ${xCondition} ${yCondition}`)
        // console.log(`real: ${x} ${y}`)
        if (x===xCondition && y===yCondition){
            return true
        }
    }
    return false
}