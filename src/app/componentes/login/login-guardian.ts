import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuardian implements CanActivate {
    private isRedirecting = false; // Flag para evitar bucles infinitos

    constructor(private loginService: LoginService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url = state.url;
        console.log(`[Guard Debug] Ruta: ${url}, Logueado: ${this.loginService.estaLogueado()}`); // Log para debug (quita en prod)

        // Siempre permite /login para evitar loop
        if (url === '/login' || url.startsWith('/login?')) {
            return true;
        }

        // Si ya estamos redirigiendo, permite paso para romper loop
        if (this.isRedirecting) {
            console.warn('[Guard] Loop detectado: Permitiendo una vez');
            return true;
        }

        if (this.loginService.estaLogueado()) {
            console.log('[Guard] Acceso OK');
            return true;
        }

        console.log('[Guard] Redirigiendo a /login');
        this.isRedirecting = true;
        this.router.navigate(['/login'], { queryParams: { returnUrl: url } }); // Redirect a pública + guarda URL original
        setTimeout(() => this.isRedirecting = false, 300); // Reset flag
        return false;
    }
}