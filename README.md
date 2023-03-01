# js-request-interceptor
JavaScript-библиотека, позволяющая перехватывать запросы XHR, Fetch и WebSocket

## Использование
> `intercept(requestType, callback)`  

`requestType` - тип запроса (`xhr`, `fetch` или `websocket`)  
`callback` - функция, получающая данные с сервера и возвращающая измененнное значение

`callback` передается объект, содержащий следующие свойства: 
- `request`;
- для XHR - `method`, `url` и `async`;
- для Fetch - `url` и `params`;
- для WebSocket - `data` и `event`.

`callback` должна возвращать:  
- для XHR и Fetch - переданный объект;
- для WebSocket - полученные данные.
