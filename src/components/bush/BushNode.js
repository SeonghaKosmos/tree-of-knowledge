import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import D3Tree from "../tree/D3Tree";
import ResourceIcon from "../resource-related/ResourceIcon";
import SubBushNode from "./SubBushNode";
import styles from '../tree.module.css'
import RootNode from "./RootNode";
import OriginNode from "./OriginNode";
import React from 'react';
import './BushNode.css'
import { CSSTransition } from "react-transition-group";
import { connectedResourceGraphicsDataIdsGlobal, updateResourceIconPositions } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";



const BushNodeRoot = styled.div`

    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};


    & .bushContent{
        padding: ${props => (`${props.padding}px`)};
    }

`







function BushNode(props) {

    console.log('rendering bushNode')

    Array.prototype.getResourcesOfLevel = function (level) {
        return this.filter((resource) => resource.level == level)
    }


    // console.log(props.data.resources)
    // console.log(props.data.resources.getResourcesOfLevel(1))

    const hierarchy = {
        name: 'level 1',
        id: uuid().replace(/-/g, ''),
        resources: props.data.resources.getResourcesOfLevel(1),
        children: [
            {
                name: 'level 2',
                id: uuid().replace(/-/g, ''),
                resources: props.data.resources.getResourcesOfLevel(2),
                children: [
                    {
                        name: 'level 3',
                        id: uuid().replace(/-/g, ''),
                        resources: props.data.resources.getResourcesOfLevel(3),
                    }
                ]
            }
        ]
    }

    const visionScale = useSelector((state) => state.zoom.visionScale, shallowEqual)


    const [width, height,
        originNodeWidth, originNodeHeight,
        rootNodeWidth, rootNodeHeight] =

        useSelector((state) => [
            state.dimensions.bushWidth,
            state.dimensions.bushHeight,
            state.dimensions.originNodeWidth,
            state.dimensions.originNodeHeight,
            state.dimensions.rootNodeWidth,
            state.dimensions.rootNodeHeight], shallowEqual)




    const [subBushHeight, padding] = useSelector((state) => [state.dimensions.subBushHeight, state.dimensions.bushPadding], shallowEqual)

    let containerWidth = width + padding * 2 //add space for padding
    let containerHeight = height + padding * 2 //add space for padding + top margin for subbush


    const bushId = uuid().replace(/-/g, '')
    const nodesGId = `Nodes${bushId}`
    const linksGId = `Links${bushId}`
    const containerGId = `treeContainerG${bushId}`


    //for root and origin nodes
    let Root = null




    //handle other node types (than standard)
    if (props.data.name === 'Origin') {
        Root = OriginNode
        //same as branch width and origin node width
        containerWidth = originNodeWidth
        containerHeight = originNodeHeight

    } else if (props.data.name === 'Root') {
        Root = RootNode
        containerWidth = rootNodeWidth
        containerHeight = rootNodeHeight
    }
    else {
        Root = BushNodeRoot
    }



    
    return (
        <foreignObject width={containerWidth} height={containerHeight} className={'bushForeignObject'}>
            <Root className="bushNode" width={containerWidth} height={containerHeight} padding={padding}>


                {/* render representative resources at bush scale */}
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={visionScale === 'bushScale'}
                    timeout={150}
                    classNames='fadeInOut'
                    onExited={() => updateResourceIconPositions(connectedResourceGraphicsDataIdsGlobal)}>
                    <div className="bushContent">

                        <span className={visionScale === 'subBushScale' ? "subBushScaleLabelSpan" : ''}>
                            {props.data.name}
                        </span>
                        <div className="resourceIconContainer">
                            {props.data.resources.map((resource) =>
                                <ResourceIcon
                                    resource={resource} />
                            )}
                        </div>
                    </div>
                </CSSTransition>


                {/* render subBush tree at subBush scale */}
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={visionScale === 'subBushScale'}
                    timeout={150}
                    classNames='fadeInOut'>

                    <div className="bushContent">

                        <span className={visionScale === 'subBushScale' ? "subBushScaleLabelSpan" : ''}>
                            {props.data.name}
                        </span>
                        <D3Tree
                            hierarchy={hierarchy}
                            nodesGId={nodesGId}
                            linksGId={linksGId}
                            containerGId={containerGId}
                            containerSvgId={`containerSvg${bushId}`}
                            positionReferenceContainerId={`positionReferenceContainer${bushId}`}
                            brightnessControlGId={`brightnessControlG${bushId}`}
                            resourceConnectionLinesContainerId={`resourceConnectionLinesContainer${bushId}`}
                            resourceIconsContainerId={`resourceIconsContainer${bushId}`}
                            treeWidth={width}
                            treeHeight={height - 50}
                            nodeWidth={width}
                            nodeHeight={subBushHeight}
                            nodePadding={0}
                            linkClass={styles.subBushLink}
                            nodeComponentFunc={SubBushNode} />
                    </div>

                </CSSTransition>

            </Root>
        </foreignObject>

    )
}

export default React.memo(BushNode)
