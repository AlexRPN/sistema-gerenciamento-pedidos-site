import { Component } from "@angular/core";
import { BodyComponent } from "../body/body.component";
import { SidenavComponent } from "../sidenav/sidenav.component";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidenavComponent, BodyComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  title = 'sistema-gerenciamento-pedidos-site';

  isSidenavCollapsed = false;
  screenWidth = 0;

  onToggleSidenav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
