import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes-service';
import { Heroe } from 'src/app/shared/interfaces/heroes.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  public columns:string[] = ['id', 'name', 'realName', 'age', 'power', 'earthOrigin', 'editar', 'borrar'];
  public heroesList!: any;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(
    public dialog: MatDialog,

    private alertSVC: AlertService,
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

  public editHero(heroId: number):void {
    this.router.navigate(['/form', heroId]);
  }

  public onDeleteHero(heroId: number) {
    this.openDialog(heroId);
  }

  ///////// PRIVATE METHODS
  private deleteHero(heroId: number) {
    this.heroesSVC.deleteHero(heroId).subscribe({
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
      next: (heroes: Heroe[]) => {
          this.heroesSVC.setHeroesData(heroes);
          this.heroesList = new MatTableDataSource<Heroe>(heroes);
          this.heroesList.paginator = this.paginator;
      },
      error: (err) => {
        this.alertSVC.error('Ocurrió un error recuperando la lista de héroes.');
        console.log(err);
      }
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
