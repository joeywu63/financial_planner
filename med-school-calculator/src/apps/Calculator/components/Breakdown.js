import React from 'react';
import styled from "styled-components";
import { getAllTypes, getSubtypesByType } from '../repository';

const Table = styled.table`
    margin: 0;
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid black
    table-layout: fixed;
`;

const TableHead = styled.thead`
    font-weight: bold;
    text-align: left;
    padding 2;
`;

const TableHeader = styled.th`
    font-weight: bold;
    border: 1px solid black
    text-align: center;
    vertical-align: middle;
`;

class Breakdown extends React.Component {
    async componentDidMount() {
        getAllTypes().then(data => this.setState({ types: data }));
    }

    state = {
        selected: [],
        types: []
    };

    renderSubtypes() {}

    renderTypes() {
        const { types } = this.state;
        const tables = [];
        const filterTypes = types.filter(t => t.name !== 'Breakdown');
        filterTypes.forEach(t => {
            tables.push(
                <div>
                    <h2>{t.name}</h2>
                    <Table>
                        <TableHead>
                            <tr>
                                <TableHeader>Item</TableHeader>
                                <TableHeader>Cost</TableHeader>
                            </tr>
                        </TableHead>
                        <tbody></tbody>
                    </Table>
                    <h4>Subtotal:</h4>
                </div>
            );
        });
        return tables;
    }

    render() {
        return (
            <>
                <h1>Breakdown</h1>
                <ul>{this.renderTypes()}</ul>
                <h3>Total Cost:</h3>
            </>
        );
    }
}

export default Breakdown;
