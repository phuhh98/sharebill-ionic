import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NamedHeaderComponent } from '@components/named-header/named-header.component';

@Component({
  imports: [CommonModule, FormsModule, NamedHeaderComponent],
  selector: 'app-receipt',
  standalone: true,
  styleUrls: ['./receipt.page.scss'],
  templateUrl: './receipt.page.html',
})
export class ReceiptPage {
  constructor() {}
}
