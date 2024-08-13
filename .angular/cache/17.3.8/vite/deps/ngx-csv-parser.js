import {
  Component,
  Injectable,
  NgModule,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-7QE6QFEG.js";
import "./chunk-MOY5LPCH.js";
import "./chunk-MJQNUHK2.js";
import {
  Observable
} from "./chunk-SAI3DHVA.js";
import {
  __spreadValues
} from "./chunk-D4BLXQ56.js";

// node_modules/ngx-csv-parser/fesm2022/ngx-csv-parser.mjs
var NgxCSVParserError = class {
};
var _NgxCsvParser = class _NgxCsvParser {
  constructor() {
    this.defaultCSVParserConfig = {
      header: true,
      delimiter: ",",
      encoding: "utf8"
    };
  }
  parse(csvFile, config) {
    config = __spreadValues(__spreadValues({}, this.defaultCSVParserConfig), config);
    const ngxCSVParserObserver = new Observable((observer) => {
      try {
        let csvRecords = null;
        if (this.isCSVFile(csvFile)) {
          const reader = new FileReader();
          reader.readAsText(csvFile, config.encoding);
          reader.onload = () => {
            const csvData = reader.result.trim();
            if (csvData) {
              const csvRecordsArray = this.csvStringToArray(csvData, config.delimiter);
              const headersRow = this.getHeaderArray(csvRecordsArray);
              csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length, config);
              observer.next(csvRecords);
            } else {
              observer.next([]);
            }
            observer.complete();
          };
          reader.onerror = () => {
            this.badCSVDataFormatErrorHandler(observer);
          };
        } else {
          this.notCSVFileErrorHandler(observer);
        }
      } catch (error) {
        this.unknownCSVParserErrorHandler(observer);
      }
    });
    return ngxCSVParserObserver;
  }
  csvStringToArray(csvDataString, delimiter) {
    const regexPattern = new RegExp(`(\\${delimiter}|\\r?\\n|\\r|^)(?:"((?:\\\\.|""|[^\\\\"])*)"|([^\\${delimiter}"\\r\\n]*))`, "gi");
    let matchedPatternArray = regexPattern.exec(csvDataString);
    const resultCSV = [[]];
    while (matchedPatternArray) {
      if (matchedPatternArray[1].length && matchedPatternArray[1] !== delimiter) {
        resultCSV.push([]);
      }
      const cleanValue = matchedPatternArray[2] ? matchedPatternArray[2].replace(new RegExp('[\\\\"](.)', "g"), "$1") : matchedPatternArray[3];
      resultCSV[resultCSV.length - 1].push(cleanValue);
      matchedPatternArray = regexPattern.exec(csvDataString);
    }
    return resultCSV;
  }
  getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength, config) {
    const dataArr = [];
    const headersArray = csvRecordsArray[0];
    const startingRowToParseData = config.header ? 1 : 0;
    for (let i = startingRowToParseData; i < csvRecordsArray.length; i++) {
      const data = csvRecordsArray[i];
      if (data.length === headerLength && config.header) {
        const csvRecord = {};
        for (let j = 0; j < data.length; j++) {
          if (data[j] === void 0 || data[j] === null) {
            csvRecord[headersArray[j]] = "";
          } else {
            csvRecord[headersArray[j]] = data[j].trim();
          }
        }
        dataArr.push(csvRecord);
      } else {
        dataArr.push(data);
      }
    }
    return dataArr;
  }
  isCSVFile(file) {
    return file.name.toLowerCase().endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr) {
    const headers = csvRecordsArr[0];
    const headerArray = [];
    for (const header of headers) {
      headerArray.push(header);
    }
    return headerArray;
  }
  notCSVFileErrorHandler(observer) {
    const ngcCSVParserError = this.errorBuilder("NOT_A_CSV_FILE", "Selected file is not a csv File Type.", 2);
    observer.error(ngcCSVParserError);
  }
  unknownCSVParserErrorHandler(observer) {
    const ngcCSVParserError = this.errorBuilder("UNKNOWN_ERROR", "Unknown error. Please refer to official documentation for library usage.", 404);
    observer.error(ngcCSVParserError);
  }
  badCSVDataFormatErrorHandler(observer) {
    const ngcCSVParserError = this.errorBuilder("BAD_CSV_DATA_FORMAT", "Unable to parse CSV File.", 1);
    observer.error(ngcCSVParserError);
  }
  errorBuilder(type, message, code) {
    const ngcCSVParserError = new NgxCSVParserError();
    ngcCSVParserError.type = type;
    ngcCSVParserError.message = message;
    ngcCSVParserError.code = code;
    return ngcCSVParserError;
  }
};
_NgxCsvParser.ɵfac = function NgxCsvParser_Factory(t) {
  return new (t || _NgxCsvParser)();
};
_NgxCsvParser.ɵprov = ɵɵdefineInjectable({
  token: _NgxCsvParser,
  factory: _NgxCsvParser.ɵfac,
  providedIn: "root"
});
var NgxCsvParser = _NgxCsvParser;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCsvParser, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _NgxCsvParserComponent = class _NgxCsvParserComponent {
  constructor() {
  }
  ngOnInit() {
  }
};
_NgxCsvParserComponent.ɵfac = function NgxCsvParserComponent_Factory(t) {
  return new (t || _NgxCsvParserComponent)();
};
_NgxCsvParserComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgxCsvParserComponent,
  selectors: [["lib-ngx-csv-parser"]],
  decls: 2,
  vars: 0,
  template: function NgxCsvParserComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "p");
      ɵɵtext(1, " ngx-csv-parser works! ");
      ɵɵelementEnd();
    }
  },
  encapsulation: 2
});
var NgxCsvParserComponent = _NgxCsvParserComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCsvParserComponent, [{
    type: Component,
    args: [{
      selector: "lib-ngx-csv-parser",
      template: `
    <p>
      ngx-csv-parser works!
    </p>
  `
    }]
  }], function() {
    return [];
  }, null);
})();
var _NgxCsvParserModule = class _NgxCsvParserModule {
};
_NgxCsvParserModule.ɵfac = function NgxCsvParserModule_Factory(t) {
  return new (t || _NgxCsvParserModule)();
};
_NgxCsvParserModule.ɵmod = ɵɵdefineNgModule({
  type: _NgxCsvParserModule,
  declarations: [NgxCsvParserComponent],
  exports: [NgxCsvParserComponent]
});
_NgxCsvParserModule.ɵinj = ɵɵdefineInjector({
  providers: [NgxCsvParser]
});
var NgxCsvParserModule = _NgxCsvParserModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxCsvParserModule, [{
    type: NgModule,
    args: [{
      declarations: [NgxCsvParserComponent],
      imports: [],
      providers: [NgxCsvParser],
      exports: [NgxCsvParserComponent]
    }]
  }], null, null);
})();
export {
  NgxCSVParserError,
  NgxCsvParser,
  NgxCsvParserComponent,
  NgxCsvParserModule
};
//# sourceMappingURL=ngx-csv-parser.js.map
