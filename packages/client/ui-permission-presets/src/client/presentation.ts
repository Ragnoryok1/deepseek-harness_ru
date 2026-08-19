/** Machine value of the preset that requires an explicit GUI risk gate. */
export const FULL_ACCESS_PRESET = 'danger-full-access'

/**
 * Convert conventional kebab-case preset names into user-facing title case.
 * @param name - host-supplied preset label or key.
 * @returns the title-cased conventional key, or a non-kebab label unchanged.
 */
export function displayPresetName(name: string): string {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) return name
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

/**
 * Render a permission preset under its product label.
 * @param value - preset machine value.
 * @param name - host-supplied preset name.
 * @param t - optional locale lookup for the known preset labels.
 * @returns the localized product label for known presets, otherwise the conventional display name.
 */
export function displayPermissionPreset(
  value: string,
  name: string,
  t?: (key: string) => string,
): string {
  switch (value) {
    case FULL_ACCESS_PRESET: return t?.('level.fullAccess') ?? 'Full access'
    case 'workspace-write': return t?.('level.workspaceWrite') ?? displayPresetName(name)
    case 'read-only': return t?.('level.readOnly') ?? 'Read Only'
    case 'custom': return t?.('level.custom') ?? 'Custom'
    default: return displayPresetName(name)
  }
}
