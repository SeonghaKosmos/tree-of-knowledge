export function getTranslateFromTransformString(transformString){
   let translateList = transformString.substring(transformString.indexOf("(")+1, transformString.indexOf(")")).split(",");

   translateList = translateList.map(str => {
    return Number(str)
   })

   return {
    x: translateList[0],
    y: translateList[1]
   }
}


export function getScaleFromTransformString(transformString){
    let scaleString = transformString.substring(transformString.indexOf("scale(")+6, transformString.length - 1);
    return Number(scaleString)
}


export function setTreeContainerSvgClass(isMaxScale){
    const treeContainerSvgClassList = document.getElementById('treeContainerSvg').classList

    if (isMaxScale){
        treeContainerSvgClassList.remove('zoom-in-cursor')
        treeContainerSvgClassList.add('zoom-out-cursor')
    } else {
        treeContainerSvgClassList.remove('zoom-out-cursor')
        treeContainerSvgClassList.add('zoom-in-cursor')
    }
}