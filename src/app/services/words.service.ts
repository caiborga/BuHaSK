import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Word {
    id: number;
    text: string;
    categories: string[];
}

@Injectable({
    providedIn: 'root'
})
export class WordsService {
    private apiUrl = 'http://localhost:3000/words';

    constructor(private http: HttpClient) { }

    getWords(): Observable<Word[]> {
        return this.http.get<Word[]>(this.apiUrl);
    }

    addWord(text: string): Observable<Word> {
        return this.http.post<Word>(this.apiUrl, { text })
            .pipe(
                catchError(this.handleError)
            );
    }

    addCategory(wordId: number, category: string): Observable<Word> {
        return this.http.post<Word>(`${this.apiUrl}/${wordId}/categories`, { category })
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        return throwError(error.error || 'Server error');
    }
}
