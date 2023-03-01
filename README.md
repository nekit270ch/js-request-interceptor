# js-request-interceptor
JavaScript-библиотека, позволяющая перехватывать запросы XHR, Fetch и WebSocket

## Использование
`intercept(requestType, callback)`
`requestType` - тип запроса (xhr, fetch или websocket)
`callback` - функция, получающая данные с сервера и возвращающая измененнное значение
