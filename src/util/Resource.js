
export let allCreatedResources

export function setAllCreatedResources(resources){
    allCreatedResources = resources
}

export function getResourceIdsList(resourceList) {
    return resourceList.map((resource) => resource.id)
}



