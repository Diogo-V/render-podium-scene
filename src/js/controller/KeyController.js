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
      32: false,
      49: false,
      50: false,
      51: false,
      65: false,
      67: false,
      68: false,
      88: false,
      90: false,
      82: false,
      83: false,
      81: false,
      87: false,
      69: false,
      84: false,
      89: false,
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
   * @param objects {Array<CompoundObject>}
   * @param clock {Clock}
   */
  processKeyPressed = (context, objects, clock) => {
    'use strict'

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

    /* Resets scene */
    if (this.getMap()[51] ) {  // key -> 3
      context.resetScene()

      for (let i = 0; i < objects.length; i++){
        if (i !== 1){
          objects[i].getGroup().children[0].rotation.set(0, 0, 0)
        }
      }

      objects.forEach((obj) => {
        obj.resetShadow()
        obj.resetMeshes()
      })

      if(context.getScenePausedState()) context.pauseScene();

      this.getMap()[51] = false
    }

    /* Pauses scene */
    if (this.getMap()[32]) {  // key -> space
      context.pauseScene()
      clock.running = !!context.getScenePausedState;
      this.getMap()[32] = false
    }

    /* Toggles illumination calculation */
    if (this.getMap()[83]) {  // key -> s
      objects.forEach((obj) => {
        obj.toggleCastingShadow()
      })
      this.getMap()[83] = false
    }

    /* Changes material being used in the scene */
    if (this.getMap()[65]) {  // key -> a
      objects.forEach((obj) => {
        obj.toggleMeshes()
      })
      this.getMap()[65] = false
    }

    /* Rotates Origami1 Left */
    if (this.getMap()[81] && !context.getScenePausedState()) {  // key -> q
      objects[2].rotateLeft()
      objects[3].rotateLeft()
    }

    /* Rotates Origami1 Right */
    if (this.getMap()[87] && !context.getScenePausedState()) {  // key -> w
      objects[2].rotateRight()
      objects[3].rotateRight()
    }

    /* Rotates Origami2 Left */
    if (this.getMap()[69] && !context.getScenePausedState()) {  // key -> e
      objects[4].rotateLeft()
      objects[5].rotateLeft()
    }

    /* Rotates Origami2 Right */
    if (this.getMap()[82]) {  // key -> r
      objects[4].rotateRight()
      objects[5].rotateRight()
    }

    /* Rotates Origami3 Left */
    if (this.getMap()[84] && !context.getScenePausedState()) {  // key -> t
      objects[6].rotateLeft()
      objects[7].rotateLeft()
    }

    /* Rotates Origami3 Right */
    if (this.getMap()[89] && !context.getScenePausedState()) {  // key -> y
      objects[6].rotateRight()
      objects[7].rotateRight()
    }

  }

}