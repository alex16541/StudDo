import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as moment from 'moment';
import {Room, RoomRole} from "./features/room";
import {Post} from "./features/post/post.interface";

@Injectable({
    providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
    now: moment.Moment
    constructor() {
        this.now = moment();
    }
    createDb() {

        const roomUsers = [
            {id:11, userId: 11, roomId: 11, role: RoomRole.admin},
            {id:12, userId: 11, roomId: 12, role: RoomRole.member},
            {id:13, userId: 11, roomId: 13, role: RoomRole.editor},
            {id:14, userId: 11, roomId: 14, role: RoomRole.member},
            {id:15, userId: 11, roomId: 15, role: RoomRole.admin},

            {id:16, userId: 12, roomId: 12, role: RoomRole.admin},
            {id:17, userId: 12, roomId: 13, role: RoomRole.member},
            {id:18, userId: 12, roomId: 14, role: RoomRole.admin},
            {id:19, userId: 12, roomId: 15, role: RoomRole.member},

            {id:20, userId: 15, roomId: 13, role: RoomRole.admin},
            {id:21, userId: 15, roomId: 15, role: RoomRole.member},

            {id:22, userId: 12, roomId: 11, role: RoomRole.member},
            {id:23, userId: 13, roomId: 11, role: RoomRole.member},
            {id:24, userId: 14, roomId: 11, role: RoomRole.member},
            {id:25, userId: 15, roomId: 11, role: RoomRole.member},
            {id:26, userId: 16, roomId: 11, role: RoomRole.member},
            {id:27, userId: 17, roomId: 11, role: RoomRole.member},
            {id:28, userId: 18, roomId: 11, role: RoomRole.member},
        ]
        const users = [
            {id: 11, name: 'aleksey', email: 'aleksey@example.com', password:'123'},
            {id: 12, name: 'ivan', email: 'ivan@example.com', password:'123123'},
            {id: 13, name: 'alexandr', email: 'alexandr@example.com', password:'123123'},
            {id: 14, name: 'evgeniy', email: 'evgeniy@example.com', password:'123123'},
            {id: 15, name: 'user1', email: 'user1@example.com', password:'123123'},
            {id: 16, name: 'user2', email: 'user2@example.com', password:'123123'},
            {id: 17, name: 'user3', email: 'user3@example.com', password:'123123'},
            {id: 18, name: 'user4', email: 'user4@example.com', password:'123123'},
            {id: 19, name: 'user5', email: 'user5@example.com', password:'123123'},
            {id: 20, name: 'user6', email: 'user6@example.com', password:'123123'},
            {id: 21, name: 'user7', email: 'user7@example.com', password:'123123'},
        ];
        const rooms = [
            {id: 11, name: "3802", lastPost: 11},
            {id: 12, name: "Диплом", lastPost: 12},
            {id: 13, name: "Проект по математике", lastPost: 13},
            {id: 14, name: "Летние каникулы", lastPost: 14},
            {id: 15, name: "Новая комната", lastPost: 15},
        ];
        const calendars = [
            {id: 11, name: 'Проект по математике', description:'',color:'#bfff00', mainCalendarVisible: true, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:15},
            {id: 12, name: 'Личное расписание', description:'',color:'#ffffff', mainCalendarVisible: true, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:11},
            {id: 13, name: '3802', description:'',color:'#5afff1', mainCalendarVisible: true, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:11},
            {id: 14, name: 'Диплом', description:'',color:'#7060ff', mainCalendarVisible: false, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:12},
            {id: 15, name: 'Новая комната', description:'',color:'#3388dd', mainCalendarVisible: false, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:11},
            {id: 16, name: 'Семейный', description:'',color:'#cecece', mainCalendarVisible: true, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:11},
            {id: 17, name: 'Летние каникулы', description:'',color:'#ff6363', mainCalendarVisible: true, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:12},
            {id: 18, name: 'Важное', description:'',color:'#ffcaca', mainCalendarVisible: false, events: [], users: [11,12,13,14,15,16,17,18,19,20,21], creatorId:11},
        ];
        const roomCalendar = [
            {id: 11, roomId: 11, calendarId: 13},
            {id: 11, roomId: 12, calendarId: 14},
            {id: 11, roomId: 13, calendarId: 11},
            {id: 11, roomId: 14, calendarId: 17},
            {id: 11, roomId: 15, calendarId: 15},
        ];
        const events = [
            {id: 11, title: 'Сходить в главный корпус', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 10).format('DD-MM-YYYY hh:mm'), calendarId: 12},
            {id: 12, title: 'Отдать справку', start: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), calendarId: 12},
            {id: 13, title: 'Убраться дома', start: moment().set('date', 14).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 18).format('DD-MM-YYYY hh:mm'), calendarId: 12},
            {id: 14, title: 'Написать список дел', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 12},
            {id: 15, title: 'Подготовка к контрольной по математике', start: moment().set('date', 19).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 20).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
            {id: 16, title: 'Сдача долгов', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
            {id: 17, title: 'Сдать тетрадь с ДЗ', start: moment().set('date', 5).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 7).format('DD-MM-YYYY hh:mm'), calendarId: 11},
            {id: 18, title: 'Позвонить в военкомат', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 17},
            {id: 19, title: 'Выходные!', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 14},
            {id: 20, title: 'Сходить к врачу', start: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), calendarId: 17},
            {id: 21, title: 'Собрание', start: moment().set('date', 2).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 6).format('DD-MM-YYYY hh:mm'), calendarId: 13},
            {id: 22, title: 'Поездка за город', start: moment().set('date', 28).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 4).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 15},
            {id: 23, title: 'Написать эссе по русскому', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 8).format('DD-MM-YYYY hh:mm'), calendarId: 11},
            {id: 24, title: 'Уборка кабинета', start: moment().set('date', 3).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
            {id: 25, title: 'Сдача учебников', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
            {id: 26, title: 'Театр', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).set("month", moment().month()+1).format('DD-MM-YYYY hh:mm'), calendarId: 13},
            {id: 27, title: 'Написать эссе по философии', start: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), end: moment().set('date', 1).format('DD-MM-YYYY hh:mm'), calendarId: 11},
        ];
        const readPosts = [
            {id:11,postId: 11, userId: 12},
            {id:12,postId: 11, userId: 13},
            {id:13,postId: 11, userId: 14},
            {id:14,postId: 11, userId: 15},
            {id:15,postId: 11, userId: 16},
            {id:16,postId: 11, userId: 17},
            {id:17,postId: 11, userId: 18},
            {id:18,postId: 12, userId: 11},
            {id:19,postId: 13, userId: 11},
            {id:20,postId: 14, userId: 11},
            {id:21,postId: 15, userId: 11},
            {id:22,postId: 16, userId: 11},
            {id:23,postId: 17, userId: 11},
            {id:24,postId: 18, userId: 11},
            {id:25,postId: 19, userId: 11},
            {id:26,postId: 20, userId: 11},
        ];
        const posts = [
            {
                "roomId": 11,
                "id": 11,
                "created": moment().set('date', 28).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "Не забудьте зайти в учебку после пары",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            },
            {
                "roomId": 11,
                "id": 16,
                "created": moment().set('date', 27).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "dolorem eum magni eos aperiam quia",
                "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
            },
            {
                "roomId": 11,
                "id": 21,
                "created": moment().set('date', 7).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "et ea vero quia laudantium autem",
                "body": "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi"
            },
            {
                "roomId": 11,
                "id": 26,
                "created": moment().set('date', 25).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
                "body": "suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta"
            },
            {
                "roomId": 12,
                "id": 12,
                "created": moment().set('date', 29).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "Нормоконтроль будет проходить с 11.06 по 13.06",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
            },
            {
                "roomId": 12,
                "id": 17,
                "created": moment().set('date', 22).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "magnam facilis autem",
                "body": "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas"
            },
            {
                "roomId": 12,
                "id": 27,
                "created": moment().set('date', 20).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "fugit voluptas sed molestias voluptatem provident",
                "body": "eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo"
            },
            {
                "roomId": 12,
                "id": 22,
                "created": moment().set('date', 23).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "in quibusdam tempore odit est dolorem",
                "body": "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio"
            },
            {
                "roomId": 13,
                "id": 13,
                "created": moment().set('date', 29).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "Написать заключение и дополнить список источников",
                "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
            },
            {
                "roomId": 13,
                "id": 18,
                "created": moment().set('date', 21).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "dolorem dolore est ipsam",
                "body": "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae"
            },
            {
                "roomId": 13,
                "id": 23,
                "created": moment().set('date', 28).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "dolorum ut in voluptas mollitia et saepe quo animi",
                "body": "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
            },
            {
                "roomId": 13,
                "id": 28,
                "created": moment().set('date', 28).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "voluptate et itaque vero tempora molestiae",
                "body": "eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam"
            },
            {
                "roomId": 13,
                "id": 31,
                "created": moment().set('date', 19).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "asperiores ea ipsam voluptatibus modi minima quia sint",
                "body": "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt"
            },
            {
                "roomId": 14,
                "id": 19,
                "created": moment().set('date', 13).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "nesciunt iure omnis dolorem tempora et accusantium",
                "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
            },
            {
                "roomId": 14,
                "id": 24,
                "created": moment().set('date', 19).subtract(2, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "voluptatem eligendi optio",
                "body": "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum"
            },
            {
                "roomId": 14,
                "id": 29,
                "created": moment().set('date', 3).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "adipisci placeat illum aut reiciendis qui",
                "body": "illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas"
            },
            {
                "roomId":14,
                "id": 14,
                "created": moment().set('date', 28).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "Есть два билета на автобус",
                "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
            },
            {
                "roomId": 15,
                "id": 15,
                "created": moment().set('date', 17).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "'Содержание последнего поста в комнате'",
                "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
            },
            {
                "roomId": 15,
                "id": 20,
                "created": moment().set('date', 24).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "optio molestias id quia eum",
                "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
            },
            {
                "roomId": 15,
                "id": 25,
                "created": moment().set('date', 13).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "eveniet quod temporibus",
                "body": "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae"
            },
            {
                "roomId": 15,
                "id": 30,
                "created": moment().set('date', 28).subtract(1, 'month').format('DD-MM-YYYY hh:mm'),
                "title": "doloribus ad provident suscipit at",
                "body": "qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo"
            }
        ];
        return {users,posts,readPosts,rooms,roomCalendar,roomUsers,events,calendars};
    };

    genId<T extends {id: number}>(collection: Array<T>): number {
        return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 11;
    }
}


