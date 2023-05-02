import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class QuizNotificationService {
  private hubConnection: signalR.HubConnection;

  constructor(private authService: AuthService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7131/quizhub')
      .withAutomaticReconnect()
      .build();
  }

  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connected to the SignalR hub'))
      .catch((error) => console.error(`Error connecting to the SignalR hub: ${error}`));
  }

  public onQuizCreated(callback: (quizId: number, quizTitle: string, userName: string) => void): void {
    this.hubConnection.on('QuizCreated', callback);
  }
}
