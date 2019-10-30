import React from 'react';
import styled from "styled-components";
import Chevron from "./Chevron"
import CalculatorData from "./CalculatorData";

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

    // Plan: 
    // 1. Retrieve all types from database in following function 
    retrieveTypeNames() {
        // Here make a call to firebase to get all the type names and store in array containing Name and Id
        return Number.parseInt(this.props.history.location.pathname.split('/')[2]);
        // In render(), use a for loop to add Chevron for each type
    }

    render() {
        return (

                <CalculatorWrapper>
                    <NavWrapper>
                        <NavBar>
                            <Chevron link="/calculator/1" title="Application Submission"> </Chevron>
                            <Chevron link="/calculator/2" title="Interview Process"> </Chevron>
                            <Chevron link="/calculator/3" title="MCAT"> </Chevron>
                            <Chevron link="/calculator/4" title="Finish"> </Chevron>
                        </NavBar>
                    </NavWrapper>
                    <CalculatorData stage={this.retrieveTypeNames()}>

                    </CalculatorData>
                </CalculatorWrapper>
        );
    }
}

export default Calculator;