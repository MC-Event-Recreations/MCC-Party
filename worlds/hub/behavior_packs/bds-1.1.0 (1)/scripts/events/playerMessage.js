import { world } from "@minecraft/server";

import { getAuthorizationToken } from "../easyauth/getAuthorizationToken.js";
import { sendRequest } from "../module/net/sendRequest.js";

world.beforeEvents.chatSend.subscribe(async (data) => {

    const username = data.sender.name;
    const content = data.message;

    const response = await sendRequest('/api/events/playermessage', { username: username, content: content }, await getAuthorizationToken());

})