import { system, world, ItemStack, BlockPermutation } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

const COLORS = DoriosAPI.constants.textColors;
const DEFAULT_TICK_SPEED = 20;

globalThis.worldLoaded = false;
globalThis.tickCount = 0;
globalThis.tickSpeed = 10;

system.runInterval(() => {
  globalThis.tickCount += 2;
  if (globalThis.tickCount == 1000) globalThis.tickCount = 0;
}, 2);

//#region Rotation

const FACING = ["up", "down", "north", "south", "east", "west"];
const CARDINAL = ["north", "south", "east", "west"];
const rotationMap = {
  up: {
    north: {
      0: { axis: "west", rotation: 0 },
      1: { axis: "west", rotation: 1 },
      2: { axis: "west", rotation: 2 },
      3: { axis: "west", rotation: 3 },
    },
    west: {
      0: { axis: "south", rotation: 0 },
      1: { axis: "south", rotation: 1 },
      2: { axis: "south", rotation: 2 },
      3: { axis: "south", rotation: 3 },
    },
    south: {
      0: { axis: "east", rotation: 0 },
      1: { axis: "east", rotation: 1 },
      2: { axis: "east", rotation: 2 },
      3: { axis: "east", rotation: 3 },
    },
    east: {
      0: { axis: "north", rotation: 0 },
      1: { axis: "north", rotation: 1 },
      2: { axis: "north", rotation: 2 },
      3: { axis: "north", rotation: 3 },
    },
  },
  down: {
    north: {
      0: { axis: "east", rotation: 0 },
      1: { axis: "east", rotation: 1 },
      2: { axis: "east", rotation: 2 },
      3: { axis: "east", rotation: 3 },
    },
    east: {
      0: { axis: "south", rotation: 0 },
      1: { axis: "south", rotation: 1 },
      2: { axis: "south", rotation: 2 },
      3: { axis: "south", rotation: 3 },
    },
    south: {
      0: { axis: "west", rotation: 0 },
      1: { axis: "west", rotation: 1 },
      2: { axis: "west", rotation: 2 },
      3: { axis: "west", rotation: 3 },
    },
    west: {
      0: { axis: "north", rotation: 0 },
      1: { axis: "north", rotation: 1 },
      2: { axis: "north", rotation: 2 },
      3: { axis: "north", rotation: 3 },
    },
  },
  south: {
    up: {
      0: { axis: "west", rotation: 1 },
      1: { axis: "east", rotation: 0 }, ///
      2: { axis: "west", rotation: 3 }, ////
      3: { axis: "east", rotation: 2 }, //
    },
    east: {
      0: { axis: "down", rotation: 1 }, ///
      1: { axis: "up", rotation: 2 }, ////
      2: { axis: "down", rotation: 3 }, //
      3: { axis: "up", rotation: 0 },
    },
    down: {
      0: { axis: "east", rotation: 1 }, ////
      1: { axis: "west", rotation: 2 }, ///
      2: { axis: "east", rotation: 3 },
      3: { axis: "west", rotation: 0 }, //
    },
    west: {
      0: { axis: "up", rotation: 3 }, //
      1: { axis: "down", rotation: 2 },
      2: { axis: "up", rotation: 1 }, ///
      3: { axis: "down", rotation: 0 }, ////
    },
  },
  north: {
    up: {
      0: { axis: "east", rotation: 3 },
      1: { axis: "west", rotation: 2 }, ////
      2: { axis: "east", rotation: 1 }, ///
      3: { axis: "west", rotation: 0 }, //
    },
    east: {
      0: { axis: "up", rotation: 1 }, ////
      1: { axis: "down", rotation: 0 }, ///
      2: { axis: "up", rotation: 3 }, //
      3: { axis: "down", rotation: 2 },
    },
    down: {
      0: { axis: "west", rotation: 3 }, ///
      1: { axis: "east", rotation: 0 }, ////
      2: { axis: "west", rotation: 1 },
      3: { axis: "east", rotation: 2 }, //
    },
    west: {
      0: { axis: "down", rotation: 3 }, //
      1: { axis: "up", rotation: 0 },
      2: { axis: "down", rotation: 1 }, ////
      3: { axis: "up", rotation: 2 }, ///
    },
  },
  east: {
    up: {
      0: { axis: "south", rotation: 0 }, ///
      1: { axis: "south", rotation: 1 }, ////start
      2: { axis: "south", rotation: 2 }, //
      3: { axis: "south", rotation: 3 },
    },
    south: {
      0: { axis: "down", rotation: 0 }, ///start
      1: { axis: "down", rotation: 3 }, ////
      2: { axis: "down", rotation: 2 }, //
      3: { axis: "up", rotation: 1 },
    },
    down: {
      0: { axis: "north", rotation: 2 }, ///
      1: { axis: "north", rotation: 1 },
      2: { axis: "north", rotation: 0 }, //
      3: { axis: "north", rotation: 3 }, ////
    },
    north: {
      0: { axis: "up", rotation: 2 }, //start
      1: { axis: "up", rotation: 3 },
      2: { axis: "up", rotation: 0 }, ///
      3: { axis: "up", rotation: 1 }, ////
    },
  },

  west: {
    down: {
      0: { axis: "north", rotation: 2 },
      1: { axis: "north", rotation: 3 },
      2: { axis: "north", rotation: 0 },
      3: { axis: "north", rotation: 1 },
    },
    north: {
      0: { axis: "up", rotation: 2 },
      1: { axis: "up", rotation: 1 },
      2: { axis: "up", rotation: 0 },
      3: { axis: "up", rotation: 3 },
    },
    up: {
      0: { axis: "south", rotation: 2 },
      1: { axis: "south", rotation: 3 },
      2: { axis: "south", rotation: 0 },
      3: { axis: "south", rotation: 1 },
    },
    south: {
      0: { axis: "down", rotation: 2 },
      1: { axis: "down", rotation: 3 },
      2: { axis: "down", rotation: 0 },
      3: { axis: "down", rotation: 1 },
    },
  },
};

/**
 * ==================================================
 * UtilityCraft - Rotation Utility
 * ==================================================
 * Handles manual block placement with facing logic.
 * Supports axis-based orientation (6 directions),
 * ready to be extended to full 24-rotation control.
 *
 * Example:
 *   Rotation.facing(player, block, "utilitycraft:crusher");
 * ==================================================
 */
export class Rotation {
  /**
   * Places a block manually with its `utilitycraft:axis` state,
   * oriented to the player’s look direction.
   *
   * Equivalent to:
   *   /setblock ~~~ <typeId> ["utilitycraft:axis"="north"]
   *
   * @param {Player} player The player placing the block.
   * @param {Block} block The block reference (for position).
   * @param {BlockPermutation} perm The block perm to place.
   */
  static facing(player, block, perm) {
    const { x, y, z } = block.location;
    const dim = block.dimension;

    // ───── Determine axis (6 possible directions)
    const view = player.getViewDirection();
    let axis = "north";

    if (
      Math.abs(view.y) > Math.abs(view.x) &&
      Math.abs(view.y) > Math.abs(view.z)
    ) {
      axis = view.y > 0 ? "up" : "down";
    } else if (Math.abs(view.z) > Math.abs(view.x)) {
      axis = view.z > 0 ? "south" : "north";
    } else {
      axis = view.x > 0 ? "east" : "west";
    }
    // ───── Place the block manually with the axis applied
    system.run(() => {
      player.playSound("place.iron");
      dim.runCommand(
        `setblock ${x} ${y} ${z} ${perm.type.id} ["utilitycraft:axis"="${axis}"]`,
      );
      system.run(() => {
        if (perm.hasTag("dorios:energy")) {
          player.runCommand(
            `scriptevent dorios:updatePipes energy|[${x},${y},${z}]`,
          );
        }

        if (perm.hasTag("dorios:item")) {
          player.runCommand(
            `scriptevent dorios:updatePipes item|[${x},${y},${z}]`,
          );
        }

        if (perm.hasTag("dorios:fluid")) {
          player.runCommand(
            `scriptevent dorios:updatePipes fluid|[${x},${y},${z}]`,
          );
        }
      });
    });
  }

