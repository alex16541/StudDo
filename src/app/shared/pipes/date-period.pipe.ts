import { Pipe, PipeTransform } from '@angular/core';
import {CalendarEvent} from "../../features/calendar/event.interface";
import * as moment from "moment";

@Pipe({
    name: 'datePeriod'
})
export class DatePeriodPipe implements PipeTransform {
    transform(e: CalendarEvent, date?: moment.Moment): string {
        if(date){
            let d = date;

            if (e.start && e.end){

                let start = moment(e.start, 'DD-MM-YYYY hh:mm');
                let end = moment(e.end, 'DD-MM-YYYY hh:mm');
                if(start.format('DD-MM-YYYY hh:mm') == end.format('DD-MM-YYYY hh:mm')){
                    return `В ${start.format('hh:mm')} `
                }
                else {
                    let text = '';
                    let nowStart = d.set('hours', 0).set('minutes', 0);
                    let nowEnd = d.set('hours', 23).set('minutes', 59);
                    if(nowStart.valueOf() >= start.valueOf() && nowEnd.valueOf() <= end.valueOf()){
                        text = 'Весь день'
                    }
                    else if((start.format('DD-MM-YYYY') == end.format('DD-MM-YYYY')) && (d.format('DD-MM-YYYY') == end.format('DD-MM-YYYY'))){
                        text = `С ${start.format('hh:mm')} / `
                        text += `До ${end.format('hh:mm')}`
                    }
                    else {
                        text = `С ${start.format('DD MMMM hh:mm')} / `
                        text += `До ${end.format('DD MMMM hh:mm')}`
                    }

                    return text
                }
            }
            else if(e.start){
                return e.start
            }
            else if(e.end){
                return e.end
            }
            else return ''
        }
        else return ''
    }
}
