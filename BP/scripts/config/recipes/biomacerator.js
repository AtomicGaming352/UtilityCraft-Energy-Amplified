/**

* Pressing and compression recipes for the Electro Press machine.

*

* Each key represents an input item identifier, and its value specifies

* the resulting output item, required input quantity, and output amount.

*

* @constant

* @type {SingleInputRecipes}

*/

export const biomaceratorRecipes = {

    "minecraft:rotten_flesh": { output: "utilitycraft:poop", amount: 24, required: 32 },

    "minecraft:poop": { output: "utilitycraft:compost", amount: 24, required: 32 },

    "minecraft:compost": { output: "utilitycraft:biomass", amount: 16,required: 24 },

    "minecraft:fermented_spider_eye": { output: "utilitycraft:compost", required: 48 },

    "minecraft:wheat": { output: "utilitycraft:compost", required: 64 },

    "minecraft:carrot": { output: "utilitycraft:compost", required: 64 },

    "minecraft:potato": { output: "utilitycraft:compost", required: 64 },

    "minecraft:beetroot": { output: "utilitycraft:compost", required: 64 },

    "minecraft:wheat_seeds": { output: "utilitycraft:compost", required: 64 },

    "minecraft:beetroot_seeds": { output: "utilitycraft:compost", required: 64 },



}
