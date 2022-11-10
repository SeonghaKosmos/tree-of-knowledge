import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export function useResourceIconStyle(){
    const scale = useSelector((state) => state.zoom.scale)
    const minusculeBushScaleBoundary = useSelector((state) => state.zoom.minusculeBushScaleBoundary)

    const [borderRadius, setBorderRadius] = useState(0)
    const [color, setColor] = useState('black')

    useEffect(()=>{
        
        if (scale < minusculeBushScaleBoundary){
            setBorderRadius((prevBorderRadius)=>{
                if (prevBorderRadius=='50%'){
                    return prevBorderRadius
                }
                return '50%'
            })
            setColor((prevColor)=>{
                if (prevColor=='transparent'){
                    return prevColor
                }
                return 'transparent'
            })
        } else { //change state only when style values change (take borderRadius as sample)
            setBorderRadius((prevBorderRadius)=>{
                if (prevBorderRadius==0){
                    return prevBorderRadius
                }
                return 0
            })
            setColor((prevColor)=>{
                if (prevColor=='black'){
                    return prevColor
                }
                return 'black'
            })
        }
    }, [scale])

    return [borderRadius, color]
}