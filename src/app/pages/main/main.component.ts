// Core
import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { HeroesService } from 'src/app/services/heroes-service';

// Interfaces
import { Heroe } from 'src/app/interfaces/heroes.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

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
    private alertSVC: AlertService,
    public dialog: MatDialog,
    private heroesSVC: HeroesService,
    private router: Router,
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

  public onDeleteHero(index: number) {
    this.openDialog(index);
  }

  public editHero(index: number):void {
    this.router.navigate(['/form', index]);
  }

  private deleteHero(index: number) {
    this.heroesSVC.deleteHero(index).subscribe({
      next: () => {
        this.alertSVC.success("El héroe se eliminó correctamente.");
        this.getHeroesData();
      },
      error: (error) => {
        this.alertSVC.error("Hubo un problema eliminando al héroe.");
        console.log(error);
      }
    });
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

  private openDialog(heroId: number): void {
    const heroName = this.heroesList.data.find((el: Heroe) => el.id === heroId).name
    const message: string = `Eliminarás a ${heroName} de la base de datos`;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteHero(heroId);
      }
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
