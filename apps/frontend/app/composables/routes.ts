import type { SideBarPages } from '~/types/sideBar';

const pages: SideBarPages[] = [
	{ id: 1, name: 'Home', path: '/', ico: 'material-symbols:home-rounded', position: 'top' },
	//{ id: 2, name: "Soundpad", path: "/soundpad", ico: "material-symbols:library-music", position: "top" },
	{ id: 3, name: 'Account', path: '/me', ico: 'mdi:account', position: 'bottom' },
];

export default pages;
