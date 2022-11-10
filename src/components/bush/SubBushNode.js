import styled from "styled-components";
import React from "react";
import ResourceIcon from "../resource-related/ResourceIcon";
import { useSelector } from "react-redux";
const SubBushNodeRoot = styled.div`

    font-size: 8px;
    background-color: green;
    border-radius: 1em;
    width:${props => (`${props.width}px`)};
    height:${props => (`${props.height}px`)};

    display: flex;
    align-items: center;
    flex-direction: column;

    .resourceContainer{
        display:flex;
        align-items:center;
        justify-content: space-evenly;
        /* border: 1px solid; */

        flex-grow:1;
        min-height: 0;
        width:100%;

    }

    /* .subBushNameTag{
        display:block;
    } */


`

function SubBushNode(props){


    const width = props.width;
    const height = props.height;

    const resourceIconScale = useSelector((state) => state.scale.subBushResourceIconScale)


    return(
        <foreignObject width={width} height={height}>
            <SubBushNodeRoot width={width} height={height}>
                <div className="subBushNameTag">{props.data.name}</div>
                <div className="resourceContainer">
                    {props.data.resources.map((resource) =>  
                        <ResourceIcon name={resource.name} scale={resourceIconScale}/> )}
                </div>
            </SubBushNodeRoot>
        </foreignObject>
        
    )
}
export default React.memo(SubBushNode)