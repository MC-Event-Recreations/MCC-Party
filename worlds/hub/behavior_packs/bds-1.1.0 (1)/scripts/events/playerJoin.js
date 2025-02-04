import { world } from "@minecraft/server";

import { getAuthorizationToken } from "../easyauth/getAuthorizationToken.js";
import { sendRequest } from "../module/net/sendRequest.js";

world.afterEvents.playerSpawn.subscribe(async (event) => {
    const { player, initialSpawn } = event;
    if (!initialSpawn) return;

    const username = player.nameTag;

    const response = await sendRequest('/api/events/playerjoin', { username: username }, await getAuthorizationToken());

    const responseJson = JSON.parse(response.body); 

    const isPlayedBanned = responseJson.banned;
    if(isPlayedBanned){
        console.log(`Player ${username} is banned`)
        player.runCommandAsync(`kick "${username}" \n§c§lYou have been banned from the server§r\n§7Reason: §3${responseJson.banData.reason}\n§7Expires in: §3${responseJson.banData.length}`);
    }

})