/**
 * GameManager factory
 * @return {Object} GameManager
 */
const GameManager = () => {
  const player = {
    lifes: 2
  }

  const reset = () => {
    player.lifes = 2
  }

  const isPlayerDead = () => {
    if (player.lifes === 0) {
      return true
    }
    return false
  }

  const removePlayerLife = () => {
    player.lifes--
  }

  reset()

  return {
    reset,
    isPlayerDead,
    removePlayerLife
  }
}
