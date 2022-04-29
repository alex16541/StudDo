import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Room } from './features/room';

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
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
        };
    }

    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(rooms: Room[]): number {
        return rooms.length > 0 ? Math.max(...rooms.map(hero => hero.id)) + 1 : 11;
    }
}
