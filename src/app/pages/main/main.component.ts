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
    this.getHeroesData();
  }

  public addHero():void {
    this.router.navigate(['/form']);
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

  public deleteHero(index: number) {
    this.heroesSVC.deleteHero(index).subscribe({
      next: () => {
        this.getHeroesData();
      },
      error: (error) => console.log(error)
    });
  }

  public editHero(index: number):void {
    this.router.navigate(['/form', index]);
  }

  private getHeroesData(): void {
    this.heroesSVC.getHeroes().subscribe({
      next: (data: Heroe[]) => {
          this.heroesSVC.setHeroesData(data);
          this.heroesList = new MatTableDataSource<Heroe>(data);
          this.heroesList.paginator = this.paginator;
      },
      error: (err) => console.log(err)
    });
  }

  private setFilterResults(result: Heroe[]): void {
    if (result.length)
      this.heroesList = new MatTableDataSource<Heroe>(result);
    else 
      this.heroesList = new MatTableDataSource<Heroe>(this.heroesSVC.heroesData);
    this.heroesList.paginator = this.paginator;
  }
}
