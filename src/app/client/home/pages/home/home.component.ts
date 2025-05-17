import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lightModeImage = 'Pit2.jpeg';
  darkModeImage = 'Pit3.jpeg';
  isDarkMode = false;

  ngOnInit() {
    // Verifica o tema salvo
    const theme = localStorage.getItem('theme');
    this.isDarkMode = theme === 'dark';
    this.alterarModoEscuro(this.isDarkMode);
  }

  alterarModoEscuro(ativar: boolean) {
    this.isDarkMode = ativar;
    const body = document.body;
    const heroImage = document.querySelector('.hero img') as HTMLImageElement;
    if (ativar) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      if (heroImage) heroImage.src = this.darkModeImage;
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (heroImage) heroImage.src = this.lightModeImage;
    }
  }
}
