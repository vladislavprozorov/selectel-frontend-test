import type { MenuItem } from "../model/menu-item.model";

export const MENU_ITEMS: MenuItem[] = [
	{ id: 1, title: "VPS Small", price: 350, selected: false },
	{ id: 2, title: "VPS Medium", price: 750, selected: false },
	{ id: 3, title: "VPS Large", price: 1500, selected: false },
	{ id: 4, title: "Object Storage 100GB", price: 200, selected: false },
	{ id: 5, title: "CDN Traffic 1TB", price: 400, selected: false },
	{ id: 6, title: "DDoS Protection", price: 600, selected: false },
];
