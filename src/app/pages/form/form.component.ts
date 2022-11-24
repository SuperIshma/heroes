import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { HeroesService } from 'src/app/services/heroes-service';
import { Heroe } from 'src/app/shared/interfaces/heroes.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public buttonText!: string;
  public formGroup!: FormGroup;
  public icon!: string;
  public show: boolean = false;
  public title!: string;

  private heroPlain: Heroe = {id:0,name:'', realName:'', age:0,power:'', earthOrigin:true};
  private isEdit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertSVC: AlertService,
    private formBuilder: FormBuilder,
    private heroesSVC: HeroesService,
    private router: Router
  ){}

  ngOnInit(): void {
    if (!this.heroesSVC.heroesData) {
      this.router.navigate(['/main']);
    } else {
      const heroId = this.activatedRoute.snapshot.params['id'];
      if (heroId) {
        this.heroPlain = this.heroesSVC.heroesData.filter((hero:Heroe) => hero.id === parseInt(heroId))[0];
        this.isEdit = true;
        this.title = 'Modifica los datos del héroe';
        this.buttonText = 'Guardar modificaciones';
        this.icon = 'check';
      } else {
        this.title = 'Añade un nuevo héroe';
        this.buttonText = 'Añadir este héroe';
        this.icon = 'add';
      }
      this.buildForm();
      this.show = true;
    }
  }

  public cancel(): void {
    this.router.navigate(['/main']);
  }

  public saveData() {
    if (this.formGroup.valid) {
      if (!this.isEdit) {
        this.addHero();
      } else {
        this.updateHero();
      }
    }
  }

  ////////// PRIVATE METHODS
  private addHero() {
    this.updateValues();
    this.heroesSVC.addHero(this.formGroup.value).subscribe({
      next: () => {
        this.alertSVC.success("El héroe se añadió correctamente.");
        this.cancel();
      },
      error: (err) => {
        this.alertSVC.error("Hubo un problema al añadir al héroe.");
        console.log('Error: ', err);
      }
    });
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.heroPlain?.name || '', [Validators.required, Validators.minLength(2)]],
      realName: [this.heroPlain?.realName || '', [Validators.required, Validators.minLength(2)]],
      age: [this.heroPlain?.age || '', [Validators.required, Validators.min(18)]],
      power: [this.heroPlain?.power || '', [Validators.required, Validators.minLength(2)]],
      earthOrigin: [this.heroPlain?.earthOrigin ? '1' : '2', [Validators.required]],
    });
  }

  private updateHero() {
    this.updateValues();
    this.heroesSVC.updateHeroe(this.formGroup.value, this.heroPlain.id).subscribe({
      next: () => {
        this.alertSVC.success("El héroe se modificó correctamente.");
        this.cancel();
      },
      error: (err) => {
        this.alertSVC.error("Hubo un problema al modificar al héroe.");
        console.log('Error: ', err);
      }
    });
  }

  private updateValues(): void {
    this.formGroup.value.earthOrigin = this.formGroup.value.earthOrigin === '1';
    this.formGroup.value.name = this.formGroup.value.name.toUpperCase();
  }  
}