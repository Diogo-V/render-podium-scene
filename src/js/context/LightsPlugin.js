/**
 * Manages and instantiates lights in the scene.
 */
class LightsPlugin {

  /**
   * Holds directional light that lights the whole scene.
   */
  #directionalLight

  /**
   * Holds spotlight's light object from the left side of the podium.
   */
  #spotLightLeft

  /**
   * Holds spotlight's light object from the middle of the podium.
   */
  #spotLightMiddle

  /**
   * Holds spotlight's light object from the right side of the podium.
   */
  #spotLightRight

  /**
   * Lights plugin class constructor.
   *
   * @param scene {Scene} scene to apply lights to
   */
  constructor(scene) {
    this.#buildDirectionalLight(scene)
    this.#buildSpotlights(scene)
  }

  /**
   * Builds directional light that lights the whole scene.
   *
   * @param scene scene to apply the light to
   */
  #buildDirectionalLight(scene) {
    const directLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
    directLight.position.set(0, 80, 80)
    this.#directionalLight = directLight
    scene.add(directLight)
  }

  /**
   * Builds all the spotlights in the scene.
   *
   * @param scene {Scene} scene to apply lights to
   */
  #buildSpotlights(scene) {
    const spotlights = [-30, 0, 30].map((x) => {

      let geometry = new THREE.SphereGeometry(2, 32, 32)
      let material = new THREE.MeshPhongMaterial({color: 0xffffff, dithering: true})
      let ball = new THREE.Mesh(geometry, material)
      ball.position.set(x, 80, 18)
      scene.add(ball)

      geometry = new THREE.ConeGeometry(5, 10, 32)
      material = new THREE.MeshPhongMaterial({color: 0xffffff, dithering: true})
      let cone = new THREE.Mesh(geometry, material)
      cone.position.set(x, 73, 18)
      scene.add(cone)

      let spotLight = new THREE.SpotLight(0xffffff, 0.5);
      spotLight.position.set(x, 70, 18);
      spotLight.angle = Math.PI / 8;
      spotLight.penumbra = 0.1;
      spotLight.decay = 2;
      spotLight.distance = 200;

      spotLight.target.position.set(x, 0, 18)
      scene.add(spotLight.target)

      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 512;
      spotLight.shadow.mapSize.height = 512;
      spotLight.shadow.camera.near = 10;
      spotLight.shadow.camera.far = 200;
      spotLight.shadow.focus = 1;
      scene.add(spotLight);

      return spotLight

    })

    this.#spotLightLeft = spotlights[0]
    this.#spotLightMiddle = spotlights[1]
    this.#spotLightRight = spotlights[2]

  }

  /**
   * Toggles directional light's visibility.
   */
  toggleDirectionalLight() {
    this.#directionalLight.visible = ! this.#directionalLight.visible
  }

  /**
   * Toggles left light's visibility.
   */
  toggleLeftSpotlight() {
    this.#spotLightLeft.visible = ! this.#spotLightLeft.visible
  }

  /**
   * Toggles middle light's visibility.
   */
  toggleMiddleSpotlight() {
    this.#spotLightMiddle.visible = ! this.#spotLightMiddle.visible
  }

  /**
   * Toggles right light's visibility.
   */
  toggleRightSpotlight() {
    this.#spotLightRight.visible = ! this.#spotLightRight.visible
  }

  /**
   * Resets lights' state.
   */
  resetLights() {
    this.#directionalLight.visible = true
    this.#spotLightLeft.visible = true
    this.#spotLightMiddle.visible = true
    this.#spotLightRight.visible = true
  }

}
