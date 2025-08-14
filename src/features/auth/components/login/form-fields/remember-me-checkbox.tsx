'use client'

/**
 * Remember Me Checkbox Component
 * Checkbox for persistent login session
 */
export const RememberMeCheckbox = () => (
  <label
    htmlFor="rememberMe"
    className="flex items-center space-x-2 cursor-pointer"
  >
    <input
      id="rememberMe"
      name="rememberMe"
      type="checkbox"
      className="w-4 h-4 rounded border-cream/30 bg-dark-secondary text-custom-primary focus:ring-custom-primary focus:ring-2"
    />
    <span className="text-cream/70 text-sm">Remember me</span>
  </label>
)
