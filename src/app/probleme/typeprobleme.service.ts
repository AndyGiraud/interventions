import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {ITypeProbleme} from "./typeprobleme";
import { IProbleme } from './probleme';

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {
  //private baseUrl = 'https://localhost:5001/Interventions';
  private baseUrl = 'https://interventionag.azurewebsites.net/Interventions';
  constructor(private http: HttpClient) { }

  // saveProbleme(probleme: IProbleme): Observable<IProbleme> {
  //   return this.createProbleme(probleme);
  // }

  //  /** POST: add a new problem to the server */
  // private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  //   return this._http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
  //     tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
  //     catchError(this.handleError)
  //   );
  // }

  obtenirCategories(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
        tap(data => console.log('obtenirCategories: ' + JSON.stringify(data))),
        catchError(this.handleError)
        );
  }
  
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
