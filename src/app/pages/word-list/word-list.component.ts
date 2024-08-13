import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../services/words.service';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuItemsService } from '../../services/menu-items.service';

@Component({
    imports: [FormsModule],
    selector: 'app-word-list',
    standalone: true,
    templateUrl: './word-list.component.html',
    styleUrls: ['./word-list.component.scss']
})
export class WordListComponent implements OnInit {
    words: Array<any> = [];
    menuItems: MenuItem[] | undefined;
    newWordText = '';
    newCategory = '';
    selectedWordId: number | null = null;
    errorMessage = '';

    constructor(
        private menuItemsService: MenuItemsService,
        private wordService: WordsService
    ) {}

    ngOnInit() {
        this.menuItems = [
            {
                label: 'Datei',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Öffnen',
                        icon: 'pi pi-plus',
                        disabled: false,
                        command: () => {}
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-file-excel',
                        disabled: true,
                        command: () => {}
                    }
                ]
            }
        ];
        this.loadWords();
        this.setMenuItems()
    }

    loadWords() {
        this.wordService.getWords().subscribe(data => {
            this.words = data;
        });
    }

    addWord() {
        this.wordService.addWord(this.newWordText).subscribe(
            word => {
                this.words.push(word);
                this.newWordText = '';
                this.errorMessage = '';
            },
            error => {
                this.errorMessage = error;
            }
        );
    }

    addCategory() {
        if (this.selectedWordId !== null) {
            this.wordService.addCategory(this.selectedWordId, this.newCategory).subscribe(updatedWord => {
                const index = this.words.findIndex(w => w.id === updatedWord.id);
                this.words[index] = updatedWord;
                this.newCategory = '';
                this.selectedWordId = null;
            });
        }
    }

    selectWord(wordId: number) {
        this.selectedWordId = wordId;
    }

    setMenuItems() {
        this.menuItemsService.changeData(this.menuItems);
    }
}
