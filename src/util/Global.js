export function mapObj(obj, action){
    for (let key of Object.keys(obj)){
        const sub = obj[key]
        console.log(sub)
        if (sub instanceof Object){
            mapObj(sub, action)
        } else if (sub instanceof Array){
            // sub.map((elem) => console.log(elem))
        } else {
            // console.log(sub)
        }
    }
}