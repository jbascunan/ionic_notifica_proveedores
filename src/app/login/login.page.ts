import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public txtRut:string;
  public datos: any;
  constructor(public navCtrl: NavController, private alertController:AlertController, public service: LoginService) { }

  async openTodoAlert(){    
    this.service.validarProveedor(this.txtRut)
    .subscribe(
      (data)=>{
        this.datos = data;
        console.log(this.datos);
      },
      async (error)=>{
        console.log('error');
        //get datos
        console.log(error.error.Mensaje);  
        var msj = '';
        if (error.error.Codigo == 10200) 
          msj = 'Empresa no se encuentra inscrita en ChileProveedores.';
        else
          msj = 'Problemas internos, intente más tarde.'
        
        const alert = await this.alertController.create({
          header: 'Alert',
          subHeader: 'Mensaje',
          message: msj,
          buttons: ['OK']
        });
        await alert.present();
      }      
    );

    
  }

  ngOnInit() {
  }

}
