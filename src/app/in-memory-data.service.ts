import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as moment from 'moment';
interface IDContained{
    id:number
}
@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    now: moment.Moment
    constructor() {
        this.now = moment();
        // this.now.set('month', this.now.month()+1)
    }
    createDb() {
        return {
            rooms: [
                {id: 11, name: "Комната 3802", description: "Купить картофан"},
                {id: 12, name: "Диплом", description: "Купить марковь"},
                {id: 13, name: "Проект по матеше", description: "Купить сыыыыр"},
                {id: 14, name: "Комната F", description: "Just F"},
                {id: 15, name: "Так далее и тому подобное", description: "Купить чё-то"},
            ],
            users: [
                {id: 11, name: 'Alex', pass:'123'},
                {id: 12, name: 'Иван', pass:'123'},
                {id: 13, name: 'Виталя', pass:'123'},
                {id: 14, name: 'Жаба', pass:'123'},
                {id: 15, name: 'Саня', pass:'228'},
            ],
            calendars: [
                {id: 11, name: 'ДЗ', description:'',color:'#1aa8c1', mainCalendarVisible: true, events: []},
                {id: 12, name: 'Мой календарь', description:'',color:'#35a03e', mainCalendarVisible: true, events: []},
                {id: 13, name: '3802', description:'',color:'#ac4ac7', mainCalendarVisible: true, events: []},
                {id: 14, name: 'Расписание', description:'',color:'#7060ff', mainCalendarVisible: false, events: []},
                {id: 14, name: 'Праздники', description:'',color:'#3388dd', mainCalendarVisible: false, events: []},
                {id: 15, name: 'Семейный', description:'',color:'#cecece', mainCalendarVisible: true, events: []},
                {id: 16, name: 'Друзья', description:'',color:'#ff6363', mainCalendarVisible: true, events: []},
                {id: 17, name: 'Важное', description:'',color:'#ffcaca', mainCalendarVisible: false, events: []},
            ],
            events: [
                {id: 11, title: 'Купить', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 10).format('DD-MM-YYYY hh:mm'), calendarId: 12},
                {id: 12, title: 'Продать', start: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), calendarId: 12},
                {id: 13, title: 'Удалить', start: moment().set('date', 14).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 18).format('DD-MM-YYYY hh:mm'), calendarId: 12},
                {id: 14, title: 'Дублировать', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 12},
                {id: 15, title: 'Купить', start: moment().set('date', 19).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 20).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
                {id: 16, title: 'Продать', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
                {id: 17, title: 'Удалить', start: moment().set('date', 5).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 7).format('DD-MM-YYYY hh:mm'), calendarId: 11},
                {id: 18, title: 'Дублировать', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 17},
                {id: 19, title: 'Купить', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 14},
                {id: 20, title: 'Продать', start: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), calendarId: 17},
                {id: 21, title: 'Удалить', start: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), calendarId: 13},
                {id: 22, title: 'Дублировать', start: moment().set('date', 28).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 4).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 15},
                {id: 23, title: 'Купить', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 8).format('DD-MM-YYYY hh:mm'), calendarId: 11},
                {id: 24, title: 'Продать', start: moment().set('date', 3).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
                {id: 25, title: 'Удалить', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
                {id: 26, title: 'Дублировать', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
                {id: 27, title: 'Купить', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
            ]
        };
    }

    genId<T extends IDContained>(collection: Array<T>): number {
        return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 11;
    }
}
