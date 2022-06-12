/**
 * Manages scene state in the scene that is being rendered.
 */
class SceneStatePlugin {

  /**
   * Tells us if the scene is currently paused or not.
   */
  #isPaused

  /**
   * SceneStatePlugin class constructor.
   */
  constructor() {
    this.#isPaused = false
  }

  /**
   * Toggles paused state.
   */
  togglePaused() {
    this.#isPaused = ! this.#isPaused
  }

  /**
   * Returns paused state.
   *
   * @return {boolean}
   */
  getState() {
    return this.#isPaused
  }

}
