// Core
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

// Interfaces
import { Heroe } from "../interfaces/heroes.interface";

@Injectable({providedIn: 'root'})
export class HeroesService {

    public heroesData!: Heroe[];
    private originalHeroesData!: Heroe[];

    constructor(private http: HttpClient){}

    public getHeroes(): Observable<Heroe[]> {
        if (!this.originalHeroesData?.length)
            return this.http.get<Heroe[]>('heroes');
        else
            return of(this.originalHeroesData);
    }

    public getHeroById(id: number): Heroe[] {
        return this.originalHeroesData.filter(el => el.id === id);
    }
    
    public getHeroByName(name: string): Heroe[] {
        name = name.trim();
        return this.originalHeroesData.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    }

    public setHeroesData(data: Heroe[]): void {
        this.originalHeroesData = data;
        this.heroesData = data;
    }
}