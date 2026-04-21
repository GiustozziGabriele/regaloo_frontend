import * as bootstrap from 'bootstrap'

export default {
  mounted(el, binding) {
    el.setAttribute('data-bs-toggle', 'tooltip')
    el.setAttribute('data-bs-title', binding.value)

    new bootstrap.Tooltip(el)
  }
}