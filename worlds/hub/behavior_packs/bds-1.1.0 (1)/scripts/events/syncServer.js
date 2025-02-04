import { getAuthorizationToken } from "../easyauth/getAuthorizationToken.js";
import { sendRequest } from "../module/net/sendRequest.js";
import { system, world } from "@minecraft/server";

system.runInterval(async () => {

    const players = world.getPlayers();
    const playerlist = players.map(player => player.nameTag);

    const response = await sendRequest('/api/events/syncserver', { playerlist: playerlist }, await getAuthorizationToken());

    if(response.status !== 200) return 

    const responseJson = JSON.parse(response.body); 
    const messages = responseJson.discordmessages;
    
    for (let i = 0; i < messages.length; i++) {
        world.sendMessage(`§8[§9Discord§8] §7${messages[i].author} §u§l>§r §7${messages[i].content}`)
    }

    const bannedplayers = responseJson.bannedplayers;

    for (let i = 0; i < bannedplayers.length; i++) {
        if(bannedplayers[i].status == true){
            const player = players.find(player => player.nameTag === bannedplayers[i].player);
            player.runCommandAsync(`kick "${bannedplayers[i].player}" \n§c§lYou have been banned from the server§r\n§7Reason: §3${bannedplayers[i].reason}\n§7Expires in: §3${bannedplayers[i].length}`);
            
        }

    }

}, 20)