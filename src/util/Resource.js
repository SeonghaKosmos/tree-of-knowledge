
class Resource {

    static allCreatedResources = []

    constructor(name, id, type, level, connections, absoluteCenterPosition){
        this.name = name
        this.id = id
        this.type = type
        this.level = level
        this.connections = connections
        this.absoluteCenterPosition = absoluteCenterPosition

        Resource.allCreatedResources.push(this)
    }
}

export default Resource