import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

const tokenExpired = (token: String | null) => {
  if (!token) return true;
  const payload = token.split('.')[1];
  const decodedPayload = JSON.parse(atob(payload));
  const exp = decodedPayload.exp;
  const now = Math.floor(Date.now() / 1000);
  return exp < now;
}

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      error: (err) => {
        if (err.status === 401 || err.status === 403 || (err.status === 500 && tokenExpired(req.headers.get('Authorization')))) {
          // Handle token expiration
          console.error('Token expired. Please log in again.');
          sessionStorage.removeItem('token');
          window.location.reload();
        }
      }
    })
  );
};
