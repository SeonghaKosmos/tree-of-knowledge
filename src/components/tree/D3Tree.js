import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom'
import { useResourceIconGraphicsManager } from '../../hooks/use-resource-icon-graphics-manager';
import styles from '../tree.module.css'
import React from 'react';







function D3Tree(props){

    //clear resource Icon state
    const resourceIconsActions = useResourceIconGraphicsManager()
    // resourceIconsActions.resetAllResourceIcons() 

    // console.log('rendering D3Tree')
    const nodeHeight = props.nodeHeight + 2*props.nodePadding
    const nodeWidth = props.nodeWidth + 2*props.nodePadding

    function getCoords(d, isNodeCoords){

        // console.log(`init: ${d.x}, ${d.y}`)
        let yCoord = props.treeHeight - d.y + nodeHeight/2 + 5//invert (bottom to top) and add space for first node 

        if (isNodeCoords){
            const xCoord = d.x - nodeWidth/2//center
            yCoord = yCoord - nodeHeight/2 //center 
            // console.log(`final: ${xCoord}, ${yCoord}`)
            return {
                x: xCoord,
                y: yCoord
            }
        }
        
        // console.log(`final: y${yCoord}`)
        return {
            y: yCoord
        }
               
    }







    let runD3 = useRef(false)
    let rundD3Complete = useRef(false)
    const [reRenderTrigger, setReRenderTrigger] = useState({})


    function updateD3RunRefs(){

        // console.log('before update:')
        // console.log(`runD3: ${runD3.current}`)
        // console.log(`runD3Complete: ${rundD3Complete.current}`)

        if (rundD3Complete.current){ 
            runD3.current = false
            rundD3Complete.current = false //reset to initial state
        } else { 
            runD3.current = true
        }

        // console.log('after update:')
        // console.log(`runD3: ${runD3.current}`)
        // console.log(`runD3Complete: ${rundD3Complete.current}`)

    }



    
    var treeLayout = d3.tree()
    .size([props.treeWidth, props.treeHeight])
    .separation(() => 2)

    var root = d3.hierarchy(props.data)

    treeLayout(root)
    const descendants = root.descendants()


    useEffect(() => { //create tree

        if (runD3.current){
            // Nodes
            d3.select(`svg #${props.nodesGId}`)
            .selectAll('g.node')
            .data(descendants, (d) => {
                return d;
            })
            .join('g')
            .classed(`node`, true)
            .attr('transform', function(d) {
                const coords = getCoords(d, true)
                return `translate(${coords.x}, ${coords.y})`
            })
            .attr('id', (d) =>{
                return d.data.id
            })

            // nodeSelection = hijackedJoin(nodeSelection)
            // console.log(nodeSelection)

            // Links
            d3.select(`svg #${props.linksGId}`)
            .selectAll('line.link')
            .data(root.links())
            .join('line')
            .classed(`link ${props.linkClass}`, true)
            .attr('x1', function(d) {return d.source.x;})
            .attr('y1', function(d) {return getCoords(d.source, false).y;})
            .attr('x2', function(d) {return d.target.x;})
            .attr('y2', function(d) {return getCoords(d.target, false).y;})
            
            rundD3Complete.current = true
            setReRenderTrigger({})

            // console.log('d3 complete')
        }        
    
    })
      

    
    const NodeComponent = props.nodeComponentFunc
    return(
        <>
            {/* tree template */}
            <svg  id={props.containerSvgId}> 
                <g id={props.containerGId}>
                    <g id='opacityControlG'>
                        <g id={props.linksGId}/>
                        <g id={props.nodesGId}/>
                    </g>
                    {/* add connection lines container if id available */}
                    {props.resourceConnectionLinesContainerId &&  
                        <foreignObject width={1287} height={930} className={styles.resourceConnectionLinesContainerContainerForeignObject}>
                            <div className={styles.resourceConnectionLinesContainerContainerDiv}>
                                <svg width={901} height={651} id={props.resourceConnectionLinesContainerId} 
                                     className={styles.resourceConnectionLinesContainer}>
                                </svg>
                            </div>
                        </foreignObject>
                    }
                </g>
            </svg>
            {/* fill tree */}
            {rundD3Complete.current && descendants.map(descendant => {
                const node = document.getElementById(descendant.data.name)
                runD3.current = false
                // console.log('adding nodes')
                return ReactDOM.createPortal(
                <NodeComponent 
                    data={descendant.data} 
                    width={props.nodeWidth}
                    height={props.nodeHeight}/>
                ,document.getElementById(descendant.data.id)) 
    
            })}

            {updateD3RunRefs()}
        </>
    )
}
export default React.memo(D3Tree)