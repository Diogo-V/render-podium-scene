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
   * Three.js camera that follows the spaceship in the current scene.
   */
  #follow

  /**
   * Three.js camera that has a frontal view of the scene.
   */
  #scene

  /**
   * CameraPlugin class constructor. We set the perspective camera as the default one.
   */
  constructor(scene, followCamera) {
    this.#buildPerspectiveCamera(scene)
    this.#buildFollowCamera(followCamera)
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
   * Builds Three.js camera with a follow view of the spaceship.
   */
  #buildFollowCamera(camera) {
    this.#follow = camera
  }

  /**
   * Builds Three.js camera with a frontal view of the scene.
   */
  #buildSceneCamera(scene) {
    let shift = 8
    let camera = new THREE.OrthographicCamera(window.innerWidth / -shift, window.innerWidth / shift,
                                              window.innerHeight / shift, window.innerHeight / -shift)
    camera.position.x = 0
    camera.position.y = 80
    camera.position.z = -200
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
      case __FOLLOW:
        this.#currentCamera = this.#follow
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
   * Gets follow const value. Is mainly used to change the type of camera being used in the scene.
   *
   * @returns {number} follow const value
   */
  static get FOLLOW() {
    return __FOLLOW
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
const _PERSPECTIVE = 0, __FOLLOW = 1, _SCENE = 2
