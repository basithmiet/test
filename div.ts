Step 1: Inject DomSanitizer in Component

import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
})
export class ModalContentComponent {
  htmlContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  setHtmlContent(apiResponse: string) {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(apiResponse);
  }
}

Step 2: Bind the Content in Modal Template
<div class="modal-body">
  <div [innerHTML]="htmlContent"></div>
</div>

Step 3: Open the Modal & Pass HTML Content
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}

  openModal(apiResponse: string) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.setHtmlContent(apiResponse);
  }
}
