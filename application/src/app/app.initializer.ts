import { AuthService } from "./core/services/auth/auth.service";

export function appInitializer(authService: AuthService) {
  return () => authService.rehydrateSession().toPromise();
}