import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NamedHeaderComponent } from '@components/named-header/named-header.component';

@Component({
  imports: [CommonModule, FormsModule, NamedHeaderComponent],
  selector: 'app-share',
  standalone: true,
  styleUrls: ['./share.page.scss'],
  templateUrl: './share.page.html',
})
export class SharePage {
  constructor() {}
}
