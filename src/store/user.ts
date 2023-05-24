import { writable } from 'svelte/store';

const loggedIn = writable<boolean>(false);
export default loggedIn;
