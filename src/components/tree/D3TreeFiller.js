
import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import setupTree from '../../util/tree/setupTree'
import {v4 as uuid} from 'uuid'
import BushNode from '../bush/BushNode'




function D3TreeFiller(props) {

    console.log('filling tree')

    const [isTreeLoaded, setIsTreeLoaded] = useState(false)

    const NodeComponent = props.nodeComponentFunc

    const dispatch = useDispatch()

    useEffect(() => {
        setIsTreeLoaded(true)
        if (isTreeLoaded && props.setupTree){
            setupTree(
            {
                updateTreePositionFunc: props.updateTreePositionFunc, 
                dispatch, 
                bushWidth: props.nodeWidth + props.nodePadding * 2
            })
            .then((msg)=>{
                console.log(msg)
                const treeContainerGClassList = document.getElementById('treeContainerG').classList

                treeContainerGClassList.remove('delayedInvisability')
            })
        }
    })

    const descendants = props.dataRoot.current.descendants()

    return (
        <>
            {isTreeLoaded && descendants.map(descendant => {

                return ReactDOM.createPortal(
                    <NodeComponent
                        key={descendant.data.id}
                        data={descendant.data}
                        width={props.nodeWidth}
                        height={props.nodeHeight} />

                    ,

                    document.getElementById(descendant.data.id))



            })}
        </>

    )
}
export default D3TreeFiller