import { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import './RootNode.css'


function RootNode(){

    const [rootNodeWidth, rootNodeHeight] = useSelector((state) => [
        state.dimensions.rootNodeWidth, 
        state.dimensions.rootNodeHeight], shallowEqual)


    const stateStyles = {
        width:`${rootNodeWidth}px`, 
        height:`${rootNodeHeight}px`
    }

    useEffect(()=>{

        //remove shadow from root node
        try{
            const bushContainerG = document.getElementById('rootNode').parentElement.parentElement
            // console.log(bushContainerG.classList)
            // bushContainerG.classList.add('pointerEventLess')
            bushContainerG.classList.add('rootNodeContainerG')
        } catch{
            
        }
    })

    return(
        <div id="rootNode" style={{
            width:`${rootNodeWidth}px`, 
            height:`${rootNodeHeight}px`
        }}>
            <div className="potText">
                Your
                <br/>
                Tree
            </div>

        </div>
    )
}
export default RootNode