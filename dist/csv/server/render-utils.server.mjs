import './polyfills.server.mjs';
import{Bb as x,Cb as A,Db as I,Fb as P,Gb as S,Ma as N,Na as f,Pa as p,Qa as g,Ra as h,Sa as y,Ua as C,yb as E,zb as w}from"./chunk-H6YWCACA.mjs";import{k as l,l as d,m as u}from"./chunk-3WM34J5J.mjs";function a(e,n,i,t=""){return d(this,null,function*(){for(let r of e){let{path:o,redirectTo:c,loadChildren:T,children:R}=r;if(o===void 0)continue;let s=F(t,o);if(c!==void 0){yield{route:s,success:!1,redirect:!0};continue}if(/[:*]/.test(o)){yield{route:s,success:!1,redirect:!1};continue}if(yield{route:s,success:!0,redirect:!1},R?.length&&(yield*u(a(R,n,i,s))),T){let m=yield new l(P(r,n,i).toPromise());if(m){let{routes:_,injector:L=i}=m;yield*u(a(_,n,L,s))}}}})}function b(e,n){return d(this,null,function*(){let i=y(C,"server",[{provide:E,useValue:{document:n,url:""}},{provide:f,useFactory:()=>{class t extends f{ignoredLogs=new Set(["Angular is running in development mode."]);log(o){this.ignoredLogs.has(o)||super.log(o)}}return new t}},...w])();try{let t;V(e)?t=yield new l(e()):t=(yield new l(i.bootstrapModule(e))).injector.get(p),yield new l(g(t));let r=t.injector,o=r.get(S);if(o.config.length===0)yield{route:"",success:!0,redirect:!1};else{let c=r.get(h);yield*u(a(o.config,c,r))}}finally{i.destroy()}})}function V(e){return typeof e=="function"&&!("\u0275mod"in e)}function F(...e){return e.filter(Boolean).join("/")}export{b as extractRoutes,I as renderApplication,A as renderModule,f as \u0275Console,x as \u0275SERVER_CONTEXT,N as \u0275resetCompiledComponents};
