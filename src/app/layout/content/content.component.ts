import { Component } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [AppRoutingModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {}