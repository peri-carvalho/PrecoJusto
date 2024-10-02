import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewComponent } from './components/new-component/new-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewComponent],
  template:`
  <app-new-component />
  `
  
})
export class AppComponent {
  title = 'meu-primeiro-projeto-latest';
  
} 


