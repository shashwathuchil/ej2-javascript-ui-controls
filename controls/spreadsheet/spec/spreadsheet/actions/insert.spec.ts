import { SpreadsheetHelper } from "../util/spreadsheethelper.spec";
import { defaultData, InventoryList } from '../util/datasource.spec';
import { SheetModel,CellModel, getCellAddress, Spreadsheet, ConditionalFormatModel, getRangeAddress } from "../../../src/index";
import { L10n } from '@syncfusion/ej2-base';

describe('Insert & Delete ->', () => {
    let helper: SpreadsheetHelper = new SpreadsheetHelper('spreadsheet');

    describe('public method ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Insert', (done: Function) => {
            helper.invoke('insertRow', [2, 3]);
            expect(helper.getInstance().sheets[0].rows[2]).toEqual({});
            expect(helper.getInstance().sheets[0].rows[3]).toEqual({});
            setTimeout(() => {
                expect(helper.invoke('getCell', [2, 0]).textContent).toBe('');
                expect(helper.invoke('getCell', [4, 0]).textContent).toBe('Sports Shoes');

                helper.invoke('insertColumn', [3, 4]);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[0].cells[3]).toBeNull();
                    expect(helper.getInstance().sheets[0].rows[1].cells[3]).toBeNull();
                    expect(helper.getInstance().sheets[0].rows[0].cells[5].value).toEqual('Quantity');
                    expect(helper.invoke('getCell', [0, 3]).textContent).toBe('');
                    expect(helper.invoke('getCell', [0, 5]).textContent).toBe('Quantity');

                    helper.invoke('insertSheet', [1, 2]);
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[1].name).toBe('Sheet2');
                        expect(helper.getInstance().sheets[2].name).toBe('Sheet3');
                        expect(helper.getElementFromSpreadsheet('.e-sheet-tab').getElementsByClassName('e-toolbar-item').length).toBe(3);
                        done();
                    });
                });
            });
        });

        it('Delete', (done: Function) => {
            helper.invoke('delete', [6, 6, 'Row']);
            setTimeout(() => {
                expect(helper.getInstance().sheets[0].rows[6].cells[0].value).toBe('Flip- Flops & Slippers');
                expect(helper.invoke('getCell', [6, 0]).textContent).toBe('Flip- Flops & Slippers');

                helper.invoke('delete', [6, 7, 'Column']);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[0].cells[6].value).toBe('Discount');
                    expect(helper.invoke('getCell', [0, 6]).textContent).toBe('Discount');

                    helper.invoke('delete', [1, 1, 'Sheet']);
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[1].name).toBe('Sheet3');
                        expect(helper.getInstance().sheets[2]).toBeUndefined();
                        expect(helper.getElementFromSpreadsheet('.e-sheet-tab').getElementsByClassName('e-toolbar-item').length).toBe(2);
                        done();
                    });
                });
            });
        });
    });
    describe('UI interaction ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{ name: 'Border Types', showGridLines: false }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.setBorder({ border: '1px solid #000000' }, 'B2:D5', 'Outer');
                    spreadsheet.setBorder({ border: '1px solid #000000' }, 'G2:I5', 'Inner');
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Insert row between borders', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.insertRow(2);
            expect(spreadsheet.sheets[0].rows[2].cells[1].style).toEqual(jasmine.objectContaining({ borderLeft: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[2].cells[3].style).toEqual(jasmine.objectContaining({ borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[2].cells[6].style).toEqual(jasmine.objectContaining({ borderBottom: '1px solid #000000', borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[2].cells[7].style).toEqual(jasmine.objectContaining({ borderLeft: '1px solid #000000', borderBottom: '1px solid #000000', borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[2].cells[8].style).toEqual(jasmine.objectContaining({ borderBottom: '1px solid #000000', borderLeft: '1px solid #000000' }));
            done();
        });
        it('Insert column between borders', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.insertColumn(7);
            expect(spreadsheet.sheets[0].rows[1].cells[7].style).toEqual(jasmine.objectContaining({ borderBottom: '1px solid #000000', borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[2].cells[7].style).toEqual(jasmine.objectContaining({ borderBottom: '1px solid #000000', borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[3].cells[7].style).toEqual(jasmine.objectContaining({ borderBottom: '1px solid #000000', borderTop: '1px solid #000000', borderRight: '1px solid #000000' }));
            expect(spreadsheet.sheets[0].rows[5].cells[7].style).toEqual(jasmine.objectContaining({ borderTop: '1px solid #000000', borderRight: '1px solid #000000' }));
            done();
        });
    });

    describe('Insert row and column before applying freeze pane  ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Insert row and column before applying freeze pane', (done: Function) => {
            helper.invoke('insertRow', [2, 3]);
            expect(helper.getInstance().sheets[0].rows[2]).toEqual({});
            expect(helper.getInstance().sheets[0].rows[3]).toEqual({});
            setTimeout(() => {
                expect(helper.invoke('getCell', [2, 0]).textContent).toBe('');
                expect(helper.invoke('getCell', [4, 0]).textContent).toBe('Sports Shoes');

                helper.invoke('insertColumn', [3, 4]);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[0].cells[3]).toBeNull();
                    expect(helper.getInstance().sheets[0].rows[1].cells[3]).toBeNull();
                    expect(helper.getInstance().sheets[0].rows[0].cells[5].value).toEqual('Quantity');
                    expect(helper.invoke('getCell', [0, 3]).textContent).toBe('');
                    expect(helper.invoke('getCell', [0, 5]).textContent).toBe('Quantity');
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.freezePanes(3,3,0);
                    let sheet: SheetModel; let childCount: number; let usedRange: string;
                    sheet = helper.getInstance().getActiveSheet();
                    expect(sheet.paneTopLeftCell).toBe('D4');
                    done();
                },0);
            },0);
        });
    });

    describe('UI-Interaction->', () => {
        beforeAll((done: Function) => {
            L10n.load({
                'de-DE': {
                    'spreadsheet': {
                        'InsertRow': 'Zeile einf�gen',
                        'DeleteRow': 'Zeile l�schen',
                        'InsertColumn': 'Spalte einf�gen',
                        'DeleteColumn': 'Spalte l�schen',
                    }
                }
            });
            helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] , locale:'de-DE' }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Insert Row-Before->', (done: Function) => {
            helper.invoke('selectRange', ['A2']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                cell = helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)');
                coords = <DOMRect>cell.getBoundingClientRect();
                helper.triggerMouseAction('mouseover', { x: coords.x, y: coords.y }, cell.parentElement.parentElement, cell);
                setTimeout(() => {
                    helper.click('.e-spreadsheet-contextmenu .e-ul li:nth-child(1)');
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rows[1]).toEqual({});
                        expect(helper.invoke('getCell', [1, 0]).textContent).toBe('');
                        expect(helper.invoke('getCell', [2, 0]).textContent).toBe('Casual Shoes');
                        done();
                    });
                }, 50);
            });
        });

        it('Insert Row-after->', (done: Function) => {
            helper.invoke('selectRange', ['A3']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[2].cells[0];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                cell = helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)');
                coords = <DOMRect>cell.getBoundingClientRect();
                helper.triggerMouseAction('mouseover', { x: coords.x, y: coords.y }, cell.parentElement.parentElement, cell);
                setTimeout(() => {
                    helper.click('.e-spreadsheet-contextmenu .e-ul li:nth-child(2)');
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rows[3]).toEqual({});
                        expect(helper.invoke('getCell', [3, 0]).textContent).toBe('');
                        expect(helper.invoke('getCell', [4, 0]).textContent).toBe('Sports Shoes');
                        done();
                    });
                }, 50);
            });
        });

        it('Delete Row->', (done: Function) => {
            helper.invoke('selectRange', ['A2']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                helper.getElement('#' + helper.id + '_contextmenu li:nth-child(7)').click();
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[1].cells[0].value).toBe('Casual Shoes');
                    expect(helper.invoke('getCell', [1, 0]).textContent).toBe('Casual Shoes');
                    done();
                }, 50);
            });
        });

        it('Insert Column-Before->', (done: Function) => {
            helper.invoke('selectRange', ['B1']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                cell = helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)');
                coords = <DOMRect>cell.getBoundingClientRect();
                helper.triggerMouseAction('mouseover', { x: coords.x, y: coords.y }, cell.parentElement.parentElement, cell);
                setTimeout(() => {
                    helper.click('.e-spreadsheet-contextmenu .e-ul li:nth-child(1)');
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rows[0].cells[1]).toBeNull();
                        expect(helper.invoke('getCell', [0, 1]).textContent).toBe('');
                        expect(helper.invoke('getCell', [0, 2]).textContent).toBe('Date');
                        done();
                    });
                }, 50);
            });
        });

        it('Insert Column-After->', (done: Function) => {
            helper.invoke('selectRange', ['C1']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[2];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                cell = helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)');
                coords = <DOMRect>cell.getBoundingClientRect();
                helper.triggerMouseAction('mouseover', { x: coords.x, y: coords.y }, cell.parentElement.parentElement, cell);
                setTimeout(() => {
                    helper.click('.e-spreadsheet-contextmenu .e-ul li:nth-child(2)');
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rows[0].cells[3]).toBeNull();
                        expect(helper.invoke('getCell', [0, 3]).textContent).toBe('');
                        expect(helper.invoke('getCell', [0, 4]).textContent).toBe('Time');
                        done();
                    });
                }, 50);
            });
        });

        it('Delete Column->', (done: Function) => {
            helper.invoke('selectRange', ['B1']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                helper.getElement('#' + helper.id + '_contextmenu li:nth-child(7)').click();
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[0].cells[1].value).toBe('Date');
                    expect(helper.invoke('getCell', [0, 1]).textContent).toBe('Date');
                    expect(helper.getInstance().sheets[0].rows[0].cells[2]).toBeNull();
                    done();
                }, 50);
            });
        });
    });
    
    describe('UI-Interaction with Localization and Protect Sheet->', () => {
        beforeAll((done: Function) => {
            L10n.load({
                'de-DE': {
                    'spreadsheet': {
                        'InsertRow': 'Zeile einf�gen',
                        'DeleteRow': 'Zeile l�schen',
                        'InsertColumn': 'Spalte einf�gen',
                        'DeleteColumn': 'Spalte l�schen',
                    }
                }
            });
            helper.initializeSpreadsheet({ sheets: [{ isProtected: true, protectSettings: { selectCells: true, formatCells: true, formatRows: true, insertLink:
                false, formatColumns: true }, ranges: [{ dataSource: defaultData }] }] , locale:'de-DE' }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Insert/Delete Row Checking ->', (done: Function) => {
            helper.invoke('selectRange', ['A2']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                expect(helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)').classList).toContain('e-disabled');
                expect(helper.getElement('#' + helper.id + '_contextmenu li:nth-child(7)').classList).toContain('e-disabled');
                done();
            });
        });
        
        it('Insert/Delete Column Checking ->', (done: Function) => {
            helper.invoke('selectRange', ['B1']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            let cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
            let coords: DOMRect = <DOMRect>cell.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, cell);
            setTimeout(() => {
                expect(helper.getElement('#' + helper.id + '_contextmenu li:nth-child(6)').classList).toContain('e-disabled');
                expect(helper.getElement('#' + helper.id + '_contextmenu li:nth-child(7)').classList).toContain('e-disabled');
                done();
            });
        });

        it('Hyperlink Checking ->', (done: Function) => {
            helper.invoke('selectRange', ['B1']);
            helper.setAnimationToNone('#' + helper.id + '_contextmenu');
            const td: HTMLTableCellElement = helper.invoke('getCell', [0, 0]);
            const coords: DOMRect = <DOMRect>td.getBoundingClientRect();
            helper.triggerMouseAction('contextmenu', { x: coords.x, y: coords.y }, null, td);
            setTimeout(() => {
                expect(helper.getElement('#' + helper.id + '_contextmenu li:nth-child(9)').classList).toContain('e-disabled');
                done();
            });
        });
    });

    describe('CR-Issues ->', () => {
        describe('I289560 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({}, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Issue with data updation in the inserted column ', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.insertColumn(1);
                setTimeout((): void => {
                    const cellsModel: CellModel[] = [{ value: 'Unit Price', style: { fontWeight: 'bold', textAlign: 'center' } }, { value: '18.00' },
                        { value: '19.00' }, { value: '10.00' }, { value: '22.00' }, { value: '21.35' }, { value: '25.00' }, { value: '30.00' },
                        { value: '21.00' }, { value: '40.00' }, { value: '97.00' }];
                    let rowIndex: number = 1;
                    cellsModel.forEach((cell: CellModel): void => {
                        spreadsheet.updateCell(cell, getCellAddress(rowIndex, 1)); rowIndex++;
                    });
                    expect(spreadsheet.sheets[0].rows[1].cells[1].value).toBe('Unit Price');
                    expect(helper.invoke('getCell', [1, 1]).textContent).toBe('Unit Price');
                    expect(spreadsheet.sheets[0].rows[2].cells[1].value.toString()).toBe('18');
                    expect(helper.invoke('getCell', [2, 1]).textContent).toBe('18');
                    expect(spreadsheet.sheets[0].rows[11].cells[1].value.toString()).toBe('97');
                    expect(helper.invoke('getCell', [11, 1]).textContent).toBe('97');
                    done();
                });
            });
        });
        describe('fb16095, I284821, I309406, F161227, I282799, I282799 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet(
                    { showSheetTabs: false, definedNames: [{ name: 'definedRange', refersTo: 'Sheet1!A1:C3' }], sheets: [{ rows: [{ cells:
                    [{ value: '10' }] }, { cells: [{ value: '5' }] }, { cells: [{ formula: '=SUM(A1:A2)' }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('After insert new row cell edit is not working and update formula while insert/delete the rows/columns in calculate library', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.definedNames[0].refersTo).toBe('=Sheet1!A1:C3');
                expect(spreadsheet.sheets[0].rows[2].cells[0].formula).toBe('=SUM(A1:A2)');
                spreadsheet.insertRow(1);
                setTimeout((): void => {
                    expect(spreadsheet.definedNames[0].refersTo).toBe('=Sheet1!A1:C4');
                    expect(spreadsheet.sheets[0].rows[3].cells[0].formula).toBe('=SUM(A1:A3)');
                    helper.edit('A2', '20');
                    setTimeout((): void => {
                        expect(spreadsheet.sheets[0].rows[1].cells[0].value.toString()).toBe('20');
                        expect(helper.invoke('getCell', [1, 0]).textContent).toBe('20');
                        expect(spreadsheet.sheets[0].rows[3].cells[0].value.toString()).toBe('35');
                        expect(helper.invoke('getCell', [3, 0]).textContent).toBe('35');
                        done();
                    }, 20);
                });
            });
        });
        describe('I312024 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ name: 'Default' }, { name: 'Deleted' }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Sheets property issue in delete method', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets.length).toBe(2);
                spreadsheet.delete(1);
                setTimeout((): void => {
                    expect(spreadsheet.sheets.length).toBe(1);
                    expect(helper.getElements('#' + helper.id + ' .e-sheet-tab .e-toolbar-item').length).toBe(1);
                    done();
                });
            });
        });
        describe('F161685, I311828, I315412 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ name: 'Sheet1' }, { name: 'Sheet2' }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Issue with insertSheet method while passing the index argument and usedRange not updated properly with the inserted sheets', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets.length).toBe(2);
                spreadsheet.insertSheet([{ index: 2, name: 'Inserted Sheet' }]);
                setTimeout((): void => {
                    expect(spreadsheet.sheets.length).toBe(3);
                    expect(spreadsheet.sheets[2].usedRange.rowIndex).toBe(0);
                    expect(spreadsheet.sheets[2].usedRange.colIndex).toBe(0);
                    expect(helper.getElements('#' + helper.id + ' .e-sheet-tab .e-toolbar-item').length).toBe(3);
                    done();
                });
            });
        });
        describe('I309292 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ allowInsert: false, allowDelete: false }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Insert delete disable issues in context menu', (done: Function) => {
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[2];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    expect(helper.getElement('#' + helper.id + '_cmenu_insert_column').classList).toContain('e-disabled');
                    expect(helper.getElement('#' + helper.id + '_cmenu_delete_column').classList).toContain('e-disabled');
                    done();
                });
            });
        });
        describe('SF-359221 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets:[{rowCount:100, colCount:100}], scrollSettings: { enableVirtualization: false} }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Insert row not working properly while virtual scrolling is disabled', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.insertRow();
                spreadsheet.insertColumn();
                setTimeout((): void => {
                    expect((spreadsheet.getRow(0) as any).ariaRowIndex).toBe('1');
                    expect(spreadsheet.getColumnHeaderContent().getElementsByClassName("e-header-cell")[0].textContent).toBe("A");
                    done();
                });
            });
        });

        describe('Insert column with conditional formatting ->', () => {
            beforeAll((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{
                        name: 'Inventory List', ranges: [{ dataSource: InventoryList, startCell: 'A2' }],
                        conditionalFormats: [
                            { type: 'GYRColorScale', range: 'C3:C18' },
                        ]
                    }],
                    created: (): void => {
                        const spreadsheet: Spreadsheet = helper.getInstance();
                        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
                        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
                        spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
                        spreadsheet.conditionalFormat({ type: 'LessThan', value: '12', range: 'D3:F18' });
                    }
                }, done);
            });
            afterAll(() => {
                helper.invoke('destroy');
            });
            it('Insert column before - 1 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 0, spreadsheet.sheets[0].rowCount, 1]));
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:E18");
                        expect(cfRule[1].range).toEqual("F3:H18");
                        done();
                    }, 50);
                });
            });
            it('Insert column before -  1 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("C3:C18");
                expect(cfRule[1].range).toEqual("D3:F18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:E18");
                expect(cfRule[1].range).toEqual("F3:H18");
                done();
            });
            it('Insert column before - 2 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 3, spreadsheet.sheets[0].rowCount, 4])); //D1:E200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[4];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:G18");
                        expect(cfRule[1].range).toEqual("H3:J18");
                        done();
                    }, 50);
                });
            });
            it('Insert column before -  2 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:E18");
                expect(cfRule[1].range).toEqual("F3:H18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:G18");
                expect(cfRule[1].range).toEqual("H3:J18");
                done();
            });

            it('Insert column before - 3 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 6, spreadsheet.sheets[0].rowCount, 6])); //G1:G200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[6];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:H18");
                        expect(cfRule[1].range).toEqual("I3:K18");
                        done();
                    }, 50);
                });
            });
            it('Insert column before -  3 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:G18");
                expect(cfRule[1].range).toEqual("H3:J18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                done();
            });

            it('Insert column before - 4 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 7, spreadsheet.sheets[0].rowCount, 8])); //H1:I200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[8];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:J18");
                        expect(cfRule[1].range).toEqual("K3:M18");
                        done();
                    }, 50);
                });
            });

            it('Insert column before -  4 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:M18");
                done();
            });

            it('Insert column before - 5 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 11, spreadsheet.sheets[0].rowCount, 12])); //L1:M200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[12];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:J18");
                        expect(cfRule[1].range).toEqual("K3:O18");
                        done();
                    }, 50);
                });
            });
            it('Insert column before -  5 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:M18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:O18");
                done();
            });
            it('Insert column before - 6 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 14, spreadsheet.sheets[0].rowCount, 15])); //O1:P200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[15];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:J18");
                        expect(cfRule[1].range).toEqual("K3:Q18");
                        done();
                    }, 50);
                });
            });

            it('Insert column before -  6 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:O18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:Q18");
                done();
            });

            it('Insert column before - 7 using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 17, spreadsheet.sheets[0].rowCount, 18])); //R1:S200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[18];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_before").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("G3:J18");
                        expect(cfRule[1].range).toEqual("K3:Q18");
                        done();
                    }, 50);
                });
            });
            it('Insert column before -  7 Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("G3:J18");
                expect(cfRule[1].range).toEqual("K3:Q18");
                helper.click('#spreadsheet_undo');
                helper.click('#spreadsheet_undo');
                helper.click('#spreadsheet_undo');
                helper.click('#spreadsheet_undo');
                helper.click('#spreadsheet_undo');
                helper.click('#spreadsheet_undo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("C3:C18");
                expect(cfRule[1].range).toEqual("D3:F18");
                done();
            });

            it('Insert column after - 1 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 0, spreadsheet.sheets[0].rowCount, 1])); //A1:B200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:E18");
                        expect(cfRule[1].range).toEqual("F3:H18");
                        done();
                    });
                });
            });

            it('Insert column after - 1 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("C3:C18");
                expect(cfRule[1].range).toEqual("D3:F18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:E18");
                expect(cfRule[1].range).toEqual("F3:H18");
                done();
            });

            it('Insert column after - 2 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 4, spreadsheet.sheets[0].rowCount, 4])); //E1:E200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[4];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:F18");
                        expect(cfRule[1].range).toEqual("G3:I18");
                        done();
                    }, 500);
                });
            });

            it('Insert column after - 2 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:E18");
                expect(cfRule[1].range).toEqual("F3:H18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:F18");
                expect(cfRule[1].range).toEqual("G3:I18");
                done();
            });

            it('Insert column after - 3 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 4, spreadsheet.sheets[0].rowCount, 5])); //E1:F200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[5];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:H18");
                        expect(cfRule[1].range).toEqual("I3:K18");
                        done();
                    }, 50);
                });
            });

            it('Insert column after - 3 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:F18");
                expect(cfRule[1].range).toEqual("G3:I18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                done();
            });

            it('Insert column after - 4 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 10, spreadsheet.sheets[0].rowCount, 11])); //K1:L200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[11];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:H18");
                        expect(cfRule[1].range).toEqual("I3:K18");
                        done();
                    }, 50);
                });
            });

            it('Insert column after - 4 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                done();
            });

            it('Insert column after - 5 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 9, spreadsheet.sheets[0].rowCount, 9])); //J1:J200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[9];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:H18");
                        expect(cfRule[1].range).toEqual("I3:L18");
                        done();
                    }, 50);
                });
            });

            it('Insert column after - 5 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:K18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:L18");
                done();
            });

            it('Insert column after - 6 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 12, spreadsheet.sheets[0].rowCount, 12])); //M1:M200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[12];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:H18");
                        expect(cfRule[1].range).toEqual("I3:L18");
                        done();
                    }, 50);
                });
            });

            it('Insert column after - 6 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:L18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:L18");
                done();
            });

            it('Insert column after - 7 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([0, 4, spreadsheet.sheets[0].rowCount, 6])); //D1:F200
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[6];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_column");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_column_after").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("E3:K18");
                        expect(cfRule[1].range).toEqual("L3:O18");
                        done();
                    }, 50);
                });
            });

            it('Insert column after - 7 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:H18");
                expect(cfRule[1].range).toEqual("I3:L18");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("E3:K18");
                expect(cfRule[1].range).toEqual("L3:O18");
                done();
            });

        });

        describe('Insert row above with conditional formatting ->', () => {
            beforeAll((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{
                        name: 'Inventory List', ranges: [{ dataSource: InventoryList, startCell: 'A2' }],
                        conditionalFormats: [
                            { type: 'GYRColorScale', range: 'A3:AA3' },
                        ]
                    }],
                    created: (): void => {
                        const spreadsheet: Spreadsheet = helper.getInstance();
                        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
                        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
                        spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
                        spreadsheet.conditionalFormat({ type: 'LessThan', value: '12', range: 'A6:AA8' });
                    }
                }, done);
            });
            afterAll(() => {
                helper.invoke('destroy');
            });

            it('Insert row above - 1 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([1, 0, 1, spreadsheet.sheets[0].colCount])); //A2:Z2
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A4:AA4");
                        expect(cfRule[1].range).toEqual("A7:AA9");
                        done();
                    }, 50);
                });
            });

            it('Insert row above - 1 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:AA3");
                expect(cfRule[1].range).toEqual("A6:AA8");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A4:AA4");
                expect(cfRule[1].range).toEqual("A7:AA9");
                done();
            });

            it('Insert row above - 2 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([3, 0, 3, spreadsheet.sheets[0].colCount])); //A4:AA4
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[3].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A4:AA5");
                        expect(cfRule[1].range).toEqual("A8:AA10");
                        done();
                    }, 50);
                });
            });
            it('Insert row above - 2 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A4:AA4");
                expect(cfRule[1].range).toEqual("A7:AA9");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A4:AA5");
                expect(cfRule[1].range).toEqual("A8:AA10");
                done();
            });
            it('Insert row above - 3 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([2, 0, 4, spreadsheet.sheets[0].colCount])); //A3:AA5
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[4].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A7:AA8");
                        expect(cfRule[1].range).toEqual("A11:AA13");
                        done();
                    }, 50);
                });
            });
            it('Insert row above - 3 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A4:AA5");
                expect(cfRule[1].range).toEqual("A8:AA10");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A7:AA8");
                expect(cfRule[1].range).toEqual("A11:AA13");
                done();
            });
            it('Insert row above - 4 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([10, 0, 11, spreadsheet.sheets[0].colCount])); //A11:AA12
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[11].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A7:AA8");
                        expect(cfRule[1].range).toEqual("A11:AA15");
                        done();
                    }, 50);
                });
            });
            it('Insert row above - 4 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A7:AA8");
                expect(cfRule[1].range).toEqual("A11:AA13");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A7:AA8");
                expect(cfRule[1].range).toEqual("A11:AA15");
                done();
            });
            it('Insert row above - 5 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([14, 0, 15, spreadsheet.sheets[0].colCount])); //A15:AA16
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[15].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A7:AA8");
                        expect(cfRule[1].range).toEqual("A11:AA17");
                        done();
                    }, 500);
                });
            });

            it('Insert row above - 6 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([18, 0, 19, spreadsheet.sheets[0].colCount])); //A19:AA20
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[19].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A7:AA8");
                        expect(cfRule[1].range).toEqual("A11:AA17");
                        done();
                    }, 500);
                });
            });

            it('Insert row above - 7 - using contextmenu', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.selectRange(getRangeAddress([9, 0, 17, spreadsheet.sheets[0].colCount])); //A10:AA18
                const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[17].cells[0];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                    cell);
                setTimeout((): void => {
                    let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                    helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                    setTimeout(function () {
                        document.getElementById("spreadsheet_cmenu_insert_row_above").click();
                        let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                        expect(cfRule[0].range).toEqual("A7:AA8");
                        expect(cfRule[1].range).toEqual("A20:AA26");
                        done();
                    }, 50);
                });
            });

        });
        describe('SF-371630', () => {
            let sheet: any;
            beforeAll((done: Function) => {
                helper.initializeSpreadsheet(
                    { sheets: [{ ranges: [{ dataSource: defaultData }], rows: [{ index: 11, cells: [{ index: 4, formula: '=SUM(D2:E11)'
                }] }], selectedRange: 'D3' }] }, done);
            });
            afterAll(() => {
                helper.invoke('destroy');
            });
            it('Formula reference not updated while deleting row', (done: Function) => {
                sheet = helper.getInstance().sheets[0];
                expect(sheet.rows[11].cells[4].formula).toEqual('=SUM(D2:E11)');
                expect(sheet.rows[11].cells[4].value).toEqual(452);
                expect(helper.invoke('getCell', [11, 4]).textContent).toEqual('452');
                helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                helper.openAndClickCMenuItem(2, 0, [7], true);
                setTimeout((): void => {
                    expect(sheet.rows[10].cells[4].formula).toEqual('=SUM(D2:E10)');
                    expect(sheet.rows[10].cells[4].value).toEqual(402);
                    expect(helper.invoke('getCell', [10, 4]).textContent).toEqual('402');
                    done();
                });
            });
            it('Formula reference not updated while deleting column', (done: Function) => {
                helper.openAndClickCMenuItem(0, 3, [7], false, true);
                setTimeout((): void => {
                    expect(sheet.rows[10].cells[3].formula).toEqual('=SUM(D2:D10)');
                    expect(sheet.rows[10].cells[3].value).toEqual(145);
                    expect(helper.invoke('getCell', [10, 3]).textContent).toEqual('145');
                    done();
                });
            });
        });
    });
    describe('Insert row below with conditional formatting ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{
                    name: 'Inventory List', ranges: [{ dataSource: InventoryList, startCell: 'A2' }],
                    conditionalFormats: [
                        { type: 'GYRColorScale', range: 'A3:AA3' },
                    ]
                }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
                    spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
                    spreadsheet.conditionalFormat({ type: 'LessThan', value: '12', range: 'A6:AA8' });
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });

        it('Insert row below - 1 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([1, 0, 1, spreadsheet.sheets[0].colCount])); //A2:Z2
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                setTimeout(function () {
                    document.getElementById("spreadsheet_cmenu_insert_row_below").click();
                    let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                    expect(cfRule[0].range).toEqual("A4:AA4");
                    expect(cfRule[1].range).toEqual("A7:AA9");
                    done();
                }, 50);
            });
        });
        it('Insert row below - 1 - Undo and Redo', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.click('#spreadsheet_undo');
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:AA3");
                expect(cfRule[1].range).toEqual("A6:AA8");
                helper.click('#spreadsheet_redo');
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A4:AA4");
                expect(cfRule[1].range).toEqual("A7:AA9");
                done();
            });
        it('Insert row below - 2 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([3, 0, 3, spreadsheet.sheets[0].colCount])); //A2:Z2
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[3].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                setTimeout(function () {
                    document.getElementById("spreadsheet_cmenu_insert_row_below").click();
                    let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                    expect(cfRule[0].range).toEqual("A4:AA5");
                    expect(cfRule[1].range).toEqual("A8:AA10");
                    done();
                }, 50);
            });
        });
        it('Insert row below - 2 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A4:AA4");
            expect(cfRule[1].range).toEqual("A7:AA9");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A4:AA5");
            expect(cfRule[1].range).toEqual("A8:AA10");
            done();
        });
        it('Insert row below - 3 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([4, 0, 5, spreadsheet.sheets[0].colCount])); //A2:Z2
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[5].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                let target: HTMLElement = document.getElementById("spreadsheet_cmenu_insert_row");
                helper.triggerMouseAction('mouseover', { x: target.getBoundingClientRect().left + 10, y: target.getBoundingClientRect().top + 10 }, document.getElementsByClassName("e-contextmenu-wrapper")[0] as HTMLElement, target);
                setTimeout(function () {
                    document.getElementById("spreadsheet_cmenu_insert_row_below").click();
                    let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                    expect(cfRule[0].range).toEqual("A4:AA5");
                    expect(cfRule[1].range).toEqual("A10:AA12");
                    done();
                }, 50);
            });
        });
        it('Insert row below - 3 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A4:AA5");
            expect(cfRule[1].range).toEqual("A8:AA10");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A4:AA5");
            expect(cfRule[1].range).toEqual("A10:AA12");
            done();
        });
    });
    describe('Public methods Insert column with conditional formatting ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{
                    name: 'defaultData', ranges: [{ dataSource: defaultData, startCell: 'A2' }],
                    conditionalFormats: [
                        { type: "ContainsText", cFColor: "RedFT", value:'shoes', range: 'A2:A11' },
                        { type: "DateOccur", cFColor: "YellowFT", value:'7/22/2014', range: 'B2:B11' },
                        { type: "GreaterThan", cFColor: "GreenFT", value:'11:26:32 AM', range: 'C2:C11' },
                      ]
                }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
                    spreadsheet.conditionalFormat({ type: "Duplicate", cFColor: "RedT", range: 'E2:H11' });
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Public method - Insert column conditional formaating cells 1', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertColumn(0,0);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:B11");
                expect(cfRule[1].range).toEqual("C2:C11");
                expect(cfRule[2].range).toEqual("D2:D11");
                expect(cfRule[3].range).toEqual("F2:I11");
                done();
                }, 50);
        });
        it('Public method - Insert column conditional formaating cells 2', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertColumn(4,4);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:B11");
                expect(cfRule[1].range).toEqual("C2:C11");
                expect(cfRule[2].range).toEqual("D2:D11");
                expect(cfRule[3].range).toEqual("G2:J11");
                done();
                }, 50);
        });
        it('Public method - Insert column conditional formaating cells 3', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertColumn(7,8);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:B11");
                expect(cfRule[1].range).toEqual("C2:C11");
                expect(cfRule[2].range).toEqual("D2:D11");
                expect(cfRule[3].range).toEqual("G2:L11");
                done();
                }, 50);
        });
        it('Public method - Insert column conditional formaating cells 4', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertColumn(11,12);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:B11");
                expect(cfRule[1].range).toEqual("C2:C11");
                expect(cfRule[2].range).toEqual("D2:D11");
                expect(cfRule[3].range).toEqual("G2:L11");
                done();
                }, 50);
        });
        it('Public method - Insert column conditional formaating cells 5', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertColumn(5,6);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:B11");
                expect(cfRule[1].range).toEqual("C2:C11");
                expect(cfRule[2].range).toEqual("D2:D11");
                expect(cfRule[3].range).toEqual("G2:N11");
                done();
                }, 50);
        });
    });
    describe('Public methods Insert row with conditional formatting ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{
                    name: 'defaultData', ranges: [{ dataSource: defaultData, startCell: 'A2' }],
                    conditionalFormats: [
                        { type: "ContainsText", cFColor: "RedFT", value:'shoes', range: 'A2:A11' },
                        { type: "DateOccur", cFColor: "YellowFT", value:'7/22/2014', range: 'B2:B11' },
                        { type: "GreaterThan", cFColor: "GreenFT", value:'11:26:32 AM', range: 'C2:C11' },
                      ]
                }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
                    spreadsheet.conditionalFormat({ type: "Duplicate", cFColor: "RedT", range: 'E2:H11' });
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });
        it('Public method - Insert row conditional formaating cells 1', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertRow(0,0);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:A12");
                expect(cfRule[1].range).toEqual("B3:B12");
                expect(cfRule[2].range).toEqual("C3:C12");
                expect(cfRule[3].range).toEqual("E3:H12");
                done();
                }, 50);
        });
        it('Public method - Insert row conditional formaating cells 2', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertRow(2, 2);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:A13");
                expect(cfRule[1].range).toEqual("B3:B13");
                expect(cfRule[2].range).toEqual("C3:C13");
                expect(cfRule[3].range).toEqual("E3:H13");
                done();
            }, 50);
        });
        it('Public method - Insert row conditional formaating cells 3', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertRow(11, 12);
                setTimeout(function () {
                    cfRule = spreadsheet.sheets[0].conditionalFormats;
                    expect(cfRule[0].range).toEqual("A3:A15");
                    expect(cfRule[1].range).toEqual("B3:B15");
                    expect(cfRule[2].range).toEqual("C3:C15");
                    expect(cfRule[3].range).toEqual("E3:H15");
                    done();
                }, 50);
        });
        it('Public method - Insert row conditional formaating cells 4', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            let cfRule: ConditionalFormatModel[];
            spreadsheet.insertRow(17, 18);
            setTimeout(function () {
                cfRule = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:A15");
                expect(cfRule[1].range).toEqual("B3:B15");
                expect(cfRule[2].range).toEqual("C3:C15");
                expect(cfRule[3].range).toEqual("E3:H15");
                done();
            }, 50);
        });
    });
    describe('Delete column with conditional formatting ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{
                    name: 'Inventory List', ranges: [{ dataSource: InventoryList, startCell: 'A2' }],
                    conditionalFormats: [
                        { type: 'GYRColorScale', range: 'C3:C18' },
                    ]
                }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
                    spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
                    spreadsheet.conditionalFormat({ type: 'LessThan', value: '12', range: 'D3:F18' });
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });

        it('Delete column - 1 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 1, spreadsheet.sheets[0].rowCount, 1])); //B1:B200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("B3:B18");
                expect(cfRule[1].range).toEqual("C3:E18");
                done();
            },50);
        });
        it('Delete column  - 1 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("C3:C18");
            expect(cfRule[1].range).toEqual("D3:F18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            expect(cfRule[1].range).toEqual("C3:E18");
            done();
        });
        it('Delete column - 2 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 1, spreadsheet.sheets[0].rowCount, 1])); //B1:B200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[1];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("B3:D18");
                done();
            },50);
        });
        it('Delete column  - 2 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            expect(cfRule[1].range).toEqual("C3:E18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:D18");
            done();
        });
        it('Delete column - 3 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 2, spreadsheet.sheets[0].rowCount, 2])); //C1:C200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[2];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("B3:C18");
                done();
            },50);
        });
        it('Delete column  - 3 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:D18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:C18");
            done();
        });
        it('Delete column - 4 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 2, spreadsheet.sheets[0].rowCount, 3])); //C1:D200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[2];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("B3:B18");
                done();
            },50);
        });
        it('Delete column  - 4 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:C18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            done();
        });
        it('Delete column - 5 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 4, spreadsheet.sheets[0].rowCount, 4])); //E1:E200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[4];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("B3:B18");
                done();
            },50);
        });
        it('Delete column  - 5 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            done();
        });
        it('Delete column - 6 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([0, 0, spreadsheet.sheets[0].rowCount, 2])); //A1:C200
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-colhdr-table') as HTMLTableElement).rows[0].cells[2];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_column").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule.length).toEqual(0);
                done();
            },50);
        });
        it('Delete column  - 6 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("B3:B18");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule.length).toEqual(0);
            done();
        });
    });
    describe('Delete row with conditional formatting ->', () => {
        beforeAll((done: Function) => {
            helper.initializeSpreadsheet({
                sheets: [{
                    name: 'Inventory List', ranges: [{ dataSource: InventoryList, startCell: 'A2' }],
                    conditionalFormats: [
                        { type: 'GYRColorScale', range: 'A3:AA3' },
                    ]
                }],
                created: (): void => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A2:H2');
                    spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', fontSize: '13pt' }, 'A1:H1');
                    spreadsheet.numberFormat('$#,##0.00', 'F3:F18');
                    spreadsheet.conditionalFormat({ type: 'LessThan', value: '12', range: 'A6:AA8' });
                }
            }, done);
        });
        afterAll(() => {
            helper.invoke('destroy');
        });

        it('Delete row - 1 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([1,0,1,spreadsheet.sheets[0].colCount])); //A2:
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[1].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_row").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A2:AA2");
                expect(cfRule[1].range).toEqual("A5:AA7");
                done();
            },50);
        });
        it('Delete row  - 1 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA3");
            expect(cfRule[1].range).toEqual("A6:AA8");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A2:AA2");
            expect(cfRule[1].range).toEqual("A5:AA7");
            done();
        });
        it('Delete row - 2 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([1,0,2,spreadsheet.sheets[0].colCount])); //A2:
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[2].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_row").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:AA5");
                done();
            },50);
        });
        it('Delete row  - 2 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A2:AA2");
            expect(cfRule[1].range).toEqual("A5:AA7");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA5");
            done();
        });
        it('Delete row - 3 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([3,0,3,spreadsheet.sheets[0].colCount])); //A2:
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[3].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_row").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:AA4");
                done();
            },50);
        });
        it('Delete row  - 3 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA5");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA4");
            done();
        });
        it('Delete row - 4 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([5,0,5,spreadsheet.sheets[0].colCount])); //A2:
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[5].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_row").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule[0].range).toEqual("A3:AA4");
                done();
            },50);
        });
        it('Delete row  - 4 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA4");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA4");
            done();
        });
        it('Delete row - 5 - using contextmenu', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            spreadsheet.selectRange(getRangeAddress([2,0,5,spreadsheet.sheets[0].colCount])); //A2:
            const cell: HTMLElement = (helper.getElement('#' + helper.id + ' .e-rowhdr-table') as HTMLTableElement).rows[5].cells[0];
            helper.triggerMouseAction(
                'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null,
                cell);
            setTimeout((): void => {
                document.getElementById("spreadsheet_cmenu_delete_row").click();
                let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
                expect(cfRule.length).toEqual(0);
                done();
            },50);
            
        });
        it('Delete row  - 5 - Undo and Redo', (done: Function) => {
            const spreadsheet: Spreadsheet = helper.getInstance();
            helper.click('#spreadsheet_undo');
            let cfRule: ConditionalFormatModel[] = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule[0].range).toEqual("A3:AA4");
            helper.click('#spreadsheet_redo');
            cfRule = spreadsheet.sheets[0].conditionalFormats;
            expect(cfRule.length).toEqual(0);
            done();
        });
    });
    describe('CR - Issues->', () => {
        describe('EJ2-50688', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData }] }]
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('data loss in cut paste for newly inserted column', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.applyFilter([{ field: 'E', predicate: 'or', operator: 'contains', value: '10' }]);
                setTimeout(() => {
                    helper.invoke('selectRange', ['E1']);
                    helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                    helper.openAndClickCMenuItem(0, 4, [6, 2], false, true);
                    setTimeout(() => {
                        helper.invoke('selectRange', ['E1:E20']);
                        helper.getElement('#' + helper.id + '_cut').click();
                        setTimeout(() => {
                            helper.invoke('selectRange', ['F1']);
                            helper.getElement('#' + helper.id + '_paste').click();
                            setTimeout(() => {
                                expect(helper.invoke('getCell', [0, 5]).querySelector('.e-filtered')).toBeNull();
                                expect(helper.getInstance().sheets[0].rows[5].cells[5].value).toBe(10);
                                expect(helper.getInstance().sheets[0].rows[7].cells[5].value).toBe(10);
                                done();
                            });
                        });
                    });
                });
            });
        });
        describe('EJ2-50565', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData }], selectedRange:'H1:H20' }]
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('cut paste not working for inserted column in spreadsheet', (done: Function) => {
                helper.getElement('#' + helper.id + '_cut').click();
                setTimeout(() => {
                    helper.invoke('selectRange', ['E1']);
                    helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                    helper.openAndClickCMenuItem(0, 4, [6, 1], false, true);
                    setTimeout(() => {
                        helper.getElement('#' + helper.id + '_paste').click();
                        setTimeout(() => {
                            expect(helper.getInstance().sheets[0].rows[0].cells[4].value.toString()).toBe('Profit');
                            expect(helper.getInstance().sheets[0].rows[1].cells[4].value.toString()).toBe('10');
                            done();
                        });
                    });
                });
            });
        });
        describe('EJ2-51865', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData }] }]
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Delete empty row is not working', (done: Function) => {
                helper.invoke('selectRange', ['A11:H11']);
                helper.getElement('#' + helper.id + '_copy').click();
                setTimeout(() => {
                    helper.invoke('selectRange', ['A14:H14']);
                    helper.getElement('#' + helper.id + '_paste').click();
                    expect(helper.getInstance().sheets[0].rows[13].cells[0].value).toBe('T-Shirts');
                    setTimeout(() => {
                        helper.invoke('selectRange', ['A13']);
                        helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                        helper.openAndClickCMenuItem(12, 0, [7], true);
                        setTimeout(() => {
                            expect(helper.getInstance().sheets[0].rows[12].cells[0].value).toBe('T-Shirts');
                            done();
                        });
                    });
                });
            });
        });
        describe('EJ2-52375->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ rowCount: 10, colCount: 5, rows: [{ cells: [{ value: '1' }] }, { cells: [{ value: '2' }] },
                    { cells: [{ value: '3' }] }, { cells: [{ value: '4' }] }, { cells: [{ value: '5' }] }, { cells: [{ value: '6' }] },
                    { cells: [{ value: '7' }] },  { cells: [{ value: '8' }] },  { cells: [{ value: '9' }] }, { cells: [{ value: '10' }] }] }],
                    scrollSettings: { isFinite: true}
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Update row height based on cell template and update range on insert row->', (done: Function) => {
                helper.invoke('selectRange', ['A2']);
                helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                helper.openAndClickCMenuItem(1, 0, [6, 2], true);
                setTimeout(() => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    expect(spreadsheet.sheets[0].rows[10].cells[0].value.toString()).toBe('10');
                    expect(spreadsheet.sheets[0].rowCount).toBe(11);
                    done();
                });
            });
        });
        describe('EJ2-53476->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData }] }]
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('getRowData not working while inserting row using insertRow method->', (done: Function) => {
                helper.invoke('insertRow', [11, 11]);
                expect(helper.getInstance().sheets[0].rows[11]).toEqual({});
                setTimeout(() => {
                    expect(helper.invoke('getRow', [11]).getRowData).toBeNull;
                    done();
                });
            });
        });
        describe('EJ2-54284->', () => {
            beforeAll((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ rowCount: 11, colCount: 8, ranges: [{ dataSource: defaultData }] }], scrollSettings: { isFinite: true }
                }, done);
            });
            afterAll(() => {
                helper.invoke('destroy');
            });
            it('Insert / delete rows not working properly in finite mode->', (done: Function) => {
                helper.invoke('selectRange', ['A8:A11']);
                helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                helper.openAndClickCMenuItem(7, 0, [6, 1], true);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[7]).toEqual({});
                    expect(helper.getInstance().sheets[0].rows[10]).toEqual({});
                    expect(helper.getInstance().sheets[0].rowCount).toBe(15);
                    expect(helper.getInstance().sheets[0].usedRange.rowIndex).toBe(14);
                    helper.invoke('selectRange', ['A8:A11']);
                    helper.openAndClickCMenuItem(7, 0, [7], true);
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rowCount).toBe(11);
                        expect(helper.getInstance().sheets[0].usedRange.rowIndex).toBe(10);
                        done();
                    });
                });
            });
            it('Insert / delete columns not working properly in finite mode->', (done: Function) => {
                helper.invoke('selectRange', ['F1:H1']);
                helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                helper.openAndClickCMenuItem(0, 5, [6, 1], false, true);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].columns[5]).toEqual({});
                    expect(helper.getInstance().sheets[0].columns[7]).toEqual({});
                    expect(helper.getInstance().sheets[0].colCount).toBe(11);
                    expect(helper.getInstance().sheets[0].usedRange.colIndex).toBe(10);
                    helper.invoke('selectRange', ['F1:H1']);
                    helper.openAndClickCMenuItem(0, 7, [7], false, true);
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].colCount).toBe(8);
                        expect(helper.getInstance().sheets[0].usedRange.colIndex).toBe(7);
                        done();
                    });
                });
            });
        });
        describe('EJ2-54600->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData }] }]
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Undo/redo keyboard action working improperly when insert row in multiple times->', (done: Function) => {
                helper.invoke('selectRange', ['A1']);
                helper.setAnimationToNone('#' + helper.id + '_contextmenu');
                helper.openAndClickCMenuItem(0, 0, [6, 1], true);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rows[0]).toEqual({});
                    helper.invoke('selectRange', ['A3:A5']);
                    helper.openAndClickCMenuItem(3, 0, [6, 2], true);
                    setTimeout(() => {
                        expect(helper.getInstance().sheets[0].rows[5]).toEqual({});
                        expect(helper.getInstance().sheets[0].rows[6]).toEqual({});
                        expect(helper.getInstance().sheets[0].rows[7]).toEqual({});
                        helper.invoke('selectRange', ['A9']);
                        helper.triggerKeyNativeEvent(90, true);
                        helper.triggerKeyNativeEvent(90, true);
                        setTimeout(() => {
                            expect(helper.getInstance().sheets[0].rows[0]).not.toEqual({});
                            expect(helper.getInstance().sheets[0].rows[5]).not.toEqual({});
                            expect(helper.getInstance().sheets[0].rows[6]).not.toEqual({});
                            expect(helper.getInstance().sheets[0].rows[7]).not.toEqual({});
                            done();
                        });
                    });
                });
            });
        });
        describe('EJ2-54240->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    sheets: [{ ranges: [{ dataSource: defaultData, showFieldAsHeader: false }] }] 
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Range details not updated properly while insert rows using method in showFieldAsHeader as false->', (done: Function) => {
                helper.invoke('insertRow', [0, 0]);
                setTimeout(() => {
                    const spreadsheet: Spreadsheet = helper.getInstance();
                    expect(spreadsheet.getRowData(0,0)).toBe[ Object({}) ];
                    done();
                });
            });
        });
        describe('EJ2-57000->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets:[{ rowCount:10 }], scrollSettings: { isFinite: true} }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Need to fix the row not visible issue while inserting a new row at the end->', (done: Function) => {
                helper.invoke('insertRow', [10, 10]);
                setTimeout(() => {
                    expect(helper.getInstance().sheets[0].rowCount).toBe(11);
                    done();
                });
            });
        });
    });
});