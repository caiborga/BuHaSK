import { Routes } from "@angular/router";
import { TableComponent } from "./pages/table/table.component";
import { WordListComponent } from "./pages/word-list/word-list.component";
import { HomeComponent } from "./pages/home/home.component";

// Definiere die Routen und exportiere sie
export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {   
        path: 'csv-importer',
        component: TableComponent,
    },
    {
        path: 'words',
        component: WordListComponent
    }
];