import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cabana } from 'app/cabanas/interfaces/Cabana.interface';
import { CabanasService } from 'app/cabanas/services/cabanas.service';

@Component({
  selector: 'app-listado-cabanas',
  templateUrl: './listado-cabanas.component.html',
  styleUrls: ['./listado-cabanas.component.css']
})
export class ListadoCabanasComponent implements OnInit {
  
  @Input() cabanas: Cabana[] = [];
  
  constructor(private router: Router, private cabanaService: CabanasService) { }

  ngOnInit(): void {
    this.listarCabanas();
  }

  crearCabana(){
    this.router.navigate(['/cabana-crear']);
  }

  editarCabana(){
    this.router.navigate(['/cabana-editar']);
  }

  listarCabanas(){
    this.cabanaService.getCabanas().subscribe(
      (cabanas) =>{
        this.cabanas = cabanas;
      }
    )
  }


}
