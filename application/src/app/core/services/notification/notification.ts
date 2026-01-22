import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar){}

  showError(message: string, action: string = '', config?: MatSnackBarConfig){
    const defaultConfig:MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
      ...config
    };

    this.snackBar.open(message, action, defaultConfig);
  };

  handleHttpError(error: HttpErrorResponse): Observable<never>{
    let errorMessage = 'Ocurrió un error inesperado.'
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.status >= 500) {
      errorMessage = 'Error en el servidor. Intenta nuevamente más tarde.';
    } else if (error.status === 404) {
      errorMessage = 'El recurso solicitado no fue encontrado.';
    } else if (error.status === 403) {
      errorMessage = 'No tienes permisos para realizar esta acción.';
    } else if (error.status === 401) {
      errorMessage = 'Sesión expirada. Estamos intentando reconectar...';
    } else if (error.status === 400) {
      errorMessage = 'Datos inválidos. Por favor verifica la información ingresada.';
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar con el servidor. Revisa tu conexión.';
    }

    this.showError(errorMessage);
    return throwError(() => error);
  };

  showSuccess(message: string){
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    };

    this.snackBar.open(message, 'OK', config);
  }
}
