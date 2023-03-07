import { useEffect } from "react";
import './OriginNode.css'



function OriginNode(){


    useEffect(()=>{

        //remove shadow from origin node
        try{
            const bushContainerG = document.getElementById('originNode').parentElement.parentElement
            bushContainerG.classList.remove('drop-shadowed-bush')
            bushContainerG.classList.add('pointerEventLess')
        } catch{
            
        }
    })


    return(
        <div id="originNode">
            
            <div className="shadowHider">

            </div>
        </div>
    )
}
export default OriginNode