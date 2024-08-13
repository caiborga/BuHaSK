import { Component } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ContentComponent, FooterComponent, HeaderComponent, SidebarComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

}
