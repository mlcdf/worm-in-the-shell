'use strict'

/**
 * Represent the player
 * @constructor
 * @param {name} name
 */
const Player = (_name) => {
  const name = _name
  let lives = 3

  return {
    name: () => name,
    life: () => lives,
    loseLife: () => --lives
  }
}
