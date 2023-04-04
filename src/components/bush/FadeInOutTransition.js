import { CSSTransition } from "react-transition-group"




function FadeInOutTransition(props) {
    return (
        <CSSTransition
            mountOnEnter
            unmountOnExit
            in={props.in}
            timeout={150}
            classNames='fadeInOut'
            onExited={props.onExited}>


            {props.children}


        </CSSTransition>
    )
}

FadeInOutTransition.defaultProps = {
    onExited: () => {}
}

export default FadeInOutTransition