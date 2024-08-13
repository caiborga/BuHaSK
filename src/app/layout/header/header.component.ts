import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuItemsService } from '../../services/menu-items.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MenubarModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    items: MenuItem[] | undefined;
    additionalMenuItems: MenuItem[] | undefined;

    constructor(private menuItemsService: MenuItemsService) {}

    ngOnInit() {
        this.menuItemsService.additionalMenuItems.subscribe((data: MenuItem[]) => {
            this.initializeMenuItems()
            this.additionalMenuItems = data;
            this.items = this.items!.concat(data)
            // console.log('Data changed:', data);
        })
    }

    initializeMenuItems(){
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: ['/home']
            },
            {
                separator: true
            }
        ]
    }
}
