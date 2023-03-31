import { shallowEqual, useSelector } from "react-redux"



export default function useDefaultTreeDimParams() {
    const [treeWidth, treeHeight] = useSelector((state) => [
        state.dimensions.treeWidth,
        state.dimensions.treeHeight], shallowEqual)


    const [nodeWidth, nodeHeight, nodePadding] = useSelector((state) => [
        state.dimensions.bushWidth,
        state.dimensions.bushHeight,
        state.dimensions.bushPadding], shallowEqual)


    return {
        treeWidth,
        treeHeight,
        nodeWidth, 
        nodeHeight, 
        nodePadding
    }
}