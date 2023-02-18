

function createOrUpdateLinks(){
    d3.select(`svg #${props.linksGId}`)
    .selectAll('line.link')
    .data(root.links())
    .join('line')
    .classed(`link ${props.linkClass}`, true)
    .attr('x1', function(d) {return d.source.x;})
    .attr('y1', function(d) {return getCoords(d.source, {nodeHeight}).y;})
    .attr('x2', function(d) {return d.target.x;})
    .attr('y2', function(d) {
        return getCoords(d.target, {nodeHeight}).y;})
    .attr('data-sourceID', (d) => {
        return `${d.source.data.id}`
    })
    .attr('data-targetID', (d) => {
        return `${d.target.data.id}`
    })
}