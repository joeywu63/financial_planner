import React from 'react';
import styled from "styled-components";
import Chevron from "./Chevron"
import CalculatorData from "./CalculatorData";
import {getAllTypes} from "../repository";
import Breakdown from "./Breakdown";

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
            loading : true,
            currentStage: "Interview Process"
        }

    }

    handleClick = (e) => {
        this.setState({currentStage: e.target.innerText});
    }

    componentDidMount() {
        getAllTypes().then(data => this.setState({loading: false, data: data}));
    }

    renderList = data => {
        return (
            <div>
                {data.map(item => (
                    <Chevron onClick={this.handleClick} key={item.id} title={item.name}> </Chevron>
                ))}
            </div>
        );
    }

    renderCalculatorData = () => {
        const titleOfCurrentStage = this.state.currentStage;
        if (titleOfCurrentStage === "Breakdown") {
            return (<Breakdown></Breakdown>);
        }
        else {
            return (<CalculatorData title={titleOfCurrentStage}> </CalculatorData>);
        }
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
                    {this.renderCalculatorData()}
                </CalculatorWrapper>
        );
    }
}

export default Calculator;