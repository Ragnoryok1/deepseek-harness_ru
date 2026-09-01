// Locale maintenance sync: relocates ru translations across renamed locale
// keys. For every namespace, reads the current English dictionary at HEAD and
// the English/ru dictionaries from a base commit (default: the branch point
// the dictionaries were last synced against), and reuses a ru value wherever
// the English text is unchanged under a different key. Prints what still needs
// hand translation; rewrites dicts.ts with the merged data. Run after merging
// upstream updates, then run locale-ru-audit.mjs to confirm coverage.
// Usage: node scripts/locale-ru-sync.mjs [base-ref]
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const ROOT = new URL('../', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const OLD = process.argv[2] ?? 'ed89580ab3'
const read = (p) => readFileSync(ROOT + p, 'utf8')
const show = (file) => execFileSync('git', ['show', `${OLD}:${file}`], { encoding: 'utf8' })

/** Evaluate an exported object literal (`export const NAME = {...} ...`) to a plain object. */
function evalObject(src, name) {
  const at = src.search(new RegExp(`export const ${name}\\b[^=\\n]*=`))
  if (at === -1) return null
  const brace = src.indexOf('{', src.indexOf('=', at))
  let depth = 0
  let end = -1
  let inStr = null
  for (let i = brace; i < src.length; i++) {
    const ch = src[i]
    if (inStr) {
      if (ch === '\\') i++
      else if (ch === inStr) inStr = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }
  if (end === -1) return null
  const literal = src.slice(brace, end + 1)
  const consts = [...src.matchAll(/^const ([A-Z][\w$]*) = (['"`][^\n]*?['"`])$/gm)]
    .map((m) => `const ${m[1]} = ${m[2]};`)
    .join('\n')
  try {
    return new Function(`${consts}\nreturn (${literal});`)()
  } catch {
    try {
      return new Function(`return (${literal});`)()
    } catch {
      return null
    }
  }
}

/** namespace -> [head file, head en export, old file, old ru export] */
const MAP = {
  'common': ['packages/client/locale/src/locales/en.ts', 'en', null, null],
  'settings.locale': ['packages/client/locale/src/locales/settings.ts', 'en', 'packages/client/locale/src/locales/settings.ts', 'ru'],
  'settings.agentPreset': ['packages/client/ui-agent-preset/src/client/locales.ts', 'en', 'packages/client/ui-agent-preset/src/client/locales.ts', 'ru'],
  'approval': ['packages/client/ui-approval/src/client/locales.ts', 'en', null, null],
  'command': ['packages/client/ui-commands/src/client/locales.ts', 'en', 'packages/client/ui-commands/src/client/locales.ts', 'ru'],
  'conversation': ['packages/client/ui-conversation/src/client/locales.ts', 'en', 'packages/client/ui-conversation/src/client/locales.ts', 'ru'],
  'deliverables': ['packages/client/ui-deliverables/src/client/locales.ts', 'en', 'packages/client/ui-deliverables/src/client/locales.ts', 'ru'],
  'goal': ['packages/client/ui-goal/src/client/locales.ts', 'en', 'packages/client/ui-goal/src/client/locales.ts', 'ru'],
  'slash.menu': ['packages/client/ui-input-trigger/src/client/locales.ts', 'en', 'packages/client/ui-input-trigger/src/client/locales.ts', 'ru'],
  'job': ['packages/client/ui-jobs/src/client/locales.ts', 'en', 'packages/client/ui-jobs/src/client/locales.ts', 'ru'],
  'feedback': ['packages/client/ui-message-feedback/src/client/locales.ts', 'en', 'packages/client/ui-message-feedback/src/client/locales.ts', 'ru'],
  'model': ['packages/client/ui-model-selection/src/client/locales.ts', 'en', 'packages/client/ui-model-selection/src/client/locales.ts', 'ru'],
  'settings.permission': ['packages/client/ui-permission-presets/src/client/locales.ts', 'en', 'packages/client/ui-permission-presets/src/client/locales.ts', 'ru'],
  'permission.access': ['packages/client/ui-permission-presets/src/client/locales.ts', 'accessEn', null, null],
  'plan': ['packages/client/ui-plan/src/client/locales.ts', 'en', 'packages/client/ui-plan/src/client/locales.ts', 'ru'],
  'reference': ['packages/client/ui-reference/src/client/locales.ts', 'en', 'packages/client/ui-reference/src/client/locales.ts', 'ru'],
  'schedule.catalog': ['packages/client/ui-schedule/src/client/locales.ts', 'en', null, null],
  'settings': ['packages/client/ui-settings-general/src/client/locales.ts', 'en', 'packages/client/ui-settings-general/src/client/locales.ts', 'ru'],
  'settings.models': ['packages/client/ui-settings-models/src/client/locales.ts', 'en', 'packages/client/ui-settings-models/src/client/locales.ts', 'ru'],
  'settings.pluginInventory': ['packages/client/ui-settings-plugin-inventory/src/client/locales.ts', 'en', 'packages/client/ui-settings-plugin-inventory/src/client/locales.ts', 'ru'],
  'settings.plugins': ['packages/client/ui-settings-plugins/src/client/locales.ts', 'en', 'packages/client/ui-settings-plugins/src/client/locales.ts', 'ru'],
  'sidebar': ['packages/client/ui-sidebar/src/client/locales.ts', 'en', 'packages/client/ui-sidebar/src/client/locales.ts', 'ru'],
  'skill': ['packages/client/ui-skill/src/client/locales.ts', 'en', 'packages/client/ui-skill/src/client/locales.ts', 'ru'],
  'subagent': ['packages/client/ui-subagent/src/client/locales.ts', 'en', 'packages/client/ui-subagent/src/client/locales.ts', 'ru'],
  'settings.theme': ['packages/client/ui-theme/src/client/locales.ts', 'en', 'packages/client/ui-theme/src/client/locales.ts', 'ru'],
  'trajectory': ['packages/client/ui-trajectory/src/client/locales.ts', 'en', 'packages/client/ui-trajectory/src/client/locales.ts', 'ru'],
  'question': ['packages/client/ui-user-questions/src/client/locales.ts', 'en', 'packages/client/ui-user-questions/src/client/locales.ts', 'ru'],
  'workflowRun': ['packages/client/ui-workflow-run/src/client/locales.ts', 'en', 'packages/client/ui-workflow-run/src/client/locales.ts', 'ru'],
  'workspace': ['packages/client/ui-workspace/src/client/locales.ts', 'en', 'packages/client/ui-workspace/src/client/locales.ts', 'ru'],
  'agent-team': ['packages/experimental/client-ui-agent-team/src/client/locales.ts', 'en', null, null],
  'cordis': ['packages/extensions/ui-cordis/src/client/locales.ts', 'en', 'packages/extensions/ui-cordis/src/client/locales.ts', 'ru'],
  'session-log-download': ['packages/session-query/session-log-export/src/client/locales.ts', 'en', 'packages/session-query/session-log-export/src/client/locales.ts', 'ru'],
  'chat': ['packages/client/ui-chat/src/client/locale.ts', 'en', null, null],
  'directory-browser': ['packages/client/ui-directory-picker-browse/src/client/index.ts', null, null, null],
}

const dictsSrc = read('packages/client/locale-ru/src/client/dicts.ts')
const current = evalObject(dictsSrc, 'RU_DICTS')

const cache = new Map()
const evalCached = (key, fn) => {
  if (!cache.has(key)) cache.set(key, fn())
  return cache.get(key)
}

const needs = []
const merged = {}
for (const [ns, [headFile, headExport, oldFile, oldExport]] of Object.entries(MAP)) {
  const headEn = headExport === null ? null : evalObject(read(headFile), headExport)
  const existing = current[ns] ?? {}
  if (headEn === null) {
    merged[ns] = { ...existing }
    continue
  }
  // old en text -> old ru text, for relocating renames.
  let valueMap = new Map()
  if (oldFile !== null) {
    const oldSrc = evalCached(oldFile, () => show(oldFile))
    const oldRu = evalCached(`${oldFile}#${oldExport}`, () => evalObject(oldSrc, oldExport))
    const oldEn = evalCached(`${oldFile}#${headExport}`, () => evalObject(oldSrc, headExport))
    if (oldRu !== null && oldEn !== null) {
      for (const [k, v] of Object.entries(oldEn)) {
        if (oldRu[k] !== undefined) valueMap.set(String(v), oldRu[k])
      }
    }
  }
  const final = {}
  for (const k of Object.keys(headEn)) {
    if (existing[k] !== undefined) {
      final[k] = existing[k]
      continue
    }
    const reused = valueMap.get(String(headEn[k]))
    if (reused !== undefined) final[k] = reused
    else needs.push([ns, k, String(headEn[k])])
  }
  merged[ns] = final
}

const lines = [
  '/**',
  ' * Russian (ru) dictionaries, one entry per locale namespace.',
  ' * Key sets mirror each namespace\'s zh/en dictionaries at the profiled',
  ' * base commit; any key added upstream later falls back to en at lookup.',
  ' */',
  '',
  "export const RU_LABEL = 'Русский'",
  '',
  'export const RU_DICTS: Record<string, Record<string, string>> = {',
]
for (const ns of Object.keys(MAP)) {
  const dict = merged[ns]
  if (dict === undefined || Object.keys(dict).length === 0) continue
  lines.push(`  '${ns}': {`)
  for (const [k, v] of Object.entries(dict)) {
    lines.push(`    ${JSON.stringify(k)}: ${JSON.stringify(v)},`)
  }
  lines.push('  },')
}
lines.push('}', '')
writeFileSync(ROOT + 'packages/client/locale-ru/src/client/dicts.ts', lines.join('\n'))

const byNs = new Map()
for (const [ns, k, v] of needs) {
  if (!byNs.has(ns)) byNs.set(ns, [])
  byNs.get(ns).push([k, v])
}
console.log('STILL UNTRANSLATED:')
for (const [ns, items] of byNs) {
  console.log(`## ${ns} (${items.length})`)
  for (const [k, v] of items) console.log(`  ${k} = ${v}`)
}
console.log(`total: ${needs.length}`)
