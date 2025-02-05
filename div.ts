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
      $('.date-field').each(function () {
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
}
