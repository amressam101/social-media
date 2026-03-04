import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthHeroComponent } from "../../../shared/components/auth-hero/auth-hero.component";


@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthHeroComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

}
