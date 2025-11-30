// Bio-based fuels for the Bio Generator
// "de" = Dorios Energy generated per full item burn

export const bioFuels = [
  // 🌾 Basic organic items (low energy)
  { id: 'beetroot_seeds', de: 800 },
  { id: 'wheat_seeds', de: 900 },
  { id: "seagrass", de: 600 },
  { id: "kelp", de: 750 },
  { id: "sugar_cane", de: 900 },
  { id: "bamboo", de: 800 },
  { id: "cactus", de: 800 },

  // 🍃 Plant material & crops (medium energy)
  { id: 'wheat', de: 1600 },
  { id: 'carrot', de: 1600 },
  { id: 'potato', de: 1200 },
  { id: 'beetroot', de: 1000 },
  { id: 'sweet_berries', de: 1100 },
  { id: 'melon_slice', de: 1000 },
  { id: 'pumpkin', de: 3200 },
  { id: 'apple', de: 1500 },

  // 🌿 Leaves, vines, and natural vegetation (medium-high)
  { id: 'oak_leaves', de: 1600 },
  { id: 'birch_leaves', de: 1600 },
  { id: 'spruce_leaves', de: 1600 },
  { id: 'jungle_leaves', de: 1600 },
  { id: 'vine', de: 1200 },
  { id: 'glow_lichen', de: 1300 },
  { id: 'moss_block', de: 1800 },
  { id: 'moss_carpet', de: 1000 },
  { id: 'azalea_leaves', de: 1700 },

  // 🍄 Fungal & Nether organic (high energy)
  { id: 'crimson_fungus', de: 2000 },
  { id: 'warped_fungus', de: 2000 },
  { id: 'crimson_roots', de: 1600 },
  { id: 'minecraft:warped_roots', de: 1600 },
  { id: 'nether_wart', de: 2200 },
  { id: 'weeping_vines', de: 1900 },
  { id: 'twisting_vines', de: 1900 },
  { id: 'shroomlight', de: 2400 },

  // 🌰 Advanced organic matter (very high energy)
  { id: 'hay_block', de: 16000 },
  { id: 'dried_kelp_block', de: 5200 },
  { id: 'melon_block', de: 1000 },
  { id: 'brown_mushroom_block', de: 3400 },
  { id: 'red_mushroom_block', de: 3400 },

  // 🌺 Decorative organics (fun additions)
  { id: 'flowering_azalea', de: 1500 },
  { id: 'dandelion', de: 1600 },
  { id: 'poppy', de: 1600 },
  { id: 'blue_orchid', de: 1700 },
  { id: 'allium', de: 1700 },
  { id: 'tulip', de: 170 },
  { id: 'oxeye_daisy', de: 1700 },
  { id: 'cornflower', de: 1700 },
  { id: 'lily_of_the_valley', de: 1700 },
  { id: 'wither_rose', de: 8000 },

  // 🍂 Wood-derived compostable items (bonus organic fuel)
  { id: 'azalea', de: 1800 },
  { id: 'mangrove_propagule', de: 1500 },
  { id: 'small_dripleaf', de: 1600 },
  { id: 'big_dripleaf', de: 1800 },
  
  // Bio mass fuels
  { id: 'biomass', de: 32000 },
  { id: 'biomass_block', de: 320000 },
  { id: 'compost', de: 8000 },
  { id: 'biowaste', de: 3200 },
]

export const poopFuels = [
  { id: 'biowaste', de: 8000 },
  { id: 'compost', de: 24000 },
]
