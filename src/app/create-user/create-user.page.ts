import { Component, Input, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';
import { NgForm } from '@angular/forms'
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage implements OnInit {
  @Input() user: User;
  isUpdate = false; //verifica si el modal se esta utlizando para actualizar datos de usuario o no
  
  //datos a actualizar
  data = {
    nombre:'',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    password: '',
    telefono: null
  };

  constructor(
    private service: UserService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    if (this.user) { //si user no esta vacio, significa que el modal esta en modo edicion de datos
      this.isUpdate = true;
      this.data = this.user
    }
  }

  //cerrar modal
  closeModal(){
    this.modalCtrl.dismiss(null, 'Cerrado');
  }

  //registrar Usuario
  onSubmit(form: NgForm){
    const user = form.value;
    if(this.isUpdate) {
      this.service.updateUser(user, this.user.id).subscribe(() => {
        // agrega id al objecto del usuario actualizado
        user.id = this.user.id; 
        this.modalCtrl.dismiss(user, 'Usuario Modificado')
      });
    } else {
      this.service.createUser(user).subscribe(response => {
        //Devolver datos y cerrar modal
        this.modalCtrl.dismiss(response, 'Usuario Creado')
      })
    }
  }

}
