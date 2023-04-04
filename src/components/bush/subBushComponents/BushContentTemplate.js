import './BushContentTemplate.css'


function BushContentTemplate(props) {
    return (
        <div className="bushContent">

            <span className={
                (props.visionScale === 'subBushScale'
                || props.visionScale === 'subTreeScale') 
                ? 
                "subBushScaleLabelSpan" 
                : 
                ''}>
                {props.data.name}
            </span>
            {props.children}
        </div>

    )
}

export default BushContentTemplate