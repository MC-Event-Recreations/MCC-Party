import { HttpRequest, HttpHeader, HttpRequestMethod, http } from '@minecraft/server-net';

import config from '../../config';

async function sendRequest(path, body, headers){
    const request = new HttpRequest(`https://d7kzhnd0lkq2lvz.economyplus.solutions${path}`);

    if(!body){
        request.method = HttpRequestMethod.Get;
    } else {
        request.body = JSON.stringify(body)
        request.method = HttpRequestMethod.Post;
    }



    if(headers){
        request.headers = [
            new HttpHeader('Content-Type', 'application/json'),
            new HttpHeader('User-Agent', `${config.serverinfo.type}/1.0.0`),
            new HttpHeader('Authorization', headers[0].Authorization),
            new HttpHeader('SessionId', headers[0].SessionId)
        ];

    } else {
        request.headers = [
            new HttpHeader('Content-Type', 'application/json'),
            new HttpHeader('auth', config.serverinfo.secret),
            new HttpHeader('User-Agent', `${config.serverinfo.type}/1.0.0`)
        ];
    }

    const response = await http.request(request);
    return response;
}

export { sendRequest };