import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements AfterViewInit {
  @ViewChildren('date-field') dateInputs!: QueryList<ElementRef>;
  dateFields: any[] = [{ id: 1 }]; // Initial date field
  
  private observer: MutationObserver;

  constructor(private renderer: Renderer2) {
    // Observe DOM changes when new elements are added dynamically
    this.observer = new MutationObserver(() => this.initDatePickers());
  }

  ngAfterViewInit() {
    this.initDatePickers();

    // Observe changes in the document for dynamically added elements
    const config = { childList: true, subtree: true };
    this.observer.observe(document.body, config);
  }

  addField() {
    this.dateFields.push({ id: this.dateFields.length + 1 });
    setTimeout(() => this.initDatePickers(), 100); // Ensure DOM update
  }

 private initDatePickers() {
  setTimeout(() => {
    const dateFields = $('.date-field');
    if (dateFields.length === 0) return; // Exit if no date fields exist

    dateFields.each(function () {
      if (!$(this).data('datepicker')) { // Prevent duplicate initialization
        $(this).datepicker({
          dateFormat: "mm/dd/yy",
          appendTo: "body",
          beforeShow: function (input: any, inst: any) {
            setTimeout(() => {
              inst.dpDiv.css({
                top: $(input).offset().top + $(input).outerHeight(),
                left: $(input).offset().left
              });
            }, 0);
          }
        });
      }
    });
  }, 100);
}



  ////////////////////////////
  ///////New code////////////
  ///////////////////////////


  import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';

@Component({
  selector: 'app-datepicker',
  template: `
    <div *ngIf="showDatepicker">
      <input type="text" class="date-field" placeholder="Select a date">
    </div>
    <button (click)="toggleDatepicker()">Toggle Datepicker</button>
  `,
  styles: [`
    .date-field {
      width: 200px;
      padding: 8px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class DatepickerComponent implements AfterViewInit, OnDestroy {
  showDatepicker = true;
  private observer: MutationObserver | null = null;

  ngAfterViewInit() {
    this.initDatePickers();
    this.observeDOMChanges();
  }

  private initDatePickers() {
    setTimeout(() => {
      $('.date-field').each(function (this: HTMLElement) {
        const input = $(this);
        if (!input.data('datepicker')) { // Prevent duplicate initialization
          input.datepicker({
            dateFormat: "mm/dd/yy",
            appendTo: "body",
            beforeShow: function (inputElement: any, inst: any) {
              setTimeout(() => {
                inst.dpDiv.css({
                  top: $(inputElement).offset().top + $(inputElement).outerHeight(),
                  left: $(inputElement).offset().left
                });
              }, 0);
            }
          });
        }
      });
    }, 100);
  }

  private observeDOMChanges() {
    const config = { childList: true, subtree: true };
    this.observer = new MutationObserver(() => this.initDatePickers());

    const targetNode = document.body;
    if (targetNode) {
      this.observer.observe(targetNode, config);
    }
  }

  toggleDatepicker() {
    this.showDatepicker = !this.showDatepicker;
    setTimeout(() => this.initDatePickers(), 100);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}


