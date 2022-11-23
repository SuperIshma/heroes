// Core
import { Component, OnInit } from '@angular/core';

// Services
import { HeroesService } from 'src/app/services/heroes-service';

// Interfaces
import { Heroe } from 'src/app/interfaces/heroes.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor( private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.buildForm()
  }

  public addHero() {
    console.log('Ya!');
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      realName: '',
      age: '',
      power: '',
      earthOrigin: '1'
    });
  }
}