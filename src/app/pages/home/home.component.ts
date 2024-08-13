import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuItemsService } from '../../services/menu-items.service';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    menuItems: MenuItem[] | undefined;

    constructor(
        private menuItemsService: MenuItemsService
    ) {}

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'CSV Einlesen',
                icon: 'pi pi-home',
                routerLink: ['/csv-importer']
            },
            {
                label: 'Kategorien',
                icon: 'pi pi-home',
                routerLink: ['/words']
            },
        ];

        this.setMenuItems()
    }

    setMenuItems() {
        this.menuItemsService.changeData(this.menuItems);
    }


}
