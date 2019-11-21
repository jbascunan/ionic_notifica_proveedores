import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM, NotificationData } from '@ionic-native/fcm/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    public localNotifications: LocalNotifications,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //notificacion
      this.fcm.getToken().then(
        (token: string) => {
          console.log("este es el token para este dispositivo " + token);        
      }).catch(error => {
        console.log(error);
      });

      this.fcm.onTokenRefresh().subscribe((token:string) => {
        console.log("actualizacion token " + token);
      });

      this.fcm.onNotification().subscribe(data => {
        if(data.wasTapped){
          //cuando nuestra aplicacion se encuentra en segundo plano
          console.log("estaamos en segundo plano " + JSON.stringify(data));
        }else{
          //esto ocurre  cuando nuestra aplicacion se encuentra en primer plano
          console.log("estaamos en primer plano " + JSON.stringify(data));

          // Schedule a single notification
          this.localNotifications.schedule({
            id: Math.floor((Math.random() * 100) + 1),
            title: "titulo de notificacion generado en app",
            text: "text generado desde app",
            //sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
            data: { 
              nombre: "jose",
              apellido: "bascuñan" 
            }
          });
        }

      },error => {
        console.log("error " + error);
      });

      this.localNotifications.on("click").subscribe(resultado => {
        console.log(JSON.stringify(resultado));

      });

    });
  }

  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
  ];

  // When Logout Button is pressed 
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast(data['message']);        
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }
}
