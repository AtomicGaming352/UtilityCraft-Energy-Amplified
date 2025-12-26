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
  { id: 'golden_carrot', de: 1600 },
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
  { id: 'nether_wart_block', de: 3600 },
  { id: 'warped_wart_block', de: 3600 },
  { id: 'crimson_roots', de: 1600 },
  { id: 'warped_roots', de: 1600 },
  { id: 'nether_wart', de: 360 },
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

  // Compressy shit
  { id: 'compressed_biomass_block4', de: 3200000000 },
  { id: 'compressed_biomass_block3', de: 320000000 },
  { id: 'compressed_biomass_block2', de: 32000000 },
  { id: 'compressed_biomass_block', de: 3200000 },

  // Bio mass fuels
  { id: 'biomass_block', de: 320000 },
  { id: 'biomass', de: 32000 },
  { id: 'compost', de: 8000 },
  { id: 'biowaste', de: 3200 },
]

export const poopFuels = [
  { id: 'biowaste', de: 8000 },
  { id: 'compost', de: 24000 },
]

export const radicalbioFuels = [
  // 🌾 Basic organic items (low energy)
  { id: 'beetroot_seeds', de: 1600 },
  { id: 'wheat_seeds', de: 1800 },
  { id: "seagrass", de: 1200 },
  { id: "kelp", de: 1500 },
  { id: "sugar_cane", de: 1800 },
  { id: "bamboo", de: 1600 },
  { id: "cactus", de: 1600 },

  // 🍃 Plant material & crops (medium energy)
  { id: 'wheat', de: 3200 },
  { id: 'carrot', de: 3200 },
  { id: 'potato', de: 2400 },
  { id: 'beetroot', de: 2000 },
  { id: 'sweet_berries', de: 2200 },
  { id: 'melon_slice', de: 2000 },
  { id: 'pumpkin', de: 6400 },
  { id: 'apple', de: 3000 },

  // 🌿 Leaves, vines, and vegetation (medium-high)
  { id: 'oak_leaves', de: 3200 },
  { id: 'birch_leaves', de: 3200 },
  { id: 'spruce_leaves', de: 3200 },
  { id: 'jungle_leaves', de: 3200 },
  { id: 'vine', de: 2400 },
  { id: 'glow_lichen', de: 2600 },
  { id: 'moss_block', de: 3600 },
  { id: 'moss_carpet', de: 2000 },
  { id: 'azalea_leaves', de: 3400 },

  // 🍄 Fungal & Nether organics (high energy)
  { id: 'crimson_fungus', de: 4000 },
  { id: 'warped_fungus', de: 4000 },
  { id: 'crimson_roots', de: 3200 },
  { id: 'minecraft:warped_roots', de: 3200 },
  { id: 'nether_wart', de: 4400 },
  { id: 'weeping_vines', de: 3800 },
  { id: 'twisting_vines', de: 3800 },
  { id: 'shroomlight', de: 4800 },

  // 🌰 Advanced organic matter (very high energy)
  { id: 'hay_block', de: 32000 },
  { id: 'dried_kelp_block', de: 10400 },
  { id: 'melon_block', de: 2000 },
  { id: 'brown_mushroom_block', de: 6800 },
  { id: 'red_mushroom_block', de: 6800 },

  // 🌺 Decorative organics
  { id: 'flowering_azalea', de: 3000 },
  { id: 'dandelion', de: 3200 },
  { id: 'poppy', de: 3200 },
  { id: 'blue_orchid', de: 3400 },
  { id: 'allium', de: 3400 },
  { id: 'tulip', de: 340 },     // doubled from 170
  { id: 'oxeye_daisy', de: 3400 },
  { id: 'cornflower', de: 3400 },
  { id: 'lily_of_the_valley', de: 3400 },
  { id: 'wither_rose', de: 16000 },

  // 🍂 Wood-derived compostables
  { id: 'azalea', de: 3600 },
  { id: 'mangrove_propagule', de: 3000 },
  { id: 'small_dripleaf', de: 3200 },
  { id: 'big_dripleaf', de: 3600 },

  // Compressy shit
  { id: 'compressed_biomass_block4', de: 3200000000 },
  { id: 'compressed_biomass_block3', de: 320000000 },
  { id: 'compressed_biomass_block2', de: 32000000 },
  { id: 'compressed_biomass_block', de: 3200000 },
  
  // Bio fuels
  { id: 'biomass_block', de: 640000 },
  { id: 'biomass', de: 64000 },
  { id: 'compost', de: 16000 },
  { id: 'biowaste', de: 6400 }
]
