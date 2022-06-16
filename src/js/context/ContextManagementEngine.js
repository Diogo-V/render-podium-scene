/**
 * Describes scene's plugin's context. Also helps manage them.
 */
class ContextManagementEngine {

  /**
   * Holds camera plugin. This camera plugin will manage the cameras state and switch between them.
   */
  #camera

  /**
   * Holds lights plugin. This will update the lights in the scene
   */
  #lights

  /**
   * Holds scene state plugin. Allows resetting and pausing the scene.
   */
  #sceneState

  /**
   * ContextManagementEngine class constructor.
   */
  constructor(scene) {
    this.#camera = new CameraPlugin(scene)
    this.#lights = new LightsPlugin(scene)
    this.#sceneState = new SceneStatePlugin()
  }

  /**
   * Gets currently being used camera in the scene.
   *
   * @return {THREE.Camera} camera
   */
  getCamera() {
    return this.#camera.getCurrentCamera()
  }

  /**
   * Updates currently being used camera.
   *
   * @param newCameraType type of the new camera
   */
  setCamera(newCameraType) {
    this.#camera.setCamera(newCameraType)
  }

  /**
   * Gets lights plugin instance.
   *
   * @return {LightsPlugin} lights
   */
  getLights() {
    return this.#lights
  }

  /**
   * Resets scene to the initial state.
   */
  resetScene() {
    this.getLights().resetLights()
    this.setCamera(CameraPlugin.PERSPECTIVE)
  }

  /**
   * Toggles scene paused state.
   */
  pauseScene() {
    this.#sceneState.togglePaused()

  }

  /**
   * Returns boolean that tells us if the scene is paused or not.
   *
   * @return {boolean}
   */
  getScenePausedState() {
    return this.#sceneState.getState()
  }


}
