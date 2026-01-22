import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './core/services/notification/notification';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('application');

  // constructor(private notificationService: NotificationService){}
  ngOnInit(): void {
  // this.probarError()
  // this.probarExito()
  }

  // probarExito(){
  //   this.notificationService.showSuccess('Operación realizada con éxito');
  // }

  // probarError(){
  //   this.notificationService.showError('Errorciño');
  // }
}
