
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'





function D3TreeFiller(props) {

    const [isTreeLoaded, setIsTreeLoaded] = useState(false)

    const NodeComponent = props.nodeComponentFunc

    useEffect(() => setIsTreeLoaded(true))

    return (
        <>
            {isTreeLoaded && props.descendants.map(descendant => {
                const node = document.getElementById(descendant.data.name)

                return ReactDOM.createPortal(
                    <NodeComponent
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