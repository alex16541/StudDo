import {CalendarEvent} from "./event.interface";

export interface Calendar {
    id: number,
    name: string | null,
    description: string | null,
    color: string | null,
    mainCalendarVisible: boolean | null
    events: CalendarEvent[] | []
}
