# js-request-interceptor
JavaScript-библиотека, позволяющая перехватывать запросы XHR, Fetch и WebSocket

## Использование
`intercept(requestType, callback)`<br>
`requestType` - тип запроса (xhr, fetch или websocket)<br>
`callback` - функция, получающая данные с сервера и возвращающая измененнное значение
