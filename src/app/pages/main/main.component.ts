// Core
import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { HeroesService } from 'src/app/services/heroes-service';

// Interfaces
import { Heroe } from 'src/app/interfaces/heroes.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  public colTitles = ['#', 'nombre', 'nombre real', 'edad', 'poder', 'Terrestre?'];
  public columns:string[] = ['id', 'name', 'realName', 'age', 'power', 'earthOrigin', 'editar', 'borrar'];
  public heroesList!: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(
    private heroesSVC: HeroesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.heroesSVC.getHeroes().subscribe({
        next: (data: Heroe[]) => {
            this.heroesSVC.setHeroesData(data);
            this.heroesList = new MatTableDataSource<Heroe>(data);
            this.heroesList.paginator = this.paginator;
        },
        error: (err) => console.log(err)
    });
  }

  public addHero(): void {
    this.router.navigate(['/form'])
  }
  public applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (filterValue) {
      if (!isNaN(parseInt(filterValue)))
        this.setFilterResults(this.heroesSVC.getHeroById(parseInt(filterValue)));
      else
        this.setFilterResults(this.heroesSVC.getHeroByName(filterValue));
    } else {
      this.setFilterResults(this.heroesSVC.heroesData);
    }
  }

  public borrarElemento(index: number) {
    console.log(index);
  }

  private setFilterResults(result: Heroe[]): void {
    if (result.length)
      this.heroesList = new MatTableDataSource<Heroe>(result);
    else 
      this.heroesList = new MatTableDataSource<Heroe>(this.heroesSVC.heroesData);
    this.heroesList.paginator = this.paginator;
  }
}
