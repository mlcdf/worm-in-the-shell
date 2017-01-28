const GameManager = () => {
  const worm = {
    progression: 0
  }

  // Number of critical components in the system.
  const systemComponents = 5

  const reset = () => {
    worm.progression = 0
  }

  const wormHasWon = () => {
    if (worm.progression === systemComponents) {
      return true
    }
    return false
  }

  const wormProgress = () => {
    worm.progression++
  }

  const wormProgression = () => {
    return worm.progression
  }

  return {
    reset,
    wormHasWon,
    wormProgress,
    wormProgression
  }
}
