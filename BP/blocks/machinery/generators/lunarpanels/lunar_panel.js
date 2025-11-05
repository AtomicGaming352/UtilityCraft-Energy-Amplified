import { world } from '@minecraft/server';
import { Generator, Energy } from '../managers.js';

// Night-based generator — produces DE only at night
DoriosAPI.register.blockComponent('lunar_panel', {

    /**
     * Runs before the machine is placed by the player.
     * 
     * @param {import('@minecraft/server').BlockComponentPlayerPlaceBeforeEvent} e
     * @param {{ params: GeneratorSettings }} ctx
     */
    beforeOnPlayerPlace(e, { params: settings }) {
        Generator.spawnGeneratorEntity(e, settings);
    },

    /**
     * Executes each tick for the generator.
     * 
     * @param {import('@minecraft/server').BlockComponentTickEvent} e
     * @param {{ params: GeneratorSettings }} ctx
     */
    onTick(e, { params: settings }) {
        if (!worldLoaded) return;
        const { block } = e;
        const generator = new Generator(block, settings);
        if (!generator.valid) return;

        const { energy, rate } = generator;
        generator.energy.transferToNetwork(rate * 4);

        // --- Time detection ---
        const time = world.getTimeOfDay();
        const adjusted = (time + 1000) % 24000; // Normalize 0–23999
        const isNight = adjusted >= 14000 && adjusted <= 24000;

        // --- Efficiency based on moon position ---
        let efficiency = 0;
        if (isNight) {
            // Centered around 19000 (midnight)
            efficiency = 1 - Math.pow((adjusted - 19000) / 5000, 2);
            efficiency = Math.max(0, efficiency);
        }

        // --- Inactive during the day ---
        if (!isNight) {
            generator.off();
            generator.displayEnergy();
            generator.setLabel(`
§r§eInactive

§r§eInformation
 §r§eTime: §f${getTime12h(time)}
 §r§aEfficiency §f${Math.floor(efficiency * 100)}%% 

§r§bEnergy at ${Math.floor(energy.getPercent())}%%
§r§cRate ${Energy.formatEnergyToText(generator.baseRate * efficiency)}/t
            `);
            return;
        }

        // --- Full energy cap ---
        if (energy.get() >= energy.cap) {
            generator.off();
            generator.displayEnergy();
            generator.setLabel(`
§r§eEnergy Full

§r§eInformation
 §r§eTime: §f${getTime12h(time)}
 §r§aEfficiency §f${Math.floor(efficiency * 100)}%% 

§r§bEnergy at ${Math.floor(energy.getPercent())}%%
§r§cRate ${Energy.formatEnergyToText(generator.baseRate * efficiency)}/t
            `);
            return;
        }

        // --- Generate Energy ---
        const burnSpeed = Math.min(rate * efficiency, energy.cap - energy.get());
        energy.add(burnSpeed);

        // --- Update visuals ---
        generator.on();
        generator.displayEnergy();
        generator.setLabel(`
§r§aRunning

§r§eInformation
 §r§eTime: §f${getTime12h(time)}
 §r§aEfficiency §f${Math.floor(efficiency * 100)}%% 

§r§bEnergy at ${Math.floor(energy.getPercent())}%%
§r§cRate ${Energy.formatEnergyToText(generator.baseRate * efficiency)}/t
        `);
    },

    onPlayerBreak(e) {
        Generator.onDestroy(e);
    }
});

/**
 * Converts Minecraft time (0–24000 ticks) into a 12-hour clock format with AM/PM.
 *
 * @param {number} ticks Minecraft time from world.getTimeOfDay() (0–24000)
 * @returns {string} Formatted time string (e.g., "3:45 PM")
 */
function getTime12h(ticks) {
    const totalTicks = (ticks + 6000) % 24000;
    const hours = Math.floor(totalTicks / 1000);
    const minutes = Math.floor((totalTicks % 1000) * 60 / 1000);

    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;
    const period = hours < 12 ? "AM" : "PM";

    return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
        }
