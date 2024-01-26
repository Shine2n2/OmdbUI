import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";





@Injectable()
export class HttpCoreInterceptor implements HttpInterceptor{

constructor(){}

intercept(request:HttpRequest<unknown>, next:HttpHandler):Observable<HttpEvent<unknown>>{

request = request.clone({

setHeaders:{
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': 'anonymous'
}

})

return next.handle(request);

}

}
