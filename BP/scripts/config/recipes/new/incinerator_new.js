import { system, world } from "@minecraft/server";
world.afterEvents.worldLoad.subscribe(() => {
    const newRecipes = {
        "minecraft:redstone": { output: "utilitycraft:flux", amount: 1, required: 16 },
        "minecraft:redstone_block": { output: "utilitycraft:flux_block", amount: 1, required: 16, cost: 9600 }
    };
    system.sendScriptEvent("utilitycraft:register_furnace_recipe", JSON.stringify(newRecipes));
})
