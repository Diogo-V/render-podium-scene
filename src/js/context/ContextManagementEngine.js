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
   * ContextManagementEngine class constructor.
   */
  constructor(scene) {
    this.#camera = new CameraPlugin(scene)
    this.#lights = new LightsPlugin(scene)
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

}
