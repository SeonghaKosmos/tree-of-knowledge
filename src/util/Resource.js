
class Resource {

    bushId
    static allCreatedResources = []

    constructor(name, id, type, level, connections){
        this.name = name
        this.id = id
        this.type = type
        this.level = level
        this.connections = connections

        Resource.allCreatedResources.push(this)
    }

    static getIdList(resourceList) {
        return resourceList.map((resource) => resource.id)
    }

}

export default Resource