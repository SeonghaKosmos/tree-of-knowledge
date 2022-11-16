//starting scale for app is subBushScale


export default class ConnectionStatusFlags{
    static previousScale = 'subBushScale' 
    static canRefreshConnectionStatus = false  

    static setCanRefreshConnectionStatus(val) {
        ConnectionStatusFlags.canRefreshConnectionStatus = val
    }
    
    static updateVisionScale(visionScale){
        //enable refresh after vision scale change
        if (visionScale != ConnectionStatusFlags.previousScale){
            ConnectionStatusFlags.setCanRefreshConnectionStatus(true)
            ConnectionStatusFlags.previousScale = visionScale
        }
    }
}


