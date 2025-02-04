import { world, EntityDamageCause, Player } from "@minecraft/server";

import { getAuthorizationToken } from "../easyauth/getAuthorizationToken.js";
import { sendRequest } from "../module/net/sendRequest.js";
import { translations, colors } from "../translations.js";

world.afterEvents.entityDie.subscribe(async (data) => {

    const { damageSource, deadEntity: dead } = data;
    const { damagingEntity: killer } = damageSource;

    let reason = 'Unkown';
    let color = ''

    if (dead.typeId !== 'minecraft:player') return;

    const cause = data.damageSource.cause;

    switch (cause) {
        case EntityDamageCause.entityAttack:
            if (data.damageSource.damagingEntity instanceof Player) {
                reason = `was slain by ${data.damageSource.damagingEntity.name}`;
                color = colors.red
            } else if (!data.damageSource.damagingEntity?.isValid()) {
                reason = `was killed by a dead entity.`;
                color = colors.red
            } else {
                for (const [id, name] of Object.entries(translations)) {
                    if (data.damageSource.damagingEntity?.typeId == id) {
                        reason = `was killed by ${name}`;
                        color = colors.green
                    }
                }
            }
            break;
        case EntityDamageCause.entityExplosion:
            if (data.damageSource.damagingEntity instanceof Player) {
                reason = `was slain by ${data.damageSource.damagingEntity.name}`;
                color = colors.red
            } else if (!data.damageSource.damagingEntity?.isValid()) {
                reason = `was gunned down violently `;
                color = colors.red
            } else {
                reason = `was exploded by ${data.damageSource.damagingEntity?.typeId}.`;
                color = colors.red
            }
            break;
        case EntityDamageCause.anvil:
            reason = "was squashed by a falling anvil.";
            color = colors.grey
            break;
        case EntityDamageCause.blockExplosion:
            reason = "blew up.";
            color = colors.grey
            break;
        case EntityDamageCause.charging:
            reason = "charged too much his trident.";
            color = colors.darkblue
            break;
        case EntityDamageCause.contact:
            reason = "was pricked to death.";
            color = colors.green
            break;
        case EntityDamageCause.drowning:
            reason = "drowned.";
            color = colors.blue
            break;
        case EntityDamageCause.fall:
            reason = "fell from a high place.";
            color = colors.grey
            break;
        case EntityDamageCause.fallingBlock:
            reason = "was squashed by a falling block.";
            color = colors.grey
            break;
        case EntityDamageCause.fire:
            reason = "went up in flames.";
            color = colors.red
            break;
        case EntityDamageCause.fireTick:
            reason = "burned to death.";
            color = colors.red
            break;
        case EntityDamageCause.fireworks:
            reason = "went off with a bang.";
            color = colors.red
            break;
        case EntityDamageCause.flyIntoWall:
            reason = "experienced kinetic energy.";
            color = colors.grey
            break;
        case EntityDamageCause.freezing:
            reason = "froze to death.";
            color = colors.blue
            break;
        case EntityDamageCause.lava:
            reason = "tried to swim in lava.";
            color = colors.orange
            break;
        case EntityDamageCause.lightning:
            reason = "was struck by lightning.";
            color = colors.blue
            break;
        case EntityDamageCause.magic:
            reason = "was killed by magic.";
            color = colors.purple
            break;
        case EntityDamageCause.magma:
            reason = "discovered the floor was lava.";
            color = colors.orange
            break;
        case EntityDamageCause.none:
            reason = "died.";
            color = colors.grey
            break;
        case EntityDamageCause.override:
            reason = "overrided itself.";
            color = colors.grey
            break;
        case EntityDamageCause.piston:
            reason = "was pushed by a piston.";
            color = colors.grey
            break;
        case EntityDamageCause.projectile:
            if (data.damageSource.damagingEntity instanceof Player) {
                reason = `was gunned down ${data.damageSource.damagingEntity.name}`;
                color = colors.red
            } else if (!data.damageSource.damagingEntity?.isValid()) {
                reason = `was shot by a dead entity.`;
                color = colors.red
            } else {
                reason = `was shot by ${data.damageSource.damagingEntity?.typeId}.`;
                color = colors.red
            }
            break;
        case EntityDamageCause.stalactite:
            reason = "was skewered by a falling stalactite.";
            color = colors.grey
            break;
        case EntityDamageCause.stalagmite:
            reason = "was impaled on a stalagmite.";
            color = colors.grey
            break;
        case EntityDamageCause.starve:
            reason = "starved to death.";
            color = colors.lightgreen
            break;
        case EntityDamageCause.suffocation:
            reason = "suffocated in a wall.";
            color = colors.grey
            break;
        case EntityDamageCause.suicide:
            reason = "committed seppuku.";
            color = colors.grey
            break;
        case EntityDamageCause.temperature:
            reason = "died because he had an heat attack.";
            color = colors.red
            break;
        case EntityDamageCause.thorns:
            if (data.damageSource.damagingEntity instanceof Player) {
                reason = `was killed trying to hurt ${data.damageSource.damagingEntity.name}`;
                color = colors.red
            } else {
                reason = `was killed trying to hurt ${data.damageSource.damagingEntity?.typeId}.`;
                color = colors.red
            }
            break;
        case EntityDamageCause.void:
            reason = "fell out of the world.";
            color = colors.grey
            break;
        case EntityDamageCause.wither:
            reason = "withered away.";
            color = colors.grey
            break;
        case EntityDamageCause.selfDestruct:
            reason = "spontaneously combusted"
            color = colors.orange
            break;
    }

    const message = `**${dead.nameTag}** ${reason}`
    return await sendRequest('/api/events/playerdeath', { message: message, color: color }, await getAuthorizationToken());

})