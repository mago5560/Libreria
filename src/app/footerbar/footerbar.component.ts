import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footerbar',
  templateUrl: './footerbar.component.html',
  styleUrls: ['./footerbar.component.css']
})
export class FooterbarComponent implements OnInit {
  test : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
