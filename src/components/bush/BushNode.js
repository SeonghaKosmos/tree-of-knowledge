import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import styles from '../tree.module.css'
import RootNode from "./variants/RootNode";
import OriginNode from "./variants/OriginNode";
import React from 'react';
import './BushNode.css'
import { connectedResourceGraphicsDataIdsGlobal, updateResourceIconPositions } from "../../hooks/resource-icon/use-resource-icon-graphics-manager";
import BushContentTemplate from "./subBushComponents/BushContentTemplate";
import LevelsTree from "./subBushComponents/levelTree/LevelsTree";
import ResourceIconsDisplay from "./subBushComponents/ResourceIconsDisplay";
import FadeInOutTransition from "./FadeInOutTransition";



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




    const padding = 20//useSelector((state) => state.dimensions.bushPadding, shallowEqual)
    
    let containerWidth = width 
    let containerHeight = height 



    //for root and origin nodes
    let Root




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
                <FadeInOutTransition
                    in={visionScale === 'bushScale'}
                    onExited={() => updateResourceIconPositions(connectedResourceGraphicsDataIdsGlobal)}>

                    <BushContentTemplate data={props.data} visionScale={visionScale}>
                        <ResourceIconsDisplay
                            visionScale
                            data={props.data}
                        />
                    </BushContentTemplate>

                </FadeInOutTransition>


                {/* render subBush tree at subBush scale */}
                <FadeInOutTransition in={visionScale === 'subBushScale'}>

                    <BushContentTemplate data={props.data} visionScale={visionScale}>
                        <LevelsTree
                            data={props.data}
                            padding = {padding}
                            treeWidth={width}
                            treeHeight={height}
                            linkClass={styles.subBushLink} />
                    </BushContentTemplate>


                </FadeInOutTransition>




            </Root>
        </foreignObject>

    )
}

export default React.memo(BushNode)
