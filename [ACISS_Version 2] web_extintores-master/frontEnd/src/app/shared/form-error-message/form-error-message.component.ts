import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  standalone: true,
  imports: [],
  templateUrl: './form-error-message.component.html',
  styleUrl: './form-error-message.component.css'
})
export class FormErrorMessageComponent {
  @Input('control') control: any;
  @Input('inputRequired') inputRequired: string = '';
  @Input('inputPattern') inputPattern: string = '';
}
