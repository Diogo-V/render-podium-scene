class Main {

  /**
   * Holds scene (where all the components are going to be put).
   */
  #scene

  /**
   * Holds context object that allows us to control simple plugins (camera, wireframe, ...) that influence the state of
   * the scene.
   */
  #context

  /**
   * Component that will render 3.js objects in our scene (we set this to the max size of the screen).
   */
  #renderer

  /**
   * Plugin that will control the key pressing.
   */
  #controller

  /**
   * Holds spaceship.
   */
  #compound

  /**
   * Holds clock value and determines delta time. This allows for pcs with lower fps to still get a good image.
   */
  #clock

  /**
   * Holds all the objects that were added to the scene.
   * 
   * @type {Array<THREE.Mesh>}
   */
  #sceneObjects

  #sceneScale

  /**
   * Main class constructor.
   */
  constructor() {

    /* Builds components required to manage, control and display our scene */
    this.#renderer = Main.#initRenderer()
    this.#sceneObjects = Array()
    this.#compound = new CompoundObject()
    let [scene, followCamera, sceneScale]  = this.#initScene()
    this.#sceneScale = sceneScale
    this.#scene = scene
    this.#context = new ContextManagementEngine(this.getScene(), followCamera)
    this.#controller = new KeyController()
    this.#clock = new THREE.Clock(true)

    /* Renders everything in the UI */
    this.#display()

    /* Adds key handling method to the program. This will, latter on, allow us to rotate and change camera perspective
     * after a user input a key */
    window.addEventListener("keydown", function(event) {
      this.getController().onKeyPress(event)
    }.bind(this), false)

    /* Clears pressed keys when the user stops clicking it */
    window.addEventListener("keyup", function (event) {
     this.getController().onKeyUp(event)
    }.bind(this), false)

    window.addEventListener('resize', function (event) {
      this.getContext().getCamera().aspect = window.innerWidth / window.innerHeight;
      this.getContext().getCamera().updateProjectionMatrix();

      this.getRenderer().setSize( window.innerWidth, window.innerHeight );
    }.bind(this), false);

  }

  /**
   * Creates scene and adds objects to it.
   */
  #initScene() {
    'use strict'

    /* Creates scene  */
    let scene = new THREE.Scene()

    let followCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000)

    let r = new THREE.Object3D()

    /* Adds rest of objects to the scene */
    this.#buildScene(scene, followCamera, r)

    return [scene, followCamera, r]
  }

  /**
   * Initializes component that will render 3.js objects in our scene.
   *
   * @return {THREE.WebGLRenderer}
   */
  static #initRenderer() {
    'use strict'

    /*  (we set this to the max size of the screen) */
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    return renderer
  }

  /**
   * Returns scene object (holds all other objects in the screen).
   *
   * @return {THREE.Scene}
   */
  getScene() { return this.#scene }

  /**
   * Returns compound object.
   *
   * @return {CompoundObject}
   */
  getCompound() { return this.#compound }

  /**
   * Returns context.
   *
   * @return {ContextManagementEngine}
   */
  getContext() { return this.#context }

  /**
   * Returns WebGL renderer.
   *
   * @return {THREE.WebGLRenderer}
   */
  getRenderer() { return this.#renderer }

  /**
   * Returns a list with the objects added to the scene.
   *
   * @return {Array<THREE.Mesh>}
   */
  getSceneObjects() { return this.#sceneObjects }

  /**
   * Returns three.js clock.
   *
   * @return {THREE.Clock}
   */
  getClock() { return this.#clock }

  /**
   * Returns key pressing controller.
   *
   * @return {KeyController}
   */
  getController() { return this.#controller }


  /**
   * Adds objects to the scene.
   */
  #buildScene = (scene, followCamera, r) => {
    'use strict'

    let geometry
    let material
    let width
    let height
    let depth
    let step
    let body
    let top
    let floor

    // Palanque
    width = 60  // ui: width
    height = 15  // ui: height
    depth = 80  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshBasicMaterial({color: 0xA0522D})
    step = new THREE.Mesh(geometry, material)
    step.position.x = 0
    step.position.y = -80
    step.position.z = -5
    r.add(step)
    this.#sceneObjects.push(step)

    width = 60  // ui: width
    height = 10  // ui: height
    depth = 60  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshBasicMaterial({color: 0xA0522D})
    step = new THREE.Mesh(geometry, material)
    step.position.x = 0
    step.position.y = -67.5
    step.position.z = 5
    r.add(step)
    this.#sceneObjects.push(step)

    width = 35  // ui: width
    height = 60  // ui: height
    depth = 25  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshBasicMaterial({color: 0xA0522D})
    body = new THREE.Mesh(geometry, material)
    body.position.x = 0
    body.position.y = -32.5
    body.position.z = 18
    r.add(body)
    this.#sceneObjects.push(body)

    width = 100  // ui: width
    height = 10  // ui: height
    depth = 50  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshBasicMaterial({color: 0xA0522D})
    top = new THREE.Mesh(geometry, material)
    top.position.x = 0
    top.position.y = 2.5
    top.position.z = 18
    r.add(top)
    this.#sceneObjects.push(top)


    //Floor
    width = 1500 // ui: width
    height = 200  // ui: height
    depth = 600  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshBasicMaterial({color: 0xffffff})
    floor = new THREE.Mesh(geometry, material)
    floor.position.x = 0
    floor.position.y = -187.5
    floor.position.z = 0
    r.add(floor)
    this.#sceneObjects.push(floor)

    //Origami 1
    geometry = new THREE.BufferGeometry();

    var vertices = new Float32Array( [
      0,   0,  10,    // v1
      15,  15,  15,  // v3
      0,   30, 10,   // v2

      0,   0,  10,    // v1
      0,   30, 10,
      -15, 15,  15,    //v4

      ]);

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let object = new THREE.Mesh( geometry, material );

    object.position.x = -50
    object.position.y = 15
    object.position.z = 0

    r.add(object)
    this.#sceneObjects.push(object)

    //Origami 2
    geometry = new THREE.BufferGeometry();

    var vertices = new Float32Array( [
      0, 0,    0,
      5.5, 24.5, 0,
      0, 30,   0,

      0, 0,    0,
      0, 30,   0,
      -5.5, 24.5, 0,

      0, 0,    0,
      5.5, 24.5, 0,
      0, 23,   1,

      0, 0,    0,
      0, 23,   1,
      -5.5, 24.5, 0,

      0, 0,    0,
      4, 21,   0,
      0, 23,   1,

      0, 0,    0,
      0, 23,   1,
      -4, 21,  0,

      0, 0,    0,
      4, 21,   0,
      0, 21,  -1,

      0, 0,    0,
      0, 21,   -1,
      -4, 21,  0

      ]);

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    object = new THREE.Mesh( geometry, material );

    object.position.x = 0
    object.position.y = 15
    object.position.z = 10

    r.add(object)
    this.#sceneObjects.push(object)

    scene.add(r)

  }

  /**
   * Cleans previous scene from the UI and displays the new objects after they have been updated.
   */
  #display = () => {
    'use strict'
    this.getRenderer().render(this.getScene(), this.getContext().getCamera())
  }

  /**
   * Defines the update life-cycle event. In this function, we update the state/position of each object in the scene
   * before they get 'displayed' in the UI again.
   */
  #update = () => {

    /* Gets the elapsed time from the previous frame. This makes fps smoother in lower end pc's */
    let delta = this.getClock().getDelta()

    /* Prompts key controller to check which keys were pressed and to delegate actions to the various components */
    this.getController().processKeyPressed(this.getContext(), this.getSceneObjects(), this.getCompound(), delta)

  }

  /**
   * Main UI loop control function. Is executed 60 times per second to achieve 60 frames/s. We update and then display
   * all items in an infinite loop.
   */
  animate = () => {
    'use strict'

    /* Update + Display life cycle */
    this.#update()
    this.#display()

    /* Tells browser to call the animate function again after 1/60 seconds */
    requestAnimationFrame(this.animate)
  }

}