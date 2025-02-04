import config from '../config';
import { world } from '@minecraft/server'

import { sendRequest } from '../module/net/sendRequest.js';

import { writeData } from '../module/database/writeData.js';

async function createSession() {
    const response = await sendRequest('/api/auth/createsession', { token: config.serverinfo.secret });
    if (response.status === 200) {
        const data = JSON.parse(response.body);
        writeData('session', world, data);
    } else {
        console.error('[Fairplay-INTERNAL] Failed to create session.');
    }
}

export { createSession }