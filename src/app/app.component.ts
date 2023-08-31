import { Component, OnInit } from '@angular/core';
import { DataShareService } from './data-share.service';
import { WebSocketAPI } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-kafka';

  // webSocketAPI: WebSocketAPI;
  greeting: any = 'HELLO';
  greetingAry = [];
  name: string;

  constructor(
    private webSocketAPI: WebSocketAPI,
    private dataShareService: DataShareService,
  ) {
    dataShareService.subscriber$.subscribe(data => {
      console.log(data);
      this.greeting = data;
      this.greetingAry.push(data);
    })
  }

  ngOnInit() {
    // this.webSocketAPI = new WebSocketAPI(new AppComponent());
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }
}
