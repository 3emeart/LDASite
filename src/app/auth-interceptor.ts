import { HttpInterceptorFn } from '@angular/common/http';

// Jeito CERTO (Seguro contra loop):
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Pega direto da API do browser

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};
