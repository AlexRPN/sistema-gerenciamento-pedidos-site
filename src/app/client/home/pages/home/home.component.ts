import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  lightModeImage = '/assets/shared/images/cliente/Pit2.jpeg';
  //darkModeImage = '/assets/shared/images/cliente/Pit3.jpeg';
  isDarkMode = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Verifica o tema salvo
      const theme = localStorage.getItem('theme');
      this.isDarkMode = theme === 'dark';
      this.alterarModoEscuro(this.isDarkMode);
    }
  }

  alterarModoEscuro(ativar: boolean) {
    if (typeof window === 'undefined') return;

    this.isDarkMode = ativar;
    const body = document.body;
    const heroImage = document.querySelector('.hero-img') as HTMLImageElement;
    if (ativar) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      //if (heroImage) heroImage.src = this.darkModeImage;
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      if (heroImage) heroImage.src = this.lightModeImage;
    }
  }
}
