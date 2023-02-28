import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid} from "uuid";
import D3Tree from "../tree/D3Tree";
import ResourceIcon from "../resource-related/ResourceIcon";
import SubBushNode from "./SubBushNode";
import styles from '../tree.module.css'
import RootNode from "./RootNode";
import OriginNode from "./OriginNode";



const BushNodeRoot = styled.div`
    background-color: #a6ca84;
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};
    padding: ${props => (`${props.padding}px`)};
    border-radius: 2em;


    display: flex;
    flex-direction:column-reverse;
    align-items: center;
    justify-content: center;
    overflow: visible;


    & .bushForeignObject{
        -webkit-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

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

    console.log('rendering bushNode')

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

    const visionScale = useSelector((state) => state.zoom.visionScale, shallowEqual)
    const resourceIconScale = useSelector((state) => state.scale.bushResourceIconScale, shallowEqual)


    const [width, height, 
        originNodeWidth, originNodeHeight,
        rootNodeWidth, rootNodeHeight] = 
        
        useSelector((state) => [
        state.dimensions[visionScale].bushWidth, 
        state.dimensions[visionScale].bushHeight,
        state.dimensions.originNodeWidth, 
        state.dimensions.originNodeHeight,
        state.dimensions.rootNodeWidth, 
        state.dimensions.rootNodeHeight], shallowEqual)


    
        
    const [subBushHeight, padding] = useSelector((state) => [state.dimensions.subBushHeight, state.dimensions.bushPadding], shallowEqual)

    let containerWidth = width + padding*2 //add space for padding
    let containerHeight = height + padding*2 + subBushHeight/2 //add space for padding + top margin for subbush

    
    const bushId = uuid().replace(/-/g, '')
    const nodesGId = `Nodes${bushId}`
    const linksGId = `Links${bushId}`
    const containerGId = `containerG${bushId}`


    //for root and origin nodes
    let Root = null




    //handle other node types (than standard)
    if (props.data.name === 'Origin'){
        Root = OriginNode
        //same as branch width and origin node width
        containerWidth = originNodeWidth
        containerHeight = originNodeHeight
        
    } else if (props.data.name === 'Root'){
        Root = RootNode
        containerWidth = rootNodeWidth
        containerHeight = rootNodeHeight
    }
    else{
        Root = BushNodeRoot
    }




    return(
        <foreignObject width={containerWidth} height={containerHeight} className={'bushForeignObject'}>
            <Root width={containerWidth} height={containerHeight} padding={padding}>


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

            </Root>
        </foreignObject>
        
    )
}

export default BushNode
