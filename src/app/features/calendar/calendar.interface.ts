import {CalendarEvent} from "./event.interface";

export interface Calendar {
    id: any,
    name: string | null,
    description: string | null,
    color: string | null,
    mainCalendarVisible: boolean | null,
    events: CalendarEvent[] | [],
    users: number[] | [],
    creatorId: number,
}