  /**
   * Rotates a block when the wrench is used on it.
   *
   * - Supports both vanilla and UtilityCraft’s 24-axis rotation.
   * - Plays a click sound after successful rotation.
   *
   * @param {Block} block The block being interacted with.
   * @param {string} blockFace The face of the block that was clicked.
   */
  static handleRotation(block, blockFace) {
    // --- Handle UtilityCraft 24-axis rotation ---
    if (
      block.getState("utilitycraft:axis") != undefined &&
      block.getState("utilitycraft:rotation") != undefined
    ) {
      Rotation.rotate_24(block, blockFace);
      return;
    }

    // --- Handle vanilla facing_direction rotation ---
    try {
      const facingDir = block.permutation.getState(
        "minecraft:facing_direction",
      );
      if (facingDir !== undefined) {
        const index = FACING.indexOf(facingDir);
        const next = (index + 1) % FACING.length;
        block.setPermutation(
          block.permutation.withState(
            "minecraft:facing_direction",
            FACING[next],
          ),
        );
        return;
      }
    } catch { }

    // --- Handle cardinal_direction rotation ---
    try {
      const cardDir = block.permutation.getState(
        "minecraft:cardinal_direction",
      );
      if (cardDir !== undefined) {
        const index = CARDINAL.indexOf(cardDir);
        const next = (index + 1) % CARDINAL.length;
        block.setPermutation(
          block.permutation.withState(
            "minecraft:cardinal_direction",
            CARDINAL[next],
          ),
        );
        return;
      }
    } catch { }
  }

  /**
   * Handles full 24-direction rotation logic for blocks using `axis` and `rotation` states.
   *
   * ## Rules
   * 1. Clicking the same axis line (front/back) → rotates `rotation` (0–3).
   * 2. Clicking any other face → changes only `axis`, cycling clockwise
   *    through the 4 lateral directions relative to the clicked face,
   *    and resets rotation to 0 for a clean orientation.
   *
   * @param {Block} block The block being rotated.
   * @param {string} blockFace The clicked face (e.g. "north", "up").
   */
  static rotate_24(block, blockFace) {
    const perm = block.permutation;
    const axis = perm.getState("utilitycraft:axis");
    const rotation = perm.getState("utilitycraft:rotation") ?? 0;
    const face = blockFace.toLowerCase();

    // Same-axis rotation (works fine)
    const opposite = {
      up: "down",
      down: "up",
      north: "south",
      south: "north",
      east: "west",
      west: "east",
    };

    if (face === axis || face === opposite[axis]) {
      const nextRot = (rotation + 1) % 4;
      block.setPermutation(perm.withState("utilitycraft:rotation", nextRot));
      return;
    }

    // Axis change using precomputed mapping table
    const nextData = rotationMap[face]?.[axis]?.[rotation];
    if (!nextData) return;

    const { axis: nextAxis, rotation: nextRotation } = nextData;

    block.setPermutation(
      perm
        .withState("utilitycraft:axis", nextAxis)
        .withState("utilitycraft:rotation", nextRotation),
    );
  }
}

//endregion

//#region Scoreboards

/**
 * Retrieves a scoreboard objective by id, or creates it if it does not exist.
 *
 * @param {string} id The unique identifier of the scoreboard objective.
 * @param {string} [display=id] The display name shown in the scoreboard. Defaults to the id.
 * @returns {ScoreboardObjective} The existing or newly created scoreboard objective.
 */
const getOrCreateObjective = (id, display = id) =>
  world.scoreboard.getObjective(id) ??
  world.scoreboard.addObjective(id, display);

/**
 * Ensures a set of scoreboard objectives exist and returns them as an object.
 *
 * Each entry in the `definitions` array must be a tuple of `[id, displayName]`.
 * If the display name is omitted, the objective id will be used as its display name.
 *
 * @param {Array.<[string, string?]>} definitions Array of objectives to load, each with an id and optional display name.
 * @returns {Record<string, ScoreboardObjective>} An object containing the objectives, keyed by their ids.
 *
 * @example
 * const objectives = loadObjectives([
 *   ["energy", "Energy"],
 *   ["energyExp", "EnergyExp"],
 *   ["energyCap", "Energy Max Capacity"],
 *   ["energyCapExp", "Energy Max Capacity Exp"],
 * ]);
 *
 * // Access example
 * const objectives.energy = objectives.energy;
 */
function loadObjectives(definitions) {
  const result = {};
  for (const [id, display] of definitions) {
    result[id] = getOrCreateObjective(id, display);
  }
  return result;
}

