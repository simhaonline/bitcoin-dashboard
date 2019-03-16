import { Component } from '@angular/core';
import moment from 'moment';
import _ from 'lodash';

interface Announcement {
    title: string;
    date: Date;
    content: string;
    unread?: boolean;
}

@Component({
    selector: 'app-announcements',
    styleUrls: [
        './announcements.component.scss'
    ],
    templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent {
    public announcements: Announcement[] = [
        {
            title: 'We need to hack the back-end AGP bus!',
            date: moment().toDate(),
            content: 'Repellendus et modi pariatur aut et.',
            unread: true
        },
        {
            title: 'We need to synthesize the open-source JSON protocol!',
            date: moment().subtract(1, 'days').toDate(),
            content: 'Non eum nostrum.',
            unread: true
        },
        {
            title: 'Use the bluetooth SDD card, then you can input the haptic bandwidth!',
            date: moment().subtract(2, 'days').toDate(),
            content: 'Expedita voluptatem quaerat est aut perferendis minima enim laudantium ab.',
            unread: true
        }
    ];

    public getUnreadCount() {
        return _.filter(this.announcements, { unread: true }).length;
    }
}
