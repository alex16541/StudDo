export interface Room {
    id: any;
    name: string;
    lastPost: any;
}

export interface IRoomUser{
    id: any,
    roomId: number,
    userId: number,
    role: RoomRole
}

export interface IRoomCalendar{
    id: any,
    roomId: number,
    calendarId: number,
}

export enum RoomRole{
    'member',
    'editor',
    'admin'
}