/**
 * Scoreboard objectives used for the energy system.
 * Will be initialized after the world has finished loading.
 *
 * @type {{
 *   energy: ScoreboardObjective,
 *   energyExp: ScoreboardObjective,
 *   energyCap: ScoreboardObjective,
 *   energyCapExp: ScoreboardObjective
 * } | null}
 */
let objectives = null;

// --- Al cargar el mundo ---
world.afterEvents.worldLoad.subscribe(() => {
  objectives = loadObjectives([
    ["energy", "Energy"],
    ["energyExp", "EnergyExp"],
    ["energyCap", "Energy Max Capacity"],
    ["energyCapExp", "Energy Max Capacity Exp"],
  ]);

  // Inicializar la propiedad si no existe
  if (world.getDynamicProperty("loaded") === undefined) {
    world.setDynamicProperty("loaded", false);
  }

  worldLoaded = world.getDynamicProperty("loaded");

  if (world.getDimension("overworld").getEntities()[0]) {
    world.setDynamicProperty("loaded", true);
    worldLoaded = true;
  }

  const configuredTickSpeed =
    world.getDynamicProperty("utilitycraft:tickSpeed") ?? DEFAULT_TICK_SPEED;
  globalThis.tickSpeed = configuredTickSpeed;
});

// --- Al primer spawn del jugador ---
world.afterEvents.playerSpawn.subscribe(({ initialSpawn }) => {
  if (!initialSpawn) return;
  system.runTimeout(() => {
    world.setDynamicProperty("loaded", true);
    worldLoaded = true;
  }, 50);
});

// --- Al apagar el mundo ---
system.beforeEvents.shutdown.subscribe(() => {
  try {
    world.setDynamicProperty("loaded", false);
  } catch { }
});

//#endregion

export class Generator {
  /**
   * Creates a new Generator instance.
   *
   * @param {Block} block The block representing the generator.
   * @param {GeneratorSettings} settings generator's settings.
   */
  constructor(block, settings, ignoreTick = false) {
    this.valid = true;

    // world.sendMessage(`${globalThis.tickCount} y ${globalThis.tickSpeed}`)
    if (globalThis.tickCount % globalThis.tickSpeed != 0 && !ignoreTick) {
      this.valid = false;
      return;
    }
    this.settings = settings;
    this.dim = block.dimension;
    this.block = block;
    this.entity = this.dim.getEntitiesAtBlockLocation(block.location)[0];
    if (!this.entity) {
      this.valid = false;
      return;
    }
    this.inv = this.entity?.getComponent("inventory")?.container;
    this.energy = new Energy(this.entity);
    this.baseRate = settings?.generator?.rate_speed_base ?? 0;
    this.rate = this.baseRate * tickSpeed;
  }

  /**
   * Spawns a UtilityCraft generator entity at the given block location,
   * triggers the correct type and inventory events, and assigns its name.
   *
   * @param {Block} block The block where the generator will be placed.
   * @param {Object} data Generator configuration.
   * @param {Object} data.entity Entity config object.
   * @param {string} data.entity.name Generator name (e.g. "crusher").
   * @param {number} data.entity.inventory_size Number of slots in inventory.
   * @returns {Entity} The spawned generator entity.
   */
  static spawn(block, data) {
    const dim = block.dimension;
    const { entity } = data;

    let { x, y, z } = block.center();
    y -= 0.25;
    const generatorEntity = dim.spawnEntity("utilitycraft:machine", {
      x,
      y,
      z,
    });

    let generatorEvent;
    let inventorySize = 2;

    if (entity.type == "simple") {
      generatorEvent = "utilitycraft:simple_generator";
      inventorySize = 4;
    } else if (entity.type == "fluid") {
      generatorEvent = "utilitycraft:fluid_generator";
      inventorySize = 3;
    } else if (entity.type == "passive") {
      generatorEvent = "utilitycraft:passive_generator";
      inventorySize = 2;
    }
    if (entity.type == "battery") {
      generatorEvent = "utilitycraft:battery_generator";
      inventorySize = 2;
    }

    if (entity.inventory_size) inventorySize = entity.inventory_size;

    const inventoryEvent = `utilitycraft:inventory_${inventorySize}`;

    // 3. Trigger generator type and inventory slot events
    generatorEntity.triggerEvent(generatorEvent);
    generatorEntity.triggerEvent(inventoryEvent);

    // 4. Assign name tag
    const name = entity.name ?? block.typeId.split(":")[1];
    generatorEntity.nameTag = `entity.utilitycraft:${name}.name`;

    return generatorEntity;
  }

