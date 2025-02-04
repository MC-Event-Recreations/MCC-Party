import { createSession } from './easyauth/index.js';

import "./events/playerJoin.js"
import "./events/playerLeave.js"
import "./events/playerMessage.js"
import "./events/syncServer.js"
import "./events/playerDeath.js"

createSession();