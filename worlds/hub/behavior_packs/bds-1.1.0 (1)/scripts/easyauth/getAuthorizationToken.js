import { world } from "@minecraft/server"

import { readData } from "../module/database/readData"
import { createSession } from "./index"

async function getAuthorizationToken(){
    const session = readData('session', world);
    if (!session?.sessionToken) await createSession();

    const expired = session?.sessionToken?.expiresAt < Date.now();
    if (expired) await createSession();

    return [
        {
            'Authorization': `Bearer ${session?.sessionToken}`,
            'SessionId': session?.sessionID
        }
    ]
}
export { getAuthorizationToken }