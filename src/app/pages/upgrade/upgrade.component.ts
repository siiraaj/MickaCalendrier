import { Component, OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbTimepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'upgrade-cmp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  moduleId: module.id,
  templateUrl: 'upgrade.component.html'
})

export class UpgradeComponent {

  ProjetName: string = 'Projet from TS';
  date1: any;
  date2: any;
  date3: any;
  date4: any;
  date5: any;
  date6: any;
  date7: any;
  date8: any;
  DureeProjet1: any; 
  DureeProjet2 : any;
  DureeProjet3 : any;
  DureeProjet4 : any;

  dure2: any;

  valuesOfTable = '';

  onKey(event: any) { // without type info
    this.valuesOfTable = event.target.value;

    console.log('-----------> ' + this.valuesOfTable);

  }




  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Projet 1',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'Projet 2',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'projet 3',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'projet 4',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];


  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  getNumbersofDays(date1, date2) {
    var res = date1.getTime() - date2.getTime()
    return res / (1000 * 3600 * 24)
  }

  getDate() {
    
    this.date1 = this.events[0].end;
    this.date2 = this.events[0].start;

    this.date3 = this.events[1].end;
    this.date4 = this.events[1].start;

    this.date5 = this.events[2].end;
    this.date6 = this.events[2].start;

    this.date7 = this.events[3].end;
    this.date8 = this.events[3].start;


    this.DureeProjet1 = this.getNumbersofDays(this.date1, this.date2);
    this.DureeProjet2 = this.getNumbersofDays(this.date3, this.date4);
    this.DureeProjet3 = this.getNumbersofDays(this.date5, this.date6);
    this.DureeProjet4 = this.getNumbersofDays(this.date7, this.date8);

    


    console.log('Duree Projet 1  -----------> ' + this.DureeProjet1);
    console.log('Duree Projet 2  -----------> ' + this.DureeProjet2);
    console.log('Duree Projet 3  -----------> ' + this.DureeProjet3);
    console.log('Duree Projet 4  -----------> ' + this.DureeProjet4);

    
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'Nom de projet',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
