import { Component, OnInit } from '@angular/core';
import { DbService } from '../Servicios/db.service';
@Component({
  selector: 'app-vista-alumno',
  templateUrl: './vista-alumno.page.html',
  styleUrls: ['./vista-alumno.page.scss'],
})
export class VistaAlumnoPage implements OnInit {

  constructor(private dbService: DbService) { }

  ngOnInit() {
  }

  session=this.dbService.session
}
