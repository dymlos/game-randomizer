const commonChallenges = [
  {
    name: 'Special',
    options: ['', 'One-Hand Mastery', 'Wrong Direction', 'Upside Down'],
  },
]

export const games = [
  {
    name: 'Boomerang Fu',
    challenges: [
      ...commonChallenges,
      {
        name: 'Powerups',
        options: [
          'Caffeinated',
          'Dash Through Walls',
          'Teleport Boomerang',
          'Explosive Boomerang',
          'Multi Boomerang',
          'Fire Boomerang',
          'Ice Boomerang',
          'Disguise',
          'Shield',
          'Battle Royale',
          'Telekinesis Boomerang',
          'Bamboozled',
          'Extra Boomerang',
          'Decoy',
        ],
      },
      {
        name: 'Sudden death time limit',
        options: ['instant', '30 sec', '2 min'],
      },
      {
        name: 'Power up spawn rate',
        options: ['0.5x', '1x', '2x'],
      },
      {
        name: 'Friendly fire',
        options: ['on', 'off'],
      },
      {
        name: 'Revive',
        options: ['on', 'off'],
      },
    ],
  },
  {
    name: 'Mystic Strife',
    challenges: [
      ...commonChallenges,
      {
        name: 'Mode',
        options: ['Team', 'Survivor'],
      },
      {
        name: 'Class',
        options: ['Ranger', 'Wizard', 'Necromancer', 'Rogue', 'Engineer', 'Dragoon'],
      },
      {
        name: 'Round time',
        options: ['off', '10', '20', '30', '60'],
      },
      {
        name: 'Power ups',
        options: ['on', 'off'],
      },
    ],
  },
  {
    name: 'Shipped',
    challenges: [
      ...commonChallenges,
      {
        name: 'Mode',
        options: ['Mix', 'Cruise', 'Chase', 'Race', 'Yincana', 'Sumo'],
      },
      {
        name: 'Stage',
        options: ['Mix', 'Norama', 'Tirimo', 'Linera', 'Batali'],
      },
    ],
  },
  {
    name: 'Spider Heck',
    challenges: [
      ...commonChallenges,
      {
        name: 'Modifiers',
        options: ['Only blades', 'Random modifiers'],
      },
    ],
  },
  {
    name: 'Rivals of Aether',
    challenges: [
      ...commonChallenges,
      {
        name: 'Character',
        options: [
          'Zetterburn',
          'Orcane',
          'Wrastor',
          'Kragg',
          'Forsburn',
          'Maypul',
          'Absa',
          'Etalus',
          'Ranno',
          'Clairen',
          'Sylvanos',
          'Elliana',
          'Ori and Sein',
          'Shovel Knight',
          'Mollo',
          'Hodan',
          'Pomme',
          'Olympia',
        ],
      },
      {
        name: 'Mode',
        options: ['Champion', 'Team', 'Survivor'],
      },
      {
        name: 'Team attack',
        options: ['on', 'off'],
      },
      {
        name: 'Aether stages',
        options: ['on', 'off'],
      },
      {
        name: 'Turbo',
        options: ['on', 'off'],
      },
      {
        name: 'Screen wrap',
        options: ['off', '300'],
      },
    ],
  },
  {
    name: 'Wanba Warrior',
    challenges: [
      ...commonChallenges,
      {
        name: 'Character',
        options: ['Ding', 'Bing', 'Monkie', 'Scarecrow', 'Greatos', 'Doozi'],
      },
    ],
  },
  {
    name: 'Bopl Battle',
    challenges: [
      ...commonChallenges,
      {
        name: 'Abilities',
        options: [
          'Dash',
          'Grenade',
          'Bow',
          'Engine',
          'Blink Gun',
          'Gust',
          'Growth Ray',
          'Rock',
          'Missile',
          'Spike',
          'Time Stop',
          'Smoke',
          'Platform',
          'Revival',
          'Roll',
          'Shrink Ray',
          'Black Hole',
          'Invisibility',
          'Meteor',
          'Throw',
          'Push',
          'Tesla Coil',
          'Mine',
          'Teleport',
          'Drill',
          'Grappling Hook',
          'Beam',
          'Duplicator',
        ],
      },
    ],
  },
  {
    name: 'Mount your friends',
    challenges: commonChallenges,
  },
  {
    name: 'Genital Jousting',
    challenges: commonChallenges,
  },
  // {
  //   name: 'Gang Beasts'
  // },
  // {
  //   name: 'Stick Fight'
  // },
  // {
  //   name: 'Duck Game'
  // },
  // {
  //   name: 'Ultimate Chicken Horse'
  // },
  // {
  //   name: 'Lethal League Blaze'
  // },
  // {
  //   name: 'Towerfall Ascension'
  // },
  // {
  //   name: 'Nidhogg'
  // },
  // {
  //   name: 'Speedrunners'
  // },
]

export type Game = (typeof games)[number]
