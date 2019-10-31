import React from 'react';
import styled from "styled-components";
import Chevron from "./Chevron"
import CalculatorData from "./CalculatorData";
import {getAllTypes} from "../repository";

const CalculatorWrapper = styled.div`
    height: 90%;
    width: 90%;
    background-color: #DCDCDC99;
    margin: auto;
`  

const NavBar = styled.ul`
    list-style: none; 
    overflow: hidden; 
    margin: auto auto 2vh auto;
`

const NavWrapper = styled.div`
    background-color: black;
    margin: auto;

`

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }

    }

    componentDidMount() {
        getAllTypes().then(data => this.setState({loading: false, data: data}));
    }

    renderList = data => {
        return (
            <div>
                {data.map(item => (
                    <Chevron key={item.id} link={`/calculator/${item.name}`} title={item.name}> </Chevron>
                ))}
            </div>
        );
    }

    getCurrentStage = () => {
        const currentStageId = this.props.history.location.pathname.split('/')[2];
        return currentStageId;
    }

    render() {
        const { data, loading } = this.state;
        return (

                <CalculatorWrapper>
                    <NavWrapper>
                        <NavBar>
                            {loading ? console.log("Loading...") : this.renderList(data)}
                        </NavBar>
                    </NavWrapper>
                    <CalculatorData title={this.getCurrentStage()}>

                    </CalculatorData>
                </CalculatorWrapper>
        );
    }
}

export default Calculator;