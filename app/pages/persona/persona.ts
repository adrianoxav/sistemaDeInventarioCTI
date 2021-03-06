import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import {Persona} from '../persona/persona.model';
import {CrearPersonaPage} from '../crear_persona/crear_persona';
/*
  Generated class for the PersonaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/persona/persona.html',
})

export class PersonaPage implements OnInit {
  title: string ='Personas';
  //personas de prueba
  personas: Persona[]=[
  {id: 1,  cedula:'0912345678', nombre: 'Adriano',  apellido: 'Pinargote',  correo: 'a@prueba.com', funcion:'estudiante', telefono: '0959605816', celular: ' ', genero: 'M'},
  {id: 2,  cedula:'0912345674',  nombre: 'Janina', apellido: 'Costa',  correo: 'j@prueba.com', funcion:'ayudante', telefono: '04-6025888', celular: ' ', genero: 'M'},
  {id: 3,  cedula:'0912345675',  nombre: 'Maria', apellido: 'Pozo',  correo: 'm@prueba.com', funcion:'estudiante', telefono: '04-6025888', celular: ' ', genero: 'F'}

]
  //selector de html a mostrar dependiendo de la accion
  template: string = 'null';
  //persona en blanco para crear una persona
  @Input()
  personaNueva = {
    id:10, cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",celular:'',genero:''
  }
  //persona en blanco usada como persona temporal para modificar persona
  @Input()
  personaModificar= {
    id:10, cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",celular:'',genero:''
  }
  //variable para asignar id incremental para personas locales
  count=10;
  //usado para mantener el id de la persona que se esta modificando o eliminando
  id=0;
  //lista de ids seleccionados por el checkbox
  selected: number[]=[];

  constructor( _navController:NavController,private menu: MenuController) {

  }
  //abre el menu
openMenu(){
  this.menu.open();
}




//crea persona
  crear(){
    this.personas.push(this.personaNueva);
    this.template='null';
    this.count++;
    this.personaNueva = {
      id:this.count,  cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",celular:'',genero:''
    }
  }
  //abre el html de modificar
  goModificar(id: string){
    this.template='modificar'
    this.id=parseInt(id);
    this.personaModificar = JSON.parse(JSON.stringify(this.personas.find(persona => persona.id == this.id)));
  }
  //modifica la persona
  modificar(){
  let index =this.personas.findIndex(persona => persona.id == this.id);
  this.personas[index] =JSON.parse(JSON.stringify(this.personaModificar));
  this.template='null';
  }
  //elimina una o mas personas
  eliminar(){

    for(var i in this.selected){
      console.log(this.selected[i]);
      let index =this.personas.findIndex(persona => persona.id==this.selected[i]);
      console.log(index);
      this.personas.splice(index,1);
    }
    this.selected=[];
  }
//agrega o elimina ids de personas en lista para saber cual ha sido seleccionada
  select(id: any){
    let index: number;
    index = this.selected.findIndex(num => num == parseInt(id));
    if(index==-1){
    this.selected.push(parseInt(id));}
    else{this.selected.splice(index,1)};
  }
  //abre html de crear persona
    goCrearPersona(){
      this.template='crear';
    }
  //cierra html y regresa a la lista por defecto
  cancelar(){
    this.template='null';
  }
  //retrasa la carga de la pagina 100 ms
  public ngOnInit() {
    window.setTimeout(()=>{
    },100);
}
}
