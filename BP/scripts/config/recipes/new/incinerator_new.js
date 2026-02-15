import { system, world } from "@minecraft/server";
world.afterEvents.worldLoad.subscribe(() => {
    const newRecipes = {
        "minecraft:redstone": { output: "utilitycraft:flux" },
    };
    system.sendScriptEvent("utilitycraft:register_furnace_recipe", JSON.stringify(newRecipes));
})
