import ResourceIcon from "../../resource-related/ResourceIcon"
import './ResourceIconsDisplay.css'

function ResourceIconsDisplay(props){
    return(
            
        <div className="resourceIconDisplay">
            {props.data.resources.map((resource) =>
                <ResourceIcon
                    resource={resource} />
            )}
        </div>

    )
}
export default ResourceIconsDisplay