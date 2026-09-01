// Locale maintenance audit: compares RU_DICTS keys in packages/client/locale-ru
// against the en dictionary keys of every client locale namespace at current
// HEAD. Run after merging upstream updates to find keys needing translation.
import { readFileSync } from 'node:fs'

const ROOT = new URL('../', import.meta.url).pathname.replace(/^\/(\w:)/, '$1')
const read = (p) => readFileSync(ROOT + p, 'utf8')

/** Match a balanced object literal starting at the first { after `anchor`. */
function objectBody(src, anchor) {
  const at = src.search(anchor)
  if (at === -1) return null
  const open = src.indexOf('{', at)
  let depth = 0
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) return src.slice(open + 1, i)
    }
  }
  return null
}

/** Top-level keys of an object body (quoted or bare identifiers). */
function keys(body) {
  const out = new Set()
  for (const line of body.split('\n')) {
    const m = /^\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z_$][\w$]*))\s*:/.exec(line)
    if (m) out.add(m[1] ?? m[2] ?? m[3])
  }
  return out
}

// namespace -> [file, regex-of-en-export]
const SOURCES = {
  'common': ['packages/client/locale/src/locales/en.ts', /export const en\b/],
  'settings.locale': ['packages/client/locale/src/locales/settings.ts', /export const en\b/],
  'settings.agentPreset': ['packages/client/ui-agent-preset/src/client/locales.ts', /export const en\b/],
  'approval': ['packages/client/ui-approval/src/client/locales.ts', /export const en\b/],
  'command': ['packages/client/ui-commands/src/client/locales.ts', /export const en\b/],
  'conversation': ['packages/client/ui-conversation/src/client/locales.ts', /export const en\b/],
  'deliverables': ['packages/client/ui-deliverables/src/client/locales.ts', /export const en\b/],
  'goal': ['packages/client/ui-goal/src/client/locales.ts', /export const en\b/],
  'slash.menu': ['packages/client/ui-input-trigger/src/client/locales.ts', /export const en\b/],
  'job': ['packages/client/ui-jobs/src/client/locales.ts', /export const en\b/],
  'feedback': ['packages/client/ui-message-feedback/src/client/locales.ts', /export const en\b/],
  'model': ['packages/client/ui-model-selection/src/client/locales.ts', /export const en\b/],
  'settings.permission': ['packages/client/ui-permission-presets/src/client/locales.ts', /export const en\b/],
  'permission.access': ['packages/client/ui-permission-presets/src/client/locales.ts', /export const accessEn\b/],
  'plan': ['packages/client/ui-plan/src/client/locales.ts', /export const en\b/],
  'reference': ['packages/client/ui-reference/src/client/locales.ts', /export const en\b/],
  'schedule.catalog': ['packages/client/ui-schedule/src/client/locales.ts', /export const en\b/],
  'settings': ['packages/client/ui-settings-general/src/client/locales.ts', /export const en\b/],
  'settings.models': ['packages/client/ui-settings-models/src/client/locales.ts', /export const en\b/],
  'settings.pluginInventory': ['packages/client/ui-settings-plugin-inventory/src/client/locales.ts', /export const en\b/],
  'settings.plugins': ['packages/client/ui-settings-plugins/src/client/locales.ts', /export const en\b/],
  'sidebar': ['packages/client/ui-sidebar/src/client/locales.ts', /export const en\b/],
  'skill': ['packages/client/ui-skill/src/client/locales.ts', /export const en\b/],
  'subagent': ['packages/client/ui-subagent/src/client/locales.ts', /export const en\b/],
  'settings.theme': ['packages/client/ui-theme/src/client/locales.ts', /export const en\b/],
  'trajectory': ['packages/client/ui-trajectory/src/client/locales.ts', /export const en\b/],
  'question': ['packages/client/ui-user-questions/src/client/locales.ts', /export const en\b/],
  'workflowRun': ['packages/client/ui-workflow-run/src/client/locales.ts', /export const en\b/],
  'workspace': ['packages/client/ui-workspace/src/client/locales.ts', /export const en\b/],
  'agent-team': ['packages/experimental/client-ui-agent-team/src/client/locales.ts', /export const en\b/],
  'cordis': ['packages/extensions/ui-cordis/src/client/locales.ts', /export const en\b/],
  'session-log-download': ['packages/session-query/session-log-export/src/client/locales.ts', /export const en\b/],
  'chat': ['packages/client/ui-chat/src/client/locale.ts', /export const en\b/],
  'directory-browser': ['packages/client/ui-directory-picker-browse/src/client/index.ts', /\['en',\s*\{/],
}

const dictsSrc = read('packages/client/locale-ru/src/client/dicts.ts')
const ruBodies = {}
for (const ns of Object.keys(SOURCES)) {
  const m = objectBody(dictsSrc, new RegExp(`'${ns.replace(/\./g, '\\.')}':\\s*\\{`))
  ruBodies[ns] = m === null ? null : keys(m)
}

let issues = 0
for (const [ns, [file, anchor]] of Object.entries(SOURCES)) {
  let body
  try {
    body = objectBody(read(file), anchor)
  } catch {
    console.log(`?? ${ns}: source file not readable (${file})`)
    continue
  }
  if (body === null) {
    console.log(`?? ${ns}: en anchor not found in ${file}`)
    continue
  }
  const en = keys(body)
  const ru = ruBodies[ns] ?? new Set()
  const missing = [...en].filter((k) => !ru.has(k))
  const stale = [...ru].filter((k) => !en.has(k))
  if (missing.length || stale.length) {
    issues++
    console.log(`!! ${ns} (${file})`)
    if (missing.length) console.log(`   missing ru (${missing.length}): ${missing.join(', ')}`)
    if (stale.length) console.log(`   stale ru (${stale.length}): ${stale.join(', ')}`)
  }
}
console.log(issues === 0 ? 'ALL NAMESPACES COVERED' : `${issues} namespace(s) with issues`)
