/**
 * Manages and instantiates cameras in the scene.
 */
class CameraPlugin {

  /**
   * Holds current camera being used in the scene.
   */
  #currentCamera

  /**
   * Three.js camera that has a perspective view of the scene.
   */
  #perspective

  /**
   * Three.js camera that has a stereo view of the scene.
   */
  #stereo

  /**
   * Three.js camera that has a frontal view of the scene.
   */
  #scene

  /**
   * CameraPlugin class constructor. We set the perspective camera as the default one.
   */
  constructor(scene) {
    this.#buildPerspectiveCamera(scene)
    this.#buildStereoCamera(scene)
    this.#buildSceneCamera(scene)
    this.#currentCamera = this.#perspective
  }

  /**
   * Builds Three.js camera with a perspective view of the scene.
   */
  #buildPerspectiveCamera(scene) {
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.x = 150
    camera.position.y = 100
    camera.position.z = 150
    camera.lookAt(scene.position)
    this.#perspective = camera
  }

  /**
   * Builds Three.js camera with a stereo view of the spaceship.
   */
  #buildStereoCamera(scene) {
    let camera = new THREE.StereoCamera()
    this.#stereo = camera
  }

  /**
   * Builds Three.js camera with a frontal view of the scene.
   */
  #buildSceneCamera(scene) {
    let shift = 8
    let camera = new THREE.OrthographicCamera(window.innerWidth / -shift, window.innerWidth / shift,
                                              window.innerHeight / shift, window.innerHeight / -shift)
    camera.position.x = 0
    camera.position.y = 20
    camera.position.z = 200
    camera.lookAt(scene.position)
    this.#scene = camera
  }

  /**
   * Returns the current camera being used.
   *
   * @return {THREE.Camera} camera being used in the scene
   */
  getCurrentCamera() {
    return this.#currentCamera
  }

  /**
   * Updates currently being used camera.
   *
   * @param newCameraType type of the new camera to be used in the scene
   */
  setCamera(newCameraType) {
    switch (newCameraType) {
      case _PERSPECTIVE:
        this.#currentCamera = this.#perspective
        break
      case _STEREO:
        this.#currentCamera = this.#stereo
        break
      case _SCENE:
        this.#currentCamera = this.#scene
    }
  }

  /**
   * Gets perspective const value. Is mainly used to change the type of camera being used in the scene.
   *
   * @returns {number} perspective const value
   */
  static get PERSPECTIVE() {
    return _PERSPECTIVE
  }

  /**
   * Gets stereo const value. Is mainly used to change the type of camera being used in the scene.
   *
   * @returns {number} follow const value
   */
  static get STEREO() {
    return _STEREO
  }

  /**
   * Gets scene const value. Is mainly used to change the type of camera being used in the scene.
   *
   * @returns {number} scene const value
   */
  static get SCENE() {
    return _SCENE
  }

}


/* Holds type of camera that can be instantiated (front, top and side view) */
const _PERSPECTIVE = 0, _STEREO = 1, _SCENE = 2
