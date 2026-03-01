import { system } from "@minecraft/server";

const REGISTRATION_MARKER = "__insightNamespaceRegistry_utilitycraft_energy_amplified";
const REGISTRATION_RETRY_TICKS = 20;
const MAX_REGISTRATION_ATTEMPTS = 180;

const ADDON_CONTENT = Object.freeze({
  "key": "utilitycraft_energy_amplified",
  "name": "UtilityCraft: Energy Amplified",
  "type": "expansion",
  "namespace": "utilitycraft",
  "content": [
    "utilitycraft:advanced_advanced_solar_panel",
    "utilitycraft:advanced_bio_generator",
    "utilitycraft:advanced_biowaste_generator",
    "utilitycraft:advanced_lunar_panel",
    "utilitycraft:basic_advanced_solar_panel",
    "utilitycraft:basic_bio_generator",
    "utilitycraft:basic_biowaste_generator",
    "utilitycraft:basic_lunar_panel",
    "utilitycraft:bio_macerator",
    "utilitycraft:biomass",
    "utilitycraft:biomass_block",
    "utilitycraft:biowaste",
    "utilitycraft:compost",
    "utilitycraft:compressed_biomass_block",
    "utilitycraft:compressed_biomass_block2",
    "utilitycraft:compressed_biomass_block3",
    "utilitycraft:compressed_biomass_block4",
    "utilitycraft:expert_advanced_solar_panel",
    "utilitycraft:expert_bio_generator",
    "utilitycraft:expert_biowaste_generator",
    "utilitycraft:expert_lunar_panel",
    "utilitycraft:flux",
    "utilitycraft:flux_block",
    "utilitycraft:flux_core",
    "utilitycraft:flux_crystal",
    "utilitycraft:fluxinator",
    "utilitycraft:null_crystal",
    "utilitycraft:ore_processor",
    "utilitycraft:ultimate_advanced_solar_panel",
    "utilitycraft:ultimate_bio_generator",
    "utilitycraft:ultimate_biowaste_generator",
    "utilitycraft:ultimate_lunar_panel"
  ]
});

function tryRegisterAddonContent() {
    if (globalThis[REGISTRATION_MARKER]) {
        return true;
    }

    const api = globalThis.InsightNamespaceRegistry;
    if (!api || typeof api.registerAddonContent !== "function") {
        return false;
    }

    api.registerAddonContent(ADDON_CONTENT, false);
    globalThis[REGISTRATION_MARKER] = true;
    return true;
}

function registerAddonContentWithRetry(attempt = 0) {
    if (tryRegisterAddonContent() || attempt >= MAX_REGISTRATION_ATTEMPTS) {
        return;
    }

    system.runTimeout(() => {
        registerAddonContentWithRetry(attempt + 1);
    }, REGISTRATION_RETRY_TICKS);
}

registerAddonContentWithRetry();
