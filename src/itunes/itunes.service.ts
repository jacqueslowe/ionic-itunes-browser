import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Constants } from '../constants';
/*import { Search } from '../search/search.model';
import { Track } from '../Music/track.model';
import { Movie } from '../movies/movie.model';
import { Book } from '../book/book.model';
*/
@Injectable()
export class ItunesService {
    /*
    media: song, movie, podcast, song, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
    */
    searchTerm = "?term=";
    searchMediaType = "&entity=";
    searchLimit = "&limit=25";
    
    constructor(private http: Http, private constants:Constants) {}

 
    getMusic(search: any): Observable<any[]> {
        
        let requestURL:string = this.constants.itunesUrl+
            this.searchTerm+search +
            this.searchLimit+
            this.searchMediaType+"song";
            
        console.log("ItunesService.getMusic(): "+ requestURL);

        return this.http.get(requestURL)
                        .map(res => this.extractData<any[]>(res))
                        .catch(this.handleError);
    }
    private extractData<T>(res: Response) {
        console.log("ItunesService.extractData(): "+res.toString() );
        let body = res.json();
        return body.results || { };
    }
    
    private handleError (error: Response | any) {
        console.log("ItunesService.handleError(): "+error.toString() );
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}