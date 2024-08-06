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
    name: 'wamba-warrior',
    title: 'Wamba Warrior',
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
      'Es un 1 vs 1. Se manda un campeón por equipo. No se puede repetir el mismo champion consecutivamente si vuelve a tocar este mismo modo (El mismo campeón no puede volver a ir hasta que todos hayan pasado).',
    points: 5,
  },
  {
    name: 'team-vs-team',
    title: 'Team Vs Team',
    description:
      'Todos los jugadores de cada equipo participan. Si el juego no tiene la posibilidad de jugar en equipo, se hará un todos contra todos pero intentando jugar a favor de tu equipo.',
    points: 10,
    games: ['boomerang-fu', 'mystic-strife', 'shipped'],
  },
  {
    name: 'secret-mission',
    title: 'Secret Mission',
    description:
      'Todos los jugadores de cada equipo participan. Si el juego no tiene la posibilidad de jugar en equipo, se hará un todos contra todos pero intentando jugar a favor de tu equipo. Se sorteará una misión de asesinato a cada equipo. Esta misión es secreta. Solo la puede saber cada equipo. Por ejemplo si al equipo A le sale “Matar a Fede” y al equipo B le sale “Matar a Agus” ganará el equipo que primero logre ese asesinato.',
    points: 15,
    games: ['boomerang-fu', 'mystic-strife', 'shipped'],
  },
  {
    name: 'one-against-the-world',
    title: 'One Against The World',
    description:
      'Cada equipo mandará a sus integrantes para enfrentar a todo el equipo rival. Por ejemplo: Si hay dos equipos de tres (equipo A y equipo B) sería así:\nEl primero designado del equipo A se enfrentará a todo el equipo B al mismo tiempo. Luego el primer designado del equipo B se enfrentará a todo el equipo A. Luego lo mismo con el segundo designado de cada equipo y finalmente lo mismo con el tercer designado de cada equipo.\nCada vez que un integrante que juega solo logra una kill. Ganará el equipo que logre más kills de sus integrantes.',
    points: 20,
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
    name: 'unique-item',
    title: 'Unique Item',
    description: 'Se sorteará un ítem para que aparezca en el mapa.',
    games: ['boomerang-fu', 'spider-heck', 'bopl-battle'],
  },
  {
    name: 'double-win',
    title: 'Double Win',
    description:
      'Se jugará un mismo juego las veces que sean necesarias hasta que un equipo logre dos victorias consecutivas.',
  },
  {
    name: 'good-luck-with-that',
    title: 'Good Luck With That',
    description: 'Se deberá jugar con personajes o skills de forma aleatoria.',
  },
  {
    name: 'one-hand-mastery',
    title: 'One-Hand Mastery',
    description: 'Se jugará con una sola mano en el joystick',
  },
  {
    name: 'basic-instinct',
    title: 'Basic Instinct',
    description:
      'Se deberá jugar sin items ni habilidades especiales. Se deberá tratar de llevar al juego a su mínima ofensiva. Es decir, lo más básico que tenga el juego para derrotar al otro o ganarlo. (Por ejemplo en el Shipped no se deberá usar el cañon, en el Rival of Aether no se usarán los ataques especiales y así con cada juego)',
  },
  {
    name: 'mirror-war',
    title: 'Mirror War',
    description: 'Todos jugarán con el mismo personaje.',
  },
  {
    name: 'sudden-death',
    title: 'Sudden Death',
    description:
      'Cada personaje tendrá la vida al máximo de daño desde el inicio. Por ende, al primer golpe podrían morir.',
  },
  {
    name: 'wrong-direction',
    title: 'Wrong Direction',
    description: 'Se jugará con las flechitas del joystick invertidas',
  },
] as const satisfies { name: string; title: string; description: string; games?: Game['name'][] }[]

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
