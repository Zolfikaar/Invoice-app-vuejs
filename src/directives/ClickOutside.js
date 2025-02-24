const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideHandler = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event); // Calls the function passed to the directive
      }
    };
    document.addEventListener('mousedown', el.clickOutsideHandler);
  },
  unmounted(el) {
    document.removeEventListener('mousedown', el.clickOutsideHandler);
  }
};

export default clickOutside;