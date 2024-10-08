import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {
    private readonly URL_TEMPLATE = 'https://translate.google.com/m?hl=[from]&sl=[from]&tl=[to]&ie=UTF-8&prev=_m&q=';

    constructor(private http: HttpClient) { }

    translateText(text: string, fromLang: string, toLang: string): Observable<string> {
        const url = this.URL_TEMPLATE
            .replace('[from]', fromLang)
            .replace('[to]', toLang) + encodeURIComponent(text);

        return this.http.get(url, { responseType: 'text' }).pipe(
            map(response => {
                const divResult = '<div class="result-container">';
                const p1 = response.indexOf(divResult);
                if (p1 !== -1) {
                    const p2 = response.indexOf('</div>', p1);
                    if (p2 !== -1) {
                        return response.substring(p1 + divResult.length, p2);
                    }
                }
                return '';
            })
        );
    }
}