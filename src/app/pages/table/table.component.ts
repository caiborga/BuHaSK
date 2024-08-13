import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxCsvParserModule, NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MenuItem, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ExcelService } from '../../services/excel.service';
import { WordListComponent } from '../word-list/word-list.component';

import { MenuItemsService } from '../../services/menu-items.service';
import { WordsService } from '../../services/words.service';


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

interface Option {
    name: string;
    code: string;
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [AutoCompleteModule, ButtonModule, CommonModule, DropdownModule, FileUploadModule, FormsModule, MenubarModule, MenuModule, NgxCsvParserModule, ProgressSpinnerModule, SelectButtonModule, TableModule, ToastModule, TooltipModule, WordListComponent ],
    providers: [MessageService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    styles: [
        `:host ::ng-deep {
            .speeddial-linear-demo {
                .p-speeddial-direction-up {
                    left: calc(50% - 2rem);
                    bottom: 0;
                }
        
                .p-speeddial-direction-down {
                    left: calc(50% - 2rem);
                    top: 0;
                }
        
                .p-speeddial-direction-left {
                    right: 0;
                    top: calc(50% - 2rem);
                }
        
                .p-speeddial-direction-right {
                    left: 0;
                    top: calc(50% - 2rem);
                }
            }
        }`
    ],
})
export class TableComponent {

    @ViewChild('fileUpload') fileUpload: any
    @ViewChild('fileImportInput') fileImportInput: any;

    first = 0;
    rows = 10;

    bookingCategories: Array<string> = [
        'Aktivitäten',
        'Anschaffungen',
        'Apotheke',
        'Auto',
        'Bäcker',
        'Bargeld',
        'Beerdigung',
        'Bestellen',
        'Bouldern',
        'Brauen',
        'Bücher',
        'Buchhaltung Stephan Kleinhans',
        'devheroes Gehalt',
        'Dividende',
        'Doktor',
        'Drogerie',
        'Einkommensteuer',
        'Fahrrad',
        'Fahrtkosten',
        'Film/Kino',
        'Fortbildung',
        'Geschenke',
        'Getränke',
        'GEZ',
        'Hochzeit',
        'Internet',
        'Kaution',
        'Kleidung',
        'Kletterwelt Lohn',
        'Kontaktlinsen',
        'Kontogebühren',
        'Metzger',
        'Mexiko (07.-28.05.)',
        'Miete',
        'Molchow (25.06.-09-07.)',
        'Bochum/Molchow (04.11.-12.11.23)',
        'Musik',
        'Post',
        'Restaurant',
        'Skifahren',
        'Skifahren Schweiz (09.-16.03.24)',
        'Skifahren Zillertal (21.-28.01.)',
        'Spende',
        'Strom',
        'Supermarkt',
        'SYZYGY Lohn',
        'Telefon',
        'Übertrag',
        'Umsatzsteuer',
        'Versicherung',
        'Wandern',
        'Wertpapiere',
        'Wolfsruh',
        'Hüttentour (24.-26.11.23)',
        'Kirchensteuer'
    ];
    
    filteredBookingCategories:any[] = [];
    csvRecords: any = []
    header: boolean = false;
    highlightColumns: Array<number> = []
    hidingCols: Array<number> = []
    items!: MenuItem[] | null;
    loading: boolean = true;
    menuItems: MenuItem[] | undefined;
    options: Array<Option> = [];
    selectedAccount: string = '';
    selectedOptions: Array<any> = [];
    selectedHeaderRow: any;
    selectedStartRow: number = 0;
    maxColumns: number = 0;

    constructor(
        private excelService: ExcelService,
        private menuItemsService: MenuItemsService,
        private messageService: MessageService,
        private ngxCsvParser: NgxCsvParser,
        private wordService: WordsService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.options = [
            { name: 'Buchungsdatum', code: 'DATE' },
            { name: 'Info 1', code: 'I1' },
            { name: 'Info 2', code: 'I2' },
            { name: 'Betrag', code: 'AMMOUNT' },
        ];

        this.menuItems = [
            {
                label: 'Datei',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Öffnen',
                        icon: 'pi pi-plus',
                        disabled: false,
                        command: () => {
                            this.fileUpload.basicFileInput.nativeElement.click();}
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-file-excel',
                        disabled: true,
                        command: () => {
                            this.exportToExcel()
                        }
                    }
                ]
            },
            {
                label: 'Ansicht',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Alles einblenden',
                        icon: 'pi pi-eye',
                        disabled: true,
                        command: () => {
                            this.hidingCols = []
                            this.menuItems![1].items![0].disabled = false
                            this.menuItems![1].items![1].disabled = false
                        }
                    },
                    {
                        label: 'Letzte Spalte',
                        icon: 'pi pi-replay',
                        disabled: true,
                        command: () => {
                            this.hidingCols.pop()
                            if( this.hidingCols.length == 0) {
                                this.menuItems![1].items![0].disabled = false
                                this.menuItems![1].items![1].disabled = false
                            }
                        }
                    }
                ]
            },
            {
                label: 'Konten',
                icon: 'pi pi-euro',
                items: [
                    {
                        label: 'Aachener Bank Giro',
                        command: () => {
                            this.setAccount('Aachener Bank Giro')
                        }
                    },
                    {
                        label: 'DKB Giro',
                        command: () => {
                            this.setAccount('DKB Giro')
                        }
                    },
                    {
                        label: 'Comdirect Visa',
                        command: () => {
                            this.setAccount('Comdirect Visa')
                        }
                    },
                    {
                        label: 'Comdirect Giro',
                        command: () => {
                            this.setAccount('Comdirect Giro')
                        }
                    },
                    {
                        label: 'Finom Giro',
                        command: () => {
                            this.setAccount('Finom Giro')
                        }
                    },
                    {
                        label: 'Comdirect Tagesgeld',
                        command: () => {
                            this.setAccount('Comdirect Tagesgeld')
                        }
                    },
                ]
            },
            {
                label: 'Kategorien',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'Lernen',
                        command: () => {
                            this.learnCategories()
                        }
                    },
                ]
            }
        ];

        this.setMenuItems()

    }

    ngAfterViewInit(): void {
        this.loading = false;
    }

    createObjectFromKeys(): { [key: string]: any } {
        
        const result: { [key: string]: any } = {};
        this.selectedOptions.forEach(option => {
            if ( option ) {
                result[option.name] = '';
            }
        });
        return result;
    }

    deselectRelevantRow(idx: number) {
        let index = this.highlightColumns.indexOf(idx);
        if (index !== -1) {
            this.highlightColumns.splice(index, 1)
            console.log('Element wurde entfernt:',  this.highlightColumns);
        } else {
            console.log('Element nicht gefunden im Array.');
        }
        
        this.selectedOptions[idx] = null;
    }

    isExportPossible() {
        if ( !this.selectedStartRow ) {
            this.menuItems![0].items![1].disabled = true
        } else {
            this.menuItems![0].items![1].disabled = false

        }
    }

    exportToExcel(): void {
        let header: string[] = this.options.map(option => option.name);
        header.unshift('Bankkonto')
        header.unshift('Kategorie')

        let data = this.generateExportData()

        // EXAMPLE
        // let data = [
        //     { Name: 'John Doe', Age: 30, City: 'New York' },
        //     { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
        //   ];

        this.excelService.generateExcel(header, data, 'user_data');
    }

    fileChangeListener(event: any): void {
        this.loading = true;
        this.menuItems![0].items![0].disabled = true
        const file = event.files[0];
        this.header = (this.header as unknown as string) === 'true' || this.header === true;

        this.messageService.add({ severity: 'info', summary: 'Datei erfolgreich eingelesen', detail: event.files[0].name });
    
        this.ngxCsvParser.parse(file, { header: this.header, delimiter: ';', encoding: 'utf8' })
        .pipe().subscribe({
            next: (result): void => {
                this.csvRecords = result;
                this.csvRecords.forEach( (row: any)=> {
                    //First field for category
                    row.unshift('')
                })
                this.maxColumns = this.getMaxColumns(this.csvRecords) + 2;
                this.selectedOptions = new Array(this.maxColumns).fill(null);
                this.loading = false;
            },
            error: (error: NgxCSVParserError): void => {
                this.loading = false;
                console.log('Error', error);
            }
        });
    }

    filterCategories(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.bookingCategories as any[]).length; i++) {
            let category = (this.bookingCategories as any[])[i];
            if (category.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(category);
            }
        }

        this.filteredBookingCategories = filtered;
    }

    getFilteredOptions(idx: number) {
        return this.options.filter(option =>
            !this.selectedOptions.includes(option) || 
            this.selectedOptions[idx] === option
        );
    }

    extractWords(text: string, minLength: number = 4): string[] {
        // Verwende eine Regex, um Worte zu extrahieren. Worte bestehen aus alphanumerischen Zeichen und Unterstrichen.
        if (text) {
            const words = text.match(/\b\w+\b/g) || [];
            // Filter die Worte nach der angegebenen Mindestlänge.
            return words.filter(word => word.length >= minLength);
        }
        return []
        
    }

    learnCategories() {
        let rowsCountFromStartRow = this.csvRecords.length - this.selectedStartRow;
        let optionWithIndex = 0;
        
        //Find Col with relevant data
        for (let i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i] && this.selectedOptions[i].code === 'I1') {
                optionWithIndex = i + 1;
                break;
            }
        }

        let wordArray = []

        for (let row = 0; row < rowsCountFromStartRow; row++) {
            wordArray = this.extractWords(this.csvRecords[row][optionWithIndex])
            for ( let word in wordArray) {
                this.wordService.addWord(wordArray[word]).subscribe(word => {
                    console.log("added ", word)
                });
            }
        }

    }

    generateExportData() {
        let rowsCountFromStartRow = this.csvRecords.length - this.selectedStartRow;
        let data: Array<any> = Array.from({ length: rowsCountFromStartRow }, () => this.createObjectFromKeys());
    
        for (let col = 0; col < this.options.length; col++) {

            let code = this.options[col].code;
            let name = this.options[col].name;
            let optionWithIndex = 0;
            
            //Find Col with relevant data
            for (let i = 0; i < this.selectedOptions.length; i++) {
                if (this.selectedOptions[i] && this.selectedOptions[i].code === code) {
                    optionWithIndex = i;
                    break;
                }
            }
            
            for (let row = 0; row < rowsCountFromStartRow; row++) {

                let category = this.csvRecords[this.selectedStartRow + row][0]
                let dataOfCSV = this.csvRecords[this.selectedStartRow + row][optionWithIndex+1]
                data[row]['Kategorie'] = category
                data[row]['Bankkonto'] = this.selectedAccount
                if ( dataOfCSV ){
                    data[row][name] = dataOfCSV
                } else {
                    data[row][name] = ''
                }
            }
        }
    
        return data
    }

    getMaxColumns(data: Array<any>): number {
        let maxColumns = 0;
        data.forEach(row => {
            const columnCount = Object.keys(row).length;
            if (columnCount > maxColumns) {
                maxColumns = columnCount;
            }
        });
        return maxColumns;
    }

    hideColumn(idx: number) {
        this.menuItems![1].items![0].disabled = false
        this.menuItems![1].items![1].disabled = false
        this.hidingCols.push(idx)
    }

    onRowSelect(event: any): void {
        this.selectedStartRow = this.csvRecords.indexOf(this.selectedHeaderRow);
        this.isExportPossible()
        this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Daten werden ab Zeile ' + this.selectedStartRow + ' extrahiert!' });
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    resetUpload(fileUpload: any) {
        this.csvRecords = []
        fileUpload.clear()
    }

    setAccount(account: string) {
        this.selectedAccount = account;
        this.menuItems![2].label = account;
    }

    setCategory(row: number, event: any) {
        this.csvRecords[row][0] = event.value
    }

    setMenuItems() {
        this.menuItemsService.changeData(this.menuItems);
    }

    setRelevantRow(event: any, idx: number) {
        if ( !this.highlightColumns.includes(idx) ){
            this.highlightColumns.push(idx)
        }
        this.selectedOptions[idx] = event.value;
        this.isExportPossible()
    }
}