import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor(private auth: AuthService, private route: Router) {

  }

  logout() {
    this.auth.logout().then(()=>{
      this.route.navigate(['/login'])
    });
  }

}
