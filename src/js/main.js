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
    let [scene, sceneScale]  = this.#initScene()
    this.#sceneScale = sceneScale
    this.#scene = scene
    this.#context = new ContextManagementEngine(this.getScene())
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

    window.addEventListener('resize', function (_) {
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

    let r = new THREE.Object3D()

    /* Adds rest of objects to the scene */
    this.#buildScene(scene, r)

    return [scene, r]
  }

  /**
   * Initializes component that will render 3.js objects in our scene.
   *
   * @return {THREE.WebGLRenderer}
   */
  static #initRenderer() {
    'use strict'

    /*  (we set this to the max size of the screen) */
    let renderer = new THREE.WebGLRenderer()

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;

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
  #buildScene = (scene, r) => {
    'use strict'

    let geometry
    let material
    let width
    let height
    let depth
    let step
    let body
    let top

    // #################################################### PODIUM #####################################################

    width = 60  // ui: width
    height = 15  // ui: height
    depth = 80  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshPhongMaterial({color: 0xA0522D, dithering: true})
    step = new THREE.Mesh(geometry, material)
    step.position.x = 0
    step.position.y = -80
    step.position.z = -5
    step.castShadow = true;
    r.add(step)
    this.#sceneObjects.push(step)

    width = 60  // ui: width
    height = 10  // ui: height
    depth = 60  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshPhongMaterial({color: 0xA0522D, dithering: true})
    step = new THREE.Mesh(geometry, material)
    step.position.x = 0
    step.position.y = -67.5
    step.position.z = 5
    step.castShadow = true;
    r.add(step)
    this.#sceneObjects.push(step)

    width = 35  // ui: width
    height = 60  // ui: height
    depth = 25  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshPhongMaterial({color: 0xA0522D, dithering: true})
    body = new THREE.Mesh(geometry, material)
    body.position.x = 0
    body.position.y = -32.5
    body.position.z = 18
    body.castShadow = true;
    r.add(body)
    this.#sceneObjects.push(body)

    width = 100  // ui: width
    height = 10  // ui: height
    depth = 50  // ui: depth
    geometry = new THREE.BoxGeometry(width, height, depth)
    material = new THREE.MeshPhongMaterial({color: 0xA0522D, dithering: true})
    top = new THREE.Mesh(geometry, material)
    top.position.x = 0
    top.position.y = 2.5
    top.position.z = 18
    top.castShadow = true;
    r.add(top)
    this.#sceneObjects.push(top)

    // ##################################################### FLOOR #####################################################

    material = new THREE.MeshPhongMaterial( { color: 0x00FF00, dithering: true } );
    geometry = new THREE.PlaneGeometry( 2000, 2000 );
    let floor = new THREE.Mesh( geometry, material );

    floor.position.set( 0, -85, 0 );
    floor.rotation.x = - Math.PI * 0.5;
    floor.receiveShadow = true;
    r.add( floor );
    this.#sceneObjects.push(floor)

    // ################################################### ORIGAMI 1 ###################################################

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
    material = new THREE.MeshPhongMaterial( { color: 0xff0000, dithering: true } );
    let object = new THREE.Mesh( geometry, material );

    object.position.x = -50
    object.position.y = 15
    object.position.z = 0
    object.castShadow = true

    r.add(object)
    this.#sceneObjects.push(object)

    // ################################################### ORIGAMI 2 ###################################################

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
    material = new THREE.MeshPhongMaterial( { color: 0xff0000, dithering: true } );
    object = new THREE.Mesh( geometry, material );

    object.position.x = 0
    object.position.y = 15
    object.position.z = 10
    object.castShadow = true
    r.add(object)
    this.#sceneObjects.push(object)

    // ################################################### ORIGAMI 3 ###################################################
    geometry = new THREE.BufferGeometry();

    var vertices = new Float32Array( [
      0,0,0,
      2.2,-3,1.1,
      14.7,2.7,0,

      2.2,-3,1.1,
      10.9,-3,1.9,
      14.7,2.7,0,

      0,0,0,
      2.2,-3,-1.1,
      14.7,2.7,0,

      2.2,-3,-1.1,
      10.9,-3,-1.9,
      14.7,2.7,0,

      0,0,0,
      2.2,-3,1.1,
      3,9.6,0,

      2.2,-3,1.1,
      4.2,9.3,0.8,
      3,9.6,0,

      0,0,0,
      2.2,-3,-1.1,
      3,9.6,0,

      2.2,-3,-1.1,
      4.2,9.3,-0.8,
      3,9.6,0,

      -0.5,8,0,
      4.2,9.3,0.8,
      3,9.6,0,

      -0.5,8,0,
      4.2,9.3,-0.8,
      3,9.6,0

    ])

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    material = new THREE.MeshPhongMaterial( { color: 0xff0000, dithering: true } );
    object = new THREE.Mesh( geometry, material );

    object.position.x = 30
    object.position.y = 20
    object.position.z = 10
    object.castShadow = true
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