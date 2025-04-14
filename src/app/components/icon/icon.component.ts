import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() icon: string = '';
  @Input() size: string = '1em';
  @Input() color: string = '';
  @Input() style: string = '';
}
