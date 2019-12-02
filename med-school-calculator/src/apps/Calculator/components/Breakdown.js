import React from 'react';
import styled from 'styled-components';
import { ExportCSV } from './ExportCSV';
import {
    getAllTypes,
    getSubtype,
    getUser,
    getExpense,
    getAlternative,
    saveProgress
} from '../repository';
import { errorToast } from 'utils/helpers';
import { COLOURS } from 'utils/constants';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TablesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 2px solid ${COLOURS.darkblue};
    border-bottom: 2px solid ${COLOURS.darkblue};
    padding-bottom: 15px;
`;

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CostExport = styled.div`
    width: 75%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Table = styled.table`
    margin: 0;
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid black
    table-layout: fixed;
    width: 75%;
`;

const TableHead = styled.thead`
    font-weight: bold;
    text-align: left;
`;

const TableHeader = styled.th`
    font-weight: bold;
    border: 1px solid black
    text-align: center;
    vertical-align: middle;
    padding: 10px;
    text-align: left;
    background-color: ${COLOURS.blue};
    color: ${COLOURS.white};
`;

const TableRow = styled.tr`
    border-bottom: 1px solid black;
    :nth-child(even) {
        background-color: ${COLOURS.offWhite};
    }
`;

const TableData = styled.td`
    border-right: 1px solid black;
    padding: 10px;
    text-align: left;
`;

const Title = styled.h1`
    color: ${COLOURS.darkblue};
    font-weight: 500;
    font-size: 40px;
`;

const Subtitle = styled.h2`
    color: ${COLOURS.darkblue};
    font-weight: 400;
    font-size: 30px;
`;

const TableTitle = styled.h2`
    color: ${COLOURS.darkblue};
    font-weight: 400;
    font-size: 24px;
`;

const TableSub = styled.h3`
    color: ${COLOURS.darkblue};
    font-weight: 500;
    font-size: 18px;
`;

const Pseudo = styled.div`
    width: 153.3px;
    height: 35px;
    visibility: hidden;
`

class Breakdown extends React.Component {
    state = {
        selected: [],
        exportData: [],
        types: [],
        loading: true
    };

    async componentDidMount() {
        try {
            const data = await getAllTypes();
            const user = getUser();
            const progress = user.progress;
            const selectedOptions = [];
            const exportData = [];
            for (const id of progress) {
                let item = await getExpense({ expenseID: id });
                if (item === undefined) {
                    item = await getAlternative({ alternativeID: id });
                }
                try {
                    const subtype = await getSubtype({
                        subtypeID: item.subtypeID
                    });
                    selectedOptions.push({
                        expense: item,
                        category: subtype.name
                    });
                    exportData.push({
                        Item: `${item.name}`,
                        Description: `${item.description}`,
                        Category: `${subtype.name}`,
                        Cost: `${item.cost}`
                    });
                } catch (e) {
                    const removedInvalid = [...progress].filter(
                        item => item !== id
                    );
                    saveProgress(removedInvalid).catch(err => {
                        errorToast();
                    });
                    errorToast();
                    continue;
                }
            }
            Promise.all(selectedOptions)
                .then(res => {
                    this.setState({ types: data, selected: res });
                })
                .catch(() => errorToast());
            Promise.all(exportData)
                .then(res => {
                    this.setState({ exportData: res, loading: false });
                })
                .catch(() => errorToast());
        } catch (e) {
            errorToast();
        }
    }

    tableRow = (expense, subtype) => {
        return (
            <TableRow key={expense.id}>
                <TableData key={expense.name}>{expense.name}</TableData>
                <TableData key={subtype}>{subtype}</TableData>
                <TableData key={expense.cost}>${expense.cost}</TableData>
            </TableRow>
        );
    };

    tableAltRow = (alternative, subtype) => {
        return (
            <TableRow key={alternative.id}>
                <TableData key={alternative.name}>
                    <a
                        href={alternative.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {alternative.name}
                    </a>
                </TableData>
                <TableData key={subtype}>{subtype}</TableData>
                <TableData key={alternative.cost}>
                    ${alternative.cost}
                </TableData>
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
            <TableWrapper>
                <TableTitle>{type.name}</TableTitle>
                <Table key={type.id}>
                    <TableHead>
                        <tr>
                            <TableHeader>Item</TableHeader>
                            <TableHeader>Category</TableHeader>
                            <TableHeader>Cost (CAD)</TableHeader>
                        </tr>
                    </TableHead>
                    <tbody>{rows}</tbody>
                </Table>
                <TableSub>Subtotal: ${subtotal}</TableSub>
            </TableWrapper>
        );
    };

    buildAlternatives = selected => {
        const selectedAlts = selected.filter(
            e => e.expense.typeID === undefined
        );
        if (selectedAlts) {
            const rows = selectedAlts.map(e =>
                this.tableAltRow(e.expense, e.category)
            );
            const subtotal = selectedAlts.reduce(
                (sum, e) => sum + e.expense.cost,
                0
            );

            return (
                <TableWrapper>
                    <TableTitle>Alternative Resources</TableTitle>
                    <Table>
                        <TableHead>
                            <tr>
                                <TableHeader>Item</TableHeader>
                                <TableHeader>Category</TableHeader>
                                <TableHeader>Cost (CAD)</TableHeader>
                            </tr>
                        </TableHead>
                        <tbody>{rows}</tbody>
                    </Table>
                    <TableSub>Subtotal: ${subtotal}</TableSub>
                </TableWrapper>
            );
        }
    };

    renderTables() {
        const { types, selected } = this.state;
        const tables = [];
        const filterTypes = types.filter(t => t.name !== 'Breakdown');
        filterTypes.forEach(t => {
            tables.push(this.buildTable(t, selected));
        });
        tables.push(this.buildAlternatives(selected));
        return tables;
    }

    render() {
        const { loading, selected, exportData } = this.state;
        const total = selected.reduce((sum, e) => sum + e.expense.cost, 0);
        exportData.push({ Total: `$${total}` });
        return loading ? (
            <>Loading...</>
        ) : (
            <PageWrapper>
                <Title>Cost Breakdown</Title>
                <TablesWrapper>
                    <ul>{this.renderTables()}</ul>
                </TablesWrapper>
                <CostExport>
                    <Pseudo>Export Selection</Pseudo>
                    <Subtitle>Total Cost: ${total}</Subtitle>
                    <ExportCSV csvData={exportData} fileName="costs" />
                </CostExport>
            </PageWrapper>
        );
    }
}

export default Breakdown;
