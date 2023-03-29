import './BushContentTemplate.css'


function BushContentTemplate(props) {
    return (
        <div className="bushContent">

            <span className={props.visionScale === 'subBushScale' ? "subBushScaleLabelSpan" : ''}>
                {props.data.name}
            </span>
            {props.children}
        </div>

    )
}

export default BushContentTemplate