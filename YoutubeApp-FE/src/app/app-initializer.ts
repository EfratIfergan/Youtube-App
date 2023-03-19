import { AuthService } from './services/auth.service';

export function appInitializer(authService: AuthService) {
  return () => {
    return authService.getOrCreateUserId();
  };
}
