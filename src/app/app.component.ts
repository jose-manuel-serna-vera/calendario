import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    // initialDate: '2022-03-01',
    events: [
      { title: 'event 1', date: '2022-03-01',editable:false },
      { title: 'event 2', date: '2022-03-02' },
      {
        title:"evento 3",
        start: '2022-03-24',
        end: '2022-03-24',
        display: 'background',
        overlap:false,
        backgroundColor:"#ccc",
        editable:false,
        interactive:false,
        groupId: 'testGroupId', 
        allDay:true
        // editable: false
      }
    ],
    locale: esLocale,
    allDayText:"Día",
    headerToolbar: {
      // left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,listWeek'
      // dayGridMonth
    },
    initialView: 'timeGridWeek',
    // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    // hiddenDays: [2,3],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    console.log(selectInfo);
    const title = prompt('Introduce un nuevo título para tu evento.');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`¿Estás segur@ de que quieres eliminar el evento? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
