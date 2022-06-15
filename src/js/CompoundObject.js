class CompoundObject {

  /**
   * Three.js group object that is going to be added to the scene.
   */
  #group

  /**
   * Holds meshes to be applied to each individual object in the group.
   */
  #meshPhong

  /**
   * Holds meshes to be applied to each individual object in the group.
   */
  #meshLambert

  /**
   * Holds currently applied mesh.
   */
  #appliedMesh

  /**
   * Tells us if the current object is casting a shadow or not.
   */
  #isCastingShadow

  /**
   * CompoundObject class constructor.
   */
  constructor() {
    this.#group = new THREE.Group()
    this.#meshLambert = null
    this.#meshPhong = null
    this.#appliedMesh = _PHONG
    this.#isCastingShadow = true
  }

  /**
   * Gets scene group.
   *
   * @return {Group}
   */
  getGroup() { return this.#group }

  /**
   * Adds object to group.
   *
   * @param object
   */
  addToGroup(object) {
    this.getGroup().add(object)
  }

  /**
   * Updates currently saved phong mesh.
   *
   * @param mesh phong mesh
   */
  addPhongMesh(mesh) {
    this.#meshPhong = mesh
  }

  /**
   * Updates currently saved lambert mesh.
   *
   * @param mesh phong mesh
   */
  addLambertMesh(mesh) {
    this.#meshLambert = mesh
  }

  /**
   * Toggles between meshes.
   */
  toggleMeshes() {
    let mesh = this.#appliedMesh === _PHONG ? this.#meshLambert : this.#meshPhong
    this.getGroup().children.forEach((obj) => {
      obj.material = mesh
    })
    this.#appliedMesh = this.#appliedMesh === _PHONG ? _LAMBERT : _PHONG
  }

  /**
   * Toggles between casting shadows.
   */
  toggleCastingShadow() {
    this.getGroup().children.forEach((obj) => {
      obj.castShadow = !this.#isCastingShadow
      obj.receiveShadow = !this.#isCastingShadow
    })
    this.#isCastingShadow = ! this.#isCastingShadow
  }

  rotateleft(){
    this.getGroup().children.forEach((obj) => {
      obj.rotateY(-0.1)
    })
  }

  rotateright(){
    this.getGroup().children.forEach((obj) => {
      obj.rotateY(0.1)
    })
  }

}


const _LAMBERT = 0, _PHONG = 1
