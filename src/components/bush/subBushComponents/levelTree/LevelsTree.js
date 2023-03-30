import D3Tree from "../../../tree/D3Tree";
import LevelBushNode from "./LevelBushNode";
import { v4 as uuid } from "uuid";
import { shallowEqual, useSelector } from "react-redux";








function LevelsTree(props) {


    const hierarchy = {
        name: 'level 1',
        id: uuid().replace(/-/g, ''),
        resources: props.data.resources.getResourcesOfLevel(1),
        children: [
            {
                name: 'level 2',
                id: uuid().replace(/-/g, ''),
                resources: props.data.resources.getResourcesOfLevel(2),
                children: [
                    {
                        name: 'level 3',
                        id: uuid().replace(/-/g, ''),
                        resources: props.data.resources.getResourcesOfLevel(3),
                    }
                ]
            }
        ]
    }




    const subBushHeight = useSelector((state) => state.dimensions.subBushHeight, shallowEqual)

    const bushId = props.data.id
    const nodesGId = `Nodes${bushId}`
    const linksGId = `Links${bushId}`
    const containerGId = `treeContainerG${bushId}`

    return (



        <D3Tree
            hierarchy={hierarchy}
            nodesGId={nodesGId}
            linksGId={linksGId}
            containerGId={containerGId}
            containerSvgId={`containerSvg${bushId}`}
            positionReferenceContainerId={`positionReferenceContainer${bushId}`}
            brightnessControlGId={`brightnessControlG${bushId}`}
            resourceConnectionLinesContainerId={`resourceConnectionLinesContainer${bushId}`}
            resourceIconsContainerId={`resourceIconsContainer${bushId}`}
            treeWidth={props.bushWidth}
            treeHeight={props.bushHeight - 50}
            nodeWidth={props.bushWidth}
            nodeHeight={subBushHeight}
            nodePadding={0}
            linkClass={props.linkClass}
            nodeComponentFunc={LevelBushNode} />


    )
}
export default LevelsTree