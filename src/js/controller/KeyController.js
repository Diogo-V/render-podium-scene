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
      67: false,
      68: false,
      88: false,
      90: false
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
   */
  processKeyPressed = (context, objects, compound, delta) => {
    'use strict'

    // Holds array with currently being pressed direction. This will be latter on passed to the compound object's
    // movement and calculate the total movement vector
    let movement = []

    /* Changes camera angle */
    if (this.getMap()[49]) {  // key -> 1
      context.setCamera(CameraPlugin.PERSPECTIVE)
      this.getMap()[49] = false
    }

    /* Changes camera angle */
    if (this.getMap()[50]) {  // key -> 2
      context.setCamera(CameraPlugin.SCENE)
      this.getMap()[50] = false
    }

    /* Changes camera angle */
    if (this.getMap()[51]) {  // key -> 3
      context.setCamera(CameraPlugin.FOLLOW)
      this.getMap()[51] = false
    }

    /* Turns on/off directional light */
    if (this.getMap()[68]) {  // key -> d
      context.getLights().toggleDirectionalLight()
      this.getMap()[68] = false
    }

    /* Turns on/off left light */
    if (this.getMap()[90]) {  // key -> z
      context.getLights().toggleLeftSpotlight()
      this.getMap()[90] = false
    }

    /* Turns on/off middle light */
    if (this.getMap()[88]) {  // key -> x
      context.getLights().toggleMiddleSpotlight()
      this.getMap()[88] = false
    }

    /* Turns on/off right light */
    if (this.getMap()[67]) {  // key -> c
      context.getLights().toggleRightSpotlight()
      this.getMap()[67] = false
    }


  }

}
