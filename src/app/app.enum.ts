export enum SocketEvents {
  NEW_CONNECTION = 'connected',
  NEW_NOTIFICATION = 'new_notification',

  ONLINE_STATUS = 'online_status',
  ROOM_MESSAGE = 'room_message',
  SESSION_STATUS = 'session_status',
  SESSION_STATUS_MESSAGE = 'session_status_message',
  JOINED = 'joined',
  STORE_REVIEW = 'store_review',
  STORE_MESSAGE = 'store_message',
  ICT_REVIEW = 'ict_review',
  ICT_MESSAGE = 'ict_message',
  ICT_STORE = 'ict_store',
  ERROR = 'connect_error',

  CONNECT = 'connect',

  TIME_OUT = 'connect_timeout',
}
