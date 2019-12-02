import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import Button from 'common/Button';

export const ExportCSV = ({ csvData, fileName }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const json = XLSX.utils.json_to_sheet(csvData);
        const buffer = { Sheets: { data: json }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(buffer, {
            bookType: 'xlsx',
            type: 'array'
        });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <Button
            text="Export Selections"
            onClick={e => exportToCSV(csvData, fileName)}
        />
    );
};
