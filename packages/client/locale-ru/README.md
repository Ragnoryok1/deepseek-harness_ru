---
description: "Russian (ru) language pack for the web GUI, registered as an external client language through the locale language-pack contract."
kind: "package-reference"
---

# @deepseek-ai/dsh-client-locale-ru

English | [中文](README.zh.md)

## Summary

`dsh-client-locale-ru` adds **Russian** as a selectable language for the web GUI, contributed as an external client language pack. It calls `ctx.locale.addLanguage({ id: 'ru', label: 'Русский', fallback: 'en' })` and registers a `ru` dictionary for every client locale namespace, so the UI copy switches to Russian immediately after the user picks it in Settings → General.

The package is a client plugin: it activates with the client tree and registers the language plus dictionaries as effects, so unloading the plugin removes them. It owns nothing model-facing and carries no persistence of its own — the locale preference and fallback chain are handled by `@deepseek-ai/dsh-client-locale`.

Use this package wherever the GUI should be available in Russian. It is the fork's mechanism for shipping RU on top of upstream, which pairs `zh`/`en` built-ins with an extensible language-pack contract (`addLanguage` + per-locale `register`).

### Choosing Russian

Open Settings → General and select **Русский**. `<html lang>` points at `ru`, dictionary lookups first consult `ru` per namespace, then `en` (the configured fallback), so only keys missing from a Russian dictionary fall back to English. The choice persists as `locale.preference` on a loopback page.

```js
// usage: plugin activation already registers the language and dictionaries.
// Nothing to configure.
```

## Use this package

The plugin registers its contribution on activation. To contribute additional Russian text for an external namespace, call `ctx.locale.register(ns, 'ru', {...})` in the namespace's own plugin (see the locale README language-pack pattern).

### Language-pack registration

```js
export const inject = ['locale']

export function apply(ctx) {
  ctx.effect(() => ctx.locale.addLanguage({ id: 'ru', label: 'Русский', fallback: 'en' }), 'locale-ru: language')
  ctx.effect(() => ctx.locale.register('common', 'ru', { cancel: 'Отмена', close: 'Закрыть' }), 'locale-ru: common dictionary')
}
```

## Known Limitations and Deferred Work

- **Registry-held text reads its translation once** — copy captured at registration time outside the slot render path keeps its registered language until re-registration.
- **Plural rules are not contributed** — the registry supplies selection, persistence, browser matching, key fallback, and `<html lang>`; it does not add Russian plural rules. Very short Russian phrases are authored per key.
- **Coverage follows upstream keys** — new or renamed upstream namespace keys require a matching Russian entry; an absent key falls back to English rather than breaking.
- **No invariant is published** — the language and dictionaries have no independent runtime source to compare against; registration disposal and fallback are asserted by the locale package's behavior specs.

## Model Experience

None, as the locale package is a browser-side UI plugin layer that registers nothing model-facing.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.
