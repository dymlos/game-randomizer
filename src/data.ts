import { getRandomItem, getRandomItemNumber, getRandomItems, normalizeWeightedArray } from './utils'

const commonChallenges = [
  {
    name: 'Special',
    choose: () =>
      getRandomItem(
        normalizeWeightedArray([
          ['', 10],
          ['One-Hand Mastery', 1],
          ['Wrong Direction', 1],
          ['Upside Down', 1],
        ]),
      ),
  },
]

export const games = [
  {
    name: 'Boomerang Fu',
    challenges: [
      ...commonChallenges,
      {
        name: 'Powerups',
        choose: () => {
          const items = [
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
          ]
          return getRandomItems(items, getRandomItemNumber(items.length))
        },
      },
      {
        name: 'Sudden death time limit',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['instant', 1],
              ['30 sec', 3],
              ['2 min', 6],
            ]),
          ),
      },
      {
        name: 'Power up spawn rate',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['0.5x', 3],
              ['1x', 3],
              ['2x', 1],
            ]),
          ),
      },
      {
        name: 'Friendly fire',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['on', 1],
              ['off', 7],
            ]),
          ),
      },
      {
        name: 'Revive',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['on', 4],
              ['off', 1],
            ]),
          ),
      },
    ],
  },
  {
    name: 'Mystic Strife',
    challenges: [
      ...commonChallenges,
      {
        name: 'Mode',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['Team', 4],
              ['Survivor', 1],
            ]),
          ),
      },
      {
        name: 'Class',
        choose: () => {
          const item = getRandomItem(
            normalizeWeightedArray([
              ['', 3],
              ['Random', 1],
            ]),
          )
          if (item !== 'Random') return item
          return getRandomItem(['Ranger', 'Wizard', 'Necromancer', 'Rogue', 'Engineer', 'Dragoon'])
        },
      },
      {
        name: 'Round time',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['off', 8],
              ['5', 1],
              ['10', 2],
              ['20', 4],
              ['30', 8],
              ['60', 8],
            ]),
          ),
      },
      {
        name: 'Power ups',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['on', 3],
              ['off', 1],
            ]),
          ),
      },
    ],
  },
  {
    name: 'Shipped',
    challenges: [
      ...commonChallenges,
      {
        name: 'Mode',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['Mix', 7],
              ['Cruise', 1],
              ['Chase', 1],
              ['Race', 1],
              ['Yincana', 1],
              ['Sumo', 1],
            ]),
          ),
      },
      {
        name: 'Stage',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['Mix', 6],
              ['Norama', 1],
              ['Tirimo', 1],
              ['Linera', 1],
              ['Batali', 1],
            ]),
          ),
      },
    ],
  },
  {
    name: 'Spider Heck',
    challenges: [
      ...commonChallenges,
      {
        name: 'Modifiers',
        choose: () => {
          const item = getRandomItem(
            normalizeWeightedArray([
              ['Only blades', 1],
              ['Random', 2],
            ]),
          )
          if (item !== 'Random') return item
          const items = [
            'Aerodynamics',
            'Blademaster',
            'Efficiency',
            'Fast Legs',
            'Invading AI',
            'Size Matters',
            'Strong Legs',
            'Fair weapons',
            'Vacuum',
            'Muscle Arms',
            'Bigger Boom',
            'Particle Technology',
            'Safety bubble',
            'Supply chain',
            'Beaming technology',
            'Insulation',
            'Floaty',
            'Thick blades',
            'More Guns',
            'Nothing',
            'Spider Storage',
            'One Shot',
            'Impending Doom',
            'No Web',
          ]
          return getRandomItems(items, getRandomItemNumber(items.length)).map(
            (item) =>
              `${item}${getRandomItem(
                normalizeWeightedArray([
                  ['', 10],
                  ['+', 1],
                ]),
              )}`,
          )
        },
      },
    ],
  },
  {
    name: 'Rivals of Aether',
    challenges: [
      ...commonChallenges,
      {
        name: 'Characters',
        choose: () => {
          const item = getRandomItem(
            normalizeWeightedArray([
              ['', 4],
              ['Fixed', 2],
              ['Full Random', 1],
            ]),
          )
          if (item !== 'Fixed') return item
          return getRandomItems(
            [
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
            getRandomItem([1, 2]),
          )
        },
      },
      {
        name: 'Mode',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['Team', 3],
              ['Champion', 2],
              ['Survivor', 1],
            ]),
          ),
      },
      {
        name: 'Team attack',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['on', 1],
              ['off', 7],
            ]),
          ),
      },
      {
        name: 'Aether stages',
        choose: () => getRandomItem(['on', 'off']),
      },
      {
        name: 'Turbo',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['on', 1],
              ['off', 7],
            ]),
          ),
      },
      {
        name: 'Screen wrap',
        choose: () =>
          getRandomItem(
            normalizeWeightedArray([
              ['off', 7],
              ['300', 1],
            ]),
          ),
      },
    ],
  },
  {
    name: 'Wanba Warrior',
    challenges: [
      ...commonChallenges,
      {
        name: 'Characters',
        choose: () => {
          const item = getRandomItem(
            normalizeWeightedArray([
              ['', 2],
              ['Random', 1],
            ]),
          )
          if (item !== 'Random') return item
          return getRandomItems(['Ding', 'Bing', 'Monkie', 'Scarecrow', 'Greatos', 'Doozi'], 2)
        },
      },
    ],
  },
  {
    name: 'Bopl Battle',
    challenges: [
      ...commonChallenges,
      {
        name: 'Abilities',
        choose: () => {
          const item = getRandomItem(
            normalizeWeightedArray([
              ['', 4],
              ['Fixed', 2],
              ['Full Random', 1],
            ]),
          )
          if (item !== 'Fixed') return item
          return getRandomItems(
            [
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
            3,
          )
        },
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
