import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TitleCasePipe } from "@angular/common";
import { ListaEstudiante } from 'src/app/models/Teacher/MyClass/ListaEstudiante';
export interface ListaDeNotas {
  nombre: string;
  posicion: number;
  p_nombre: string; //apellido paterno
  m_nombre: string; //pellido materno
  asistencia: number;
  actividades: number;
  practicas: number;
  examenTemas: number;
  assessment: number;
  promedioFinal: number;
  id: number;
}



@Component({
  selector: "app-qualification",
  templateUrl: "./qualification.component.html",
  styleUrls: ["./qualification.component.scss"],
})
export class QualificationComponent implements OnInit {
  columns:string[]=[];
  ELEMENT_DATA: ListaEstudiante[] = [
   
  ];
  displayedColumns: string[] = [
    "posicion",
    "p_nombre",
    "m_nombre",
    "nombre",
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private router: Router, private route: ActivatedRoute) {}
  cargarDatosBody(data){
    console.log(data);
  }
 cargarCabezera(cabe){
   console.log(cabe);
   for(let cabezera of cabe){
     this.displayedColumns.push(cabezera.nombre_modulo);
   }
   this.displayedColumns.push("Actions");
   

 }
  cargarDatos(data){
    console.log(data);
    if(data.length>0){
      if(data[0].modulos){
        for(let dat of data[0].modulos){
          this.columns.push(dat.nombre_modulo+"\n"+String(dat.rubrica)+"%" );
        }
      }
      this.displayedColumns=this.columns.map(col => col);
      this.displayedColumns.splice(0, 0, "nombre");
      this.displayedColumns.splice(0, 0, "m_nombre");
      this.displayedColumns.splice(0, 0, "p_nombre");
      this.displayedColumns.splice(0, 0, "posicion");
      console.log(this.columns);
      console.log(this.displayedColumns);
      
    this.displayedColumns.push("promedioFinal");
    this.displayedColumns.push("id_alumno_curso");
    }
    for(let i in data){
      let newAsis=new ListaEstudiante();
      newAsis.nombre=data[i].nombre_alumno;
      newAsis.m_nombre=data[i].ap_materno_alumno;
      newAsis.p_nombre=data[i].ap_paterno_alumno;
      newAsis.id_alumno_curso=data[i].id_curso_alumno;
      var a=[];
      var prom=0;
      if(data[i].modulos){
        for(let nota of data[i].modulos){
          a.push(Number(nota.rubrica/100*nota.nota_modulo).toPrecision(3));
          prom+=nota.rubrica/100*nota.nota_modulo;
        }
      }
      newAsis.notas=a;
      newAsis.promedio=Number(prom.toPrecision(3));
      newAsis.posicion=Number(i)+1;
      this.ELEMENT_DATA.push(newAsis);

    }
    this.dataSource.data=this.ELEMENT_DATA;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next:(data)=>{
        this.cargarDatos(data.qualifications.body);
      },
      error:(err)=>{

      }
    })
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  perfil(alumno) {
    console.log(["profile", alumno.id_alumno_curso], {
      relativeTo: this.route.parent.url,
    })
    this.router.navigate(["profile", alumno.id_alumno_curso], {
      relativeTo: this.route.parent.parent,
    });
  }
}
