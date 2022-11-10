import { useSelector } from "react-redux";
import styled from "styled-components";
import { useResourceIconStyle } from "../../hooks/use-resource-icon-style";

const ResourceIconRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)}; 
    scale: ${props => (props.scale)};

    font-size: 6px;
    padding-top: 0.2em;
    text-align:center;
    background-color: rgb(235, 75, 75);
    color: black;

    border-radius: ${props => (props.borderRadius)};
    color: ${props => (props.color)};
`

function ResourceIcon(props){

    const [width, height] = useSelector((state) => [state.dimensions.resourceWidth, state.dimensions.resourceHeight])

    const [borderRadius, color] = useResourceIconStyle()

    return(
        <ResourceIconRoot 
            width={width} 
            height={height} 
            scale={props.scale}
            borderRadius={borderRadius}
            color={color}>
            {props.name}
        </ResourceIconRoot>
    )
}
export default ResourceIcon