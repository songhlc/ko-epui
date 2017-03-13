const currency = {
  update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
    // This will be called once when the binding is first applied to an element,
    // and again whenever any observables/computeds that are accessed change
    // Update the DOM element based on the supplied values here.
    element.innerHTML = '$:' + valueAccessor()()
  }
}

export default currency
