import { Component, OnInit } from '@angular/core';
import { NamedHeaderComponent } from '@components/named-header/named-header.component';

@Component({
  imports: [NamedHeaderComponent],
  selector: 'app-upload',
  standalone: true,
  styleUrls: ['./upload.page.scss'],
  templateUrl: './upload.page.html',
})
export class UploadPage {
  constructor() {}
}
