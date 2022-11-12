import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid} from "uuid";
import D3Tree from "../tree/D3Tree";
import ResourceIcon from "../resource-related/ResourceIcon";
import SubBushNode from "./SubBushNode";
import styles from '../tree.module.css'
import ResourceConnectionLine from "../resource-related/ResourceConnectionLine";




const BushNodeRoot = styled.div`
    background-color: rgb(120, 252, 44);
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};
    padding: ${props => (`${props.padding}px`)};
    border-radius: 2em;

    display: flex;
    flex-direction:column-reverse;
    align-items: center;
    justify-content: center;

    & .resourceIconContainer{
        display: flex;
        align-items:center;
        justify-content: space-evenly;
        width:100%;
        flex-grow:1;
        flex-wrap: wrap-reverse;
    }

    & .resourceIconContainer div:last-of-type{
        margin-left: 40%;
        margin-right: 40%;
    }

`







function BushNode(props){

    // console.log('rendering bushNode')

    Array.prototype.getResourcesOfLevel = function(level){
        return this.filter((resource) => resource.level == level)
    }
        
    
    // console.log(props.data.resources)
    // console.log(props.data.resources.getResourcesOfLevel(1))
    
    const data = {
        name:'level 1',
        id: uuid().replace(/-/g, ''),
        resources: props.data.resources.getResourcesOfLevel(1),
        children: [
            {
                name:'level 2',
                id: uuid().replace(/-/g, ''),
                resources: props.data.resources.getResourcesOfLevel(2),
                children:[
                    {
                        name:'level 3',
                        id: uuid().replace(/-/g, ''),
                        resources: props.data.resources.getResourcesOfLevel(3),
                    }
                ]
            }
        ]
    }

    const visionScale = useSelector((state) => state.zoom.visionScale)
    const resourceIconScale = useSelector((state) => state.scale.bushResourceIconScale)


    const [width, height] = useSelector((state) => [
        state.dimensions[visionScale].bushWidth, 
        state.dimensions[visionScale].bushHeight], shallowEqual)
        
    const [subBushHeight, padding] = useSelector((state) => [state.dimensions.subBushHeight, state.dimensions.bushPadding], shallowEqual)

    const containerWidth = width + padding*2 //add space for padding
    const containerHeight = height + padding*2 + subBushHeight/2 //add space for padding + top margin for subbush

    
    const bushId = uuid().replace(/-/g, '')
    const nodesGId = `Nodes${bushId}`
    const linksGId = `Links${bushId}`
    const containerGId = `containerG${bushId}`

    return(
        <foreignObject width={containerWidth} height={containerHeight}>
            <BushNodeRoot width={containerWidth} height={containerHeight} padding={padding}>


                <span>{props.data.name}</span>


                {/* render representative resources at bush scale */}
                {(visionScale==='bushScale') &&
                    <div className="resourceIconContainer">
                        {props.data.resources.map((resource) => 
                            <ResourceIcon 
                                resource={resource} 
                                scale={resourceIconScale}/>
                        )}
                    </div>
                }


                {/* render subBush tree at subBush scale */}
                {visionScale==='subBushScale' && 
                    <D3Tree 
                    data={data} 
                    nodesGId={nodesGId} 
                    linksGId={linksGId}
                    containerGId={containerGId}
                    containerSvgId={`containerSvg${bushId}`}
                    treeWidth={width}
                    treeHeight={height - 50}
                    nodeWidth={width}
                    nodeHeight={subBushHeight}
                    nodePadding={0}
                    linkClass={styles.subBushLink}
                    nodeComponentFunc={SubBushNode}/>
                }

            </BushNodeRoot>
        </foreignObject>
        
    )
}

export default BushNode
