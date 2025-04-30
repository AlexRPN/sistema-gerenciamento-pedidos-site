import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { BodyComponent } from "./body/body.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, SidenavComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sistema-gerenciamento-pedidos-site';

  isSidenavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
