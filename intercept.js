window.intercept = function(type, callback){
    if(type == 'fetch'){
        if(!window.realFetch) window.realFetch = window.fetch;
        window.fetch = (u, p)=>{
            let r = callback({url: u, params: p, request: this});
            if(r == null) return;
            u = r.url??u;
            p = r.params??p;
            return window.realFetch(u, p);
        }
    }else if(type == 'xhr'){
        if(!window.realXHR) window.realXHR = window.XMLHttpRequest;
        window.XMLHttpRequest = function(){
            let xhr = new window.realXHR();
            xhr.realOpen = xhr.open;
            xhr.open = function(m, u, a){
                a = a??true;
                let r = callback({method: m, url: u, async: a, request: this});
                if(r == null) return;
                for(let i in r.object) this[i] = r.object[i];
                m = r.method??m;
                u = r.url??u;
                a = r.async??a;
                this.realOpen(m, u, a);
            }
            return xhr;
        }
    }else if(type == 'websocket'){
        let prop = Object.getOwnPropertyDescriptor(MessageEvent.prototype, 'data');
        let getter = prop.get;

        prop.get = function(){
            let msg = getter.call(this);
            if(!(this.currentTarget instanceof WebSocket)) return msg;

            Object.defineProperty(MessageEvent.prototype, 'data', {value: msg});
            return callback({data: msg, request: this.currentTarget, event: this}) || msg;
        }
        
        Object.defineProperty(MessageEvent.prototype, 'data', prop);
    }else{
        throw new TypeError('Unknown request type! Allowed types: fetch, xhr, websocket');
    }
}