import { useSelector } from "react-redux";
import styled from "styled-components";

const MouseEventCapturingRectRoot = styled.rect`
    fill: none;
`

function MouseEventCapturingRect(){

    const [renderedTreeWidth, renderedTreeHeight] = 
    useSelector(state => [state.renderedDimensions.renderedTreeWidth, state.renderedDimensions.renderedTreeHeight])

    return(
        <MouseEventCapturingRectRoot width={renderedTreeWidth} height={renderedTreeHeight}/>
    )
}
export default MouseEventCapturingRect