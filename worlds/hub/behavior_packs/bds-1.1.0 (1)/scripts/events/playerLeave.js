import { world } from "@minecraft/server";

import { getAuthorizationToken } from "../easyauth/getAuthorizationToken.js";
import { sendRequest } from "../module/net/sendRequest.js";

world.afterEvents.playerLeave.subscribe(async (event) => {

    const username = event.playerName;

    const response = await sendRequest('/api/events/playerleave', { username: username }, await getAuthorizationToken());

})