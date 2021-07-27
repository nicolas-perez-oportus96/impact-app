import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateUserPage } from '../create-user/create-user.page';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users: User[];
  constructor(
    private service: UserService, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.service.getAllUsers().subscribe(response => {
      this.users = response;
    })
  }

  //AÑADIR USUARIO
  addUser(){
    //abrir modal
    this.modalCtrl.create({
      component: CreateUserPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then (({data, role})  => {
      if (role === 'Usuario Creado'){
        this.users.push(data);
      }
    });
  }
  //ELIMINAR USUARIO
  deleteUser(id: number) {
    this.alertCtrl.create({
      header: 'Eliminar Usuario',
      message: '¿Estas seguro de eliminar este usuario?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.service.deleteUser(id).subscribe(() => {
            this.users = this.users.filter(user => user.id !== id);
          });
        }
      },
      { text: 'No' }
      ]
    }).then(alertEl => alertEl.present());
  }

  //EDITAR USUARIO
  updateUser(user: User) {
    this.modalCtrl.create({
      component: CreateUserPage,
      componentProps: { user } //pasando datos al componente
    }).then(modal =>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) =>  {
      this.users = this.users.filter(user => {
        if(data.id === user.id) {
          //devuelve usuario actualizado
          return data; 
        }
        return user;
      })
    });
  }
}
