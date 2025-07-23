// socket.js
// Singleton for socket.io-client instance
import { io } from 'socket.io-client';
import { SERVER_URL } from './constants';

const socket = io(SERVER_URL, { withCredentials: true });

export default socket;
