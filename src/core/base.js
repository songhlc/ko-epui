class Base {
  constructor (params) {
    this.$el = params.$el
    this.$templateNodes = params.$templateNodes
    this.initialize(params)
    this.computed(params)
    this.subscribe(params)
    this.methods(params)
    this.created(params)
  }
  initialize (params) { }
  computed (params) { }
  created (params) { }
  subscribe (params) { }
  methods (params) { }
  static createViewModel (Component) {
    return {
      createViewModel: function (params, componentInfo) {
        params.$el = componentInfo.element
        params.$templateNodes = componentInfo.templateNodes
        return new Component(params)
      }
    }
  }
}
export default Base
