import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/upgrade',       title: 'calendrier',    icon:'nc-calendar-60',  class: '' },
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/user',          title: 'Profil',      icon:'nc-single-02',  class: '' },
    { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
