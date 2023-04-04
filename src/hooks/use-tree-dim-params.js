import { shallowEqual, useSelector } from "react-redux"



export default function useDefaultTreeDimParams() {
    const [treeWidth, treeHeight] = useSelector((state) => [
        state.dimensions.treeWidth,
        state.dimensions.treeHeight], shallowEqual)


    const [nodeWidth, nodeHeight] = useSelector((state) => [
        state.dimensions.bushWidth,
        state.dimensions.bushHeight], shallowEqual)


    return {
        treeWidth,
        treeHeight,
        nodeWidth, 
        nodeHeight    
    }
}