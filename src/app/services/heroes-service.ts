// Core
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

// Interfaces
import { Heroe } from "../interfaces/heroes.interface";

@Injectable({providedIn: 'root'})
export class HeroesService {

    public heroesData!: Heroe[];

    constructor(private http: HttpClient){}

    public addHero(hero: Heroe): Observable<any> {
        return this.http.post('heroes', hero);
    }

    public deleteHero(id: number): Observable<any> {
        const url: string = `heroes/${id}`;
        return this.http.delete(url);
    }
    
    public getHeroes(): Observable<Heroe[]> {
        return this.http.get<Heroe[]>('heroes');
    }

    public getHeroById(id: number): Heroe[] {
        return this.heroesData.filter(el => el.id === id);
    }
    
    public getHeroByName(name: string): Heroe[] {
        name = name.trim();
        return this.heroesData.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    }

    public setHeroesData(data: Heroe[]):void {
        this.heroesData = data;
    }

    public updateHeroe(data: Heroe[], id: number): Observable<any> {
        const url: string = `heroes/${id}`;
        return this.http.put(url, data);
    }
}