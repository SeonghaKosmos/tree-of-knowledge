export function mapObj(obj, action){
    for (let key of Object.keys(obj)){
        const sub = obj[key]
        // console.log(sub)
        if (sub instanceof Object){
            mapObj(sub, action)
        } else if (sub instanceof Array){
            // sub.map((elem) => console.log(elem))
        } else {
            // console.log(sub)
        }
    }
}



export function repeatSetTimeout(repetitionCount, interval, func){

    if (repetitionCount > 0){
        return setTimeout ( 
            () => {
                func()
                repeatSetTimeout(repetitionCount - 1, interval, func)
            }, 
            interval)
    }

}