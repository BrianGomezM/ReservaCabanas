import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CabanasService } from 'app/cabanas/services/cabanas.service';

@Component({
  selector: 'app-editar-cabana',
  templateUrl: './editar-cabana.component.html',
  styleUrls: ['./editar-cabana.component.css']
})
export class EditarCabanaComponent implements OnInit {

  constructor(private router: Router,private cabanaService:CabanasService) { }

  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate(['/cabanas']);
  }

}
