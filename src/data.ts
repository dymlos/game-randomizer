export const games = [
  {
    name: 'boomerang-fu',
    title: 'Boomerang Fu',
  },
  {
    name: 'mystic-strife',
    title: 'Mystic Strife',
  },
  {
    name: 'shipped',
    title: 'Shipped',
  },
  {
    name: 'spider-heck',
    title: 'Spider Heck',
  },
  {
    name: 'rivals-of-aether',
    title: 'Rivals of Aether',
  },
  {
    name: 'wanba-warrior',
    title: 'Wanba Warrior',
  },
  {
    name: 'bopl-battle',
    title: 'Bopl Battle',
  },
] as const satisfies {
  name: string
  title: string
}[]

export type Game = (typeof games)[number]

export const battleModes = [
  {
    name: 'the-champion',
    title: 'The Champion',
    description:
      'Es un 1 vs 1. Se manda un campeón por equipo. No se puede repetir el mismo champion consecutivamente si vuelve a tocar este mismo modo (el mismo campeón o survivor no puede volver a ir hasta que todos hayan pasado).',
    points: 5,
    games: [
      'boomerang-fu',
      'mystic-strife',
      'shipped',
      'spider-heck',
      'rivals-of-aether',
      'wanba-warrior',
      'bopl-battle',
    ],
  },
  {
    name: 'team-vs-team',
    title: 'Team Vs Team',
    description:
      'Todos los jugadores de cada equipo participan. Si el juego no tiene la posibilidad de jugar en equipo, se hará un todos contra todos pero intentando jugar a favor de tu equipo.',
    points: 10,
    games: ['boomerang-fu', 'mystic-strife', 'shipped', 'rivals-of-aether', 'bopl-battle'],
  },
  {
    name: 'survival',
    title: 'Survival',
    description:
      'Cada equipo mandará a uno de sus integrantes para enfrentar a todo el equipo rival',
    points: 10,
    games: ['boomerang-fu', 'mystic-strife', 'rivals-of-aether', 'bopl-battle'],
  },
] as const satisfies {
  name: string
  title: string
  description: string
  points: number
  games?: Game['name'][]
}[]

export type BattleMode = (typeof battleModes)[number] & { games?: Game['name'][] }

export const challenges = [
  {
    name: 'no-challenge',
    title: 'No Challenge',
    description: 'No hay desafío',
    weight: 4,
  },
  {
    name: 'unique-item',
    title: 'Unique Item',
    description: 'Se sortearán las habilidades o items que se podrán usar en el juego',
    games: ['boomerang-fu', 'bopl-battle'],
    weight: 4,
  },
  {
    name: 'good-luck-with-that',
    title: 'Good Luck With That',
    description: 'Se deberá jugar con personajes o skills de forma aleatoria',
    games: ['mystic-strife', 'rivals-of-aether', 'wanba-warrior', 'bopl-battle'],
    weight: 3,
  },
  {
    name: 'one-hand-mastery',
    title: 'One-Hand Mastery',
    description: 'Se jugará con una sola mano en el joystick',
    weight: 1,
  },
  {
    name: 'mirror-war',
    title: 'Mirror War',
    description: 'Todos jugarán con el mismo personaje o poderes',
    games: ['mystic-strife', 'rivals-of-aether', 'wanba-warrior', 'bopl-battle'],
    weight: 3,
  },
  {
    name: 'sudden-death',
    title: 'Sudden Death',
    description:
      'Cada personaje tendrá la vida al máximo de daño desde el inicio. Por ende, al primer golpe podrían morir',
    games: ['rivals-of-aether'],
    weight: 2,
  },
  {
    name: 'wrong-direction',
    title: 'Wrong Direction',
    description: 'Se jugará con las flechitas del joystick invertidas',
    weight: 1,
  },
] as const satisfies {
  name: string
  title: string
  description: string
  weight: number
  games?: Game['name'][]
}[]

export type Challenge = (typeof challenges)[number] & { games?: Game['name'][] }

export const powerUps = [
  {
    name: 'this-is-my-game',
    title: 'This is my game!',
    description: 'Puede elegir un juego en particular para el desafío correspondiente',
  },
  {
    name: 'challenge-repeat',
    title: 'Challenge Repeat',
    description: 'Puede elegir repetir el challenge del anterior turno',
  },
  {
    name: 'soldier-who-deserts',
    title: 'Soldier who deserts...',
    description: 'Puedes sacar otra carta de “Battle Mode” al azar',
  },
  {
    name: 'double-edge',
    title: 'Double Edge',
    description: 'Duplica los puntos del Battle Mode para cualquier equipo que gane',
  },
  {
    name: 'half-the-points',
    title: 'Half the Points',
    description: 'Divide los puntos del Battle Mode para cualquier equipo que gane',
  },
  {
    name: 'change-champion',
    title: 'Change Champion',
    description: 'Puedes cambiar el champion del rival en el modo “The Champion”',
  },
  {
    name: 'same-condition',
    title: 'Same Condition',
    description:
      'Puedes sacarles un miembro al rival en el modo “Team Vs Team”\nEsta carta solo puede usarla el team con menos integrantes en caso que sean equipos impares',
  },
  {
    name: 'reveal-mission',
    title: 'Reveal Mission',
    description: 'Se revelará la misión del rival en el modo “Secret Mission”',
  },
] as const satisfies { name: string; title: string; description: string }[]

export type PowerUp = (typeof powerUps)[number]

export const boomerangFuItems = [
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

export const boplBattleItems = [
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
]

export const rivalsOfAetherCharacters = [
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
]

export const mysticStrifeCharacters = [
  'Ranger',
  'Wizard',
  'Necromancer',
  'Rogue',
  'Engineer',
  'Dragoon',
]

export const wanbaWarriorsCharacters = ['Ding', 'Bing', 'Monkie', 'Scarecrow', 'Greatos', 'Doozi']
