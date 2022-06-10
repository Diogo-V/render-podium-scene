/**
 * Manages key pressing activities.
 */
class KeyController {

  /**
   * Holds a map with the keys that are being pressed currently.
   */
  #keyMap

  /**
   * KeyController class constructor.
   */
  constructor() {
    this.#keyMap = {
      49: false,
      50: false,
      51: false,
      37: false,
      38: false,
      39: false,
      40: false,
    }

  }

  /**
   * Returns key map of keys.
   *
   * @return {Map}
   */
  getMap() { return this.#keyMap }

  /**
   * On a key pressed, this callback is activated and the event of pressing that key is passed to this function.
   * We need to allow multiple keys to be pressed at the same time and thus, updating multiple behaviours.
   *
   * @param event key pressed event
   */
  onKeyPress = (event) => {
    'use strict'

    /* Allows multiple keys to be pressed at the same time be storing everything in a key map */
    this.getMap()[event.keyCode] = true

  }

  /**
   * Resets key map field that are no longer being pressed.
   *
   * @param event key up event
   */
  onKeyUp = (event) => {
    'use strict'

    /* Reset key that was released by the user */
    this.getMap()[event.keyCode] = false
    stop()

  }

  /**
   * Analyses which keys where pressed and performs the requested actions for those keys.
   *
   * @param context {ContextManagementEngine}
   * @param objects {Array<Mesh>}
   * @param compound {CompoundObject}
   * @param delta {number}
   * @param radius {number}
   */
  processKeyPressed = (context, objects, compound, delta, radius) => {
    'use strict'

    // Holds array with currently being pressed direction. This will be latter on passed to the compound object's
    // movement and calculate the total movement vector
    let movement = []

    /* Changes camera angle */
    if (this.getMap()[49]) {  // key -> 1
      context.setCamera(CameraPlugin.FRONTAL)
      this.getMap()[49] = false
    }

    /* Changes camera angle */
    if (this.getMap()[50]) {  // key -> 2
      context.setCamera(CameraPlugin.SIDE)
      this.getMap()[50] = false
    }

    /* Changes camera angle */
    if (this.getMap()[51]) {  // key -> 3
      context.setCamera(CameraPlugin.FOLLOW)
      this.getMap()[51] = false
    }

    /* Moves articulated object up */
    if (this.getMap()[38]) {  // key -> up
      movement.push(Direction.UP)
    }

    /* Moves articulated object down */
    if (this.getMap()[40]) {  // key -> down
      movement.push(Direction.DOWN)
    }

    /* Moves articulated object to the left */
    if (this.getMap()[37]) {  // key -> left
      movement.push(Direction.LEFT)
    }

    /* Moves articulated object to the right */
    if (this.getMap()[39]) {  // key -> right
      movement.push(Direction.RIGHT)
    }

    /* If any key was pressed, we call the update function of the spaceship */
    compound.move(movement, delta, radius)

  }

}