  /**
   * Handles generator destruction:
   * - Drops inventory (excluding UI items).
   * - Drops the generator block item with stored energy and liquid info in lore.
   * - Removes the generator entity.
   * - Skips drop if the player is in Creative mode.
   *
   * @param {{ block: Block, brokenBlockPermutation: BlockPermutationplayer: Player, dimension: Dimension }} e The event data object containing the dimension, block and player.
   */
  static onDestroy(e) {
    const { block, brokenBlockPermutation, player, dimension: dim } = e;
    const entity = dim.getEntitiesAtBlockLocation(block.location)[0];
    if (!entity) return false;

    const energy = new Energy(entity);
    const fluid = new FluidManager(entity);
    const blockItemId = brokenBlockPermutation.type.id;
    const blockItem = new ItemStack(blockItemId);
    const lore = [];

    // Energy lore
    if (energy.get() > 0) {
      lore.push(
        `§r§7  Energy: ${Energy.formatEnergyToText(energy.get())}/${Energy.formatEnergyToText(energy.cap)}`,
      );
    }

    if (fluid.type != "empty") {
      const liquidName = DoriosAPI.utils.capitalizeFirst(fluid.type);
      lore.push(
        `§r§7  ${liquidName}: ${FluidManager.formatFluid(fluid.get())}/${FluidManager.formatFluid(fluid.cap)}`,
      );
    }

    if (lore.length > 0) {
      blockItem.setLore(lore);
    }

    // Drop item and cleanup
    system.run(() => {
      if (player?.isInSurvival()) {
        const oldItemEntity = dim
          .getEntities({
            type: "item",
            maxDistance: 3,
            location: block.center(),
          })
          .find(
            (item) =>
              item.getComponent("minecraft:item")?.itemStack?.typeId ===
              blockItemId,
          );
        oldItemEntity?.remove();
      }
      Machine.dropAllItems(entity);
      entity.remove();
      dim.spawnItem(blockItem, block.center());
    });
    return true;
  }

  /**
   * Spawns a generator entity at the given block location with a name tag and energy settings.
   *
   * @param {{ block: Block, player: Player, dimension: Dimension }} e The event data object containing the dimension, block and player.
   * @param {GeneratorSettings} settings Custom settings to apply to the generator entity.
   * @param {Function} [callback] A function to execute after the entity is spawned (optional).
   */
  static spawnGeneratorEntity(e, settings, callback) {
    const { block, player, permutationToPlace: perm } = e;
    let { x, y, z } = block.location;
    system.runTimeout(() => {
      if (perm.hasTag("dorios:energy")) {
        player.runCommand(
          `scriptevent dorios:updatePipes energy|[${x},${y},${z}]`,
        );
      }

      if (perm.hasTag("dorios:item")) {
        player.runCommand(
          `scriptevent dorios:updatePipes item|[${x},${y},${z}]`,
        );
      }

      if (perm.hasTag("dorios:fluid")) {
        player.runCommand(
          `scriptevent dorios:updatePipes fluid|[${x},${y},${z}]`,
        );
      }
    }, 2);

    const itemInfo = player
      .getComponent("equippable")
      .getEquipment("Mainhand")
      .getLore();
    let energy = 0;
    if (itemInfo[0] && itemInfo[0].includes("Energy")) {
      energy = Energy.getEnergyFromText(itemInfo[0]);
    }

    let fluid = undefined;
    const nextLine = energy > 0 ? itemInfo[1] : itemInfo[0];
    if (nextLine) {
      fluid = FluidManager.getFluidFromText(nextLine);
    }
    system.run(() => {
      const entity = Generator.spawn(block, settings);
      Energy.initialize(entity);
      const energyManager = new Energy(entity);
      energyManager.set(energy);
      energyManager.setCap(settings.generator.energy_cap);
      energyManager.display();
      if (settings.generator.fluid_cap) {
        const fluidManager = new FluidManage
