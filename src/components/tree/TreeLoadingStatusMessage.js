import './TreeLoadingStatusMessage.css'


function TreeLoadingStatusMessage(props){
    console.log('rendering loading message')
    return(
        <div className="loadingMessageContainer">
            <span className="loadingMessage">{props.msg}</span>
        </div>
    )
}
export default TreeLoadingStatusMessage