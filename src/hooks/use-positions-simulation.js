import { useDispatch } from "react-redux"
import { zoomSliceActions } from "../store/store"
import { setReevaluationPossible } from "../util/relativePositionManager"
import { usePositionsReevaluationTrigger } from "./use-positions-reevaluation-trigger"


let simulationCount = 0

export default function usePositionSimulation(){


    const dispatch = useDispatch()
    
    //simulate only once
    if (simulationCount < 1){
        
        
        // wait until tree render complete
        setTimeout(()=>{
            console.log('%cupdating sub bush scale positions', 'color: lime')

            //revert scale to original value
            dispatch(zoomSliceActions.setVisionScale('bushScale'))

            //positions will reevaluate after vision scale update
            setReevaluationPossible(true)
            //wait until reevaluation is finished
            setTimeout(() => {
                console.log('%cupdating bush scale positions', 'color: skyblue')
                //prevent further evaluations
                setReevaluationPossible(false)
            }, 30)
        }, 50)
        
    }



    simulationCount++


}