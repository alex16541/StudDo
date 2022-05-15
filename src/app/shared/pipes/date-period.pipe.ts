import { Pipe, PipeTransform } from '@angular/core';
import {CalendarEvent} from "../../features/calendar/event.interface";
import * as moment from "moment";

@Pipe({
    name: 'datePeriod'
})
export class DatePeriodPipe implements PipeTransform {
    transform(e: CalendarEvent, date?: moment.Moment): string {
        if(date){

            if (e.start && e.end){

                let start = moment(e.start, 'DD-MM-YYYY hh:mm');
                let end = moment(e.end, 'DD-MM-YYYY hh:mm');
                if(start.format('DD-MM-YYYY hh:mm') == end.format('DD-MM-YYYY hh:mm')){
                    return `В ${start.format('hh:mm')} `
                }
                else {
                    let text = '';

                    if(date.date() > start.date() && date.date() < end.date()){
                        text = 'Весь день'
                    }else {
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
