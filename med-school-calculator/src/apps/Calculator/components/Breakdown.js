import React from 'react';
import styled from 'styled-components';
import { getAllTypes, getSubtype, getUser, getExpense } from '../repository';
import { ExportCSV } from './ExportCSV';

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

const TableRow = styled.tr`
    border-bottom: 1px solid black;
`;

const TableData = styled.td`
    border-right: 1px solid black;
`;

class Breakdown extends React.Component {
    state = {
        selected: [],
        exportData: [],
        types: [],
        loading: true
    };

    async componentDidMount() {
        const data = await getAllTypes();
        const user = getUser();
        const progress = user.progress;
        const selectedOptions = [];
        const exportData = [];
        for (const e of progress) {
            const expense = await getExpense({ expenseID: e });
            const subtype = await getSubtype({ subtypeID: expense.subtypeID });
            selectedOptions.push({ expense: expense, category: subtype.name });
            exportData.push({
                Item: `${expense.name}`,
                Description: `${expense.description}`,
                Category: `${subtype.name}`,
                Cost: `${expense.cost}`
            });
        }
        Promise.all(selectedOptions).then(res => {
            this.setState({ types: data, selected: res });
        });
        Promise.all(exportData).then(res => {
            this.setState({ exportData: res, loading: false });
        });
    }

    tableRow = (expense, subtype) => {
        return (
            <TableRow key={expense.id}>
                <TableData>{expense.name}</TableData>
                <TableData>{subtype}</TableData>
                <TableData>{expense.cost}</TableData>
            </TableRow>
        );
    };

    buildTable = (type, selected) => {
        const selectedOptions = selected.filter(
            e => e.expense.typeID === type.id
        );
        const rows = selectedOptions.map(e =>
            this.tableRow(e.expense, e.category)
        );
        const subtotal = selectedOptions.reduce(
            (sum, e) => sum + e.expense.cost,
            0
        );

        return (
            <div>
                <h2>{type.name}</h2>
                <Table>
                    <TableHead>
                        <tr>
                            <TableHeader>Item</TableHeader>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Cost</TableHeader>
                        </tr>
                    </TableHead>
                    <tbody>{rows}</tbody>
                </Table>
                <h4>Subtotal: ${subtotal}</h4>
            </div>
        );
    };

    renderTypes() {
        const { types, selected } = this.state;
        const tables = [];
        const filterTypes = types.filter(t => t.name !== 'Breakdown');
        filterTypes.forEach(t => {
            tables.push(this.buildTable(t, selected));
        });
        return tables;
    }

    render() {
        const { loading, selected, exportData } = this.state;
        const total = selected.reduce((sum, e) => sum + e.expense.cost, 0);
        exportData.push({ Total: `$${total}` });
        return loading ? (
            <>Loading...</>
        ) : (
            <div>
                <h1>Breakdown</h1>
                <ul>{this.renderTypes()}</ul>
                <h3>Total Cost: ${total}</h3>
                <ExportCSV csvData={exportData} fileName="costs" />
            </div>
        );
    }
}

export default Breakdown;
