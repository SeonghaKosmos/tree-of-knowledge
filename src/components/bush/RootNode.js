import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";

const RootNodeRoot = styled.div`
    width: ${props => (`${props.width}px`)};
    height: ${props => (`${props.height}px`)};
    background-color: #ae6448;
    border-radius: 0px 0px 1em 1em;
    display:flex;
    align-items:center;
    justify-content:center;


    .potText{
        font-size:30px;
    }
`

function RootNode(){

    const [rootNodeWidth, rootNodeHeight] = useSelector((state) => [
        state.dimensions['bushScale'].rootNodeWidth, 
        state.dimensions['bushScale'].rootNodeHeight], shallowEqual)

    return(
        <RootNodeRoot width={rootNodeWidth} height={rootNodeHeight}>
            <div className="potText">
                Your
                <br/>
                Tree
            </div>

        </RootNodeRoot>
    )
}
export default RootNode