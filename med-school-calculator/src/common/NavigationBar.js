import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { hasAdminAccess } from 'utils/helpers';
import {COLOURS} from "utils/constants";


const NavBar = styled.nav`
    position: sticky;
    top: 0;
    height: 50px;
    width: 100%; 
    margin: 0;
    padding: 0;
    background-color: ${COLOURS.maroon};
    overflow: hidden;
    border-bottom: 1px solid ${COLOURS.lightgrey};
    z-index: 99;
`;

const Title = styled.h1`
    margin: 0;
    margin-top: 7px;
    margin-left: 20px;
    padding: 0;
    float: left;
    font-size: 30px;
    font-weight: bold;
    color: white;
    white-space: nowrap;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`;

const MenuOption = styled.li`
    float: right;
    padding: 15px 18px;
    display: inline-block;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    color: white;
    :hover {
        background-color: ${COLOURS.darkgrey};
    }
`;


class NavigationBar extends React.Component {
    render () {
        return (
            <NavBar>
                <Title>Med School Application Costs Calculator</Title>
                <List>
                    <Link to={"/"} onClick={this.props.handleLogOut}><MenuOption>Log out</MenuOption></Link>
                    {hasAdminAccess() && (
                        <Link to={"/admin"}><MenuOption>Admin</MenuOption></Link>
                    )}
                    <Link to={"/profile"}><MenuOption>Profile</MenuOption></Link>
                    <Link to={"/calculator"}><MenuOption>Calculator</MenuOption></Link>
                </List>
            </NavBar>
        );
    }
}

export default NavigationBar;