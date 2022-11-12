

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