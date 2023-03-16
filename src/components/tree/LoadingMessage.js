import './LoadingMessage.css'


function LoadingMessage(){
    console.log('rendering loading message')
    return(
        <div className="loadingMessageContainer">
            <span className="loadingMessage">loading...</span>
        </div>
    )
}
export default LoadingMessage