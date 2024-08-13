import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root',
})
export class ExcelService {
    constructor() {}
    generateExcel(header: any[], data: any[], fileName: string): void {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        // Add headers
        const headers = Object.values(header);
        worksheet.addRow(headers);
        // Add data
        data.forEach((item) => {
            let row: Array<any> = []
            headers.forEach((key) => {
                if ( key == 'Betrag') {
                    row.push(this.extractAmount(item[key]));
                } else { 
                    row.push(item[key]);
                }
            });
            worksheet.addRow(row);
          });
        // Save the workbook to a blob
        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            FileSaver.saveAs(blob, fileName + '.xlsx');
        });
    }

    extractAmount(input: string): number | null {
        // Remove all non-numeric characters except for ',' and '.'
        let cleanedInput = input.replace(/[^\d.,-]/g, '');
    
        // Replace ',' with '.' if it's used as a decimal separator
        if (cleanedInput.indexOf(',') > cleanedInput.indexOf('.')) {
            cleanedInput = cleanedInput.replace(/\./g, '').replace(',', '.');
        } else {
            cleanedInput = cleanedInput.replace(/,/g, '');
        }
    
        // Parse the cleaned string as a float
        let amount = parseFloat(cleanedInput);
    
        // Return null if the parsing fails (NaN)
        if (isNaN(amount)) {
            return null;
        }
    
        return amount;
    }
}