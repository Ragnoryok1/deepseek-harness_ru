/** `command` namespace dictionaries (the popupSelect shell's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'search.placeholder': '搜索…',
  'search.aria': '筛选选项',
  'status.loading': '正在加载选项…',
  'status.applying': '正在应用…',
  'status.empty': '无选项',
  'overlay.aria': '/{command} 选项',
  'listbox.aria': '/{command} 匹配项',
  'notice.imagesUnsupported': '/{command} 不接受图片附件，请先移除图片',
  'cmd.compact': '压缩较早的对话历史',
  'cmd.export': '将此会话日志下载为 ZIP 归档',
  'cmd.feedback': '记录关于此会话的反馈',
  'cmd.goal': '设置或查看长期任务的目标',
  'cmd.permission': '切换权限预设（沙箱模式与批准策略）',
  'cmd.plan': '进入或退出计划模式',
} satisfies Record<string, string>

/** The command namespace key union. */
export type CommandKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'search.placeholder': 'Search…',
  'search.aria': 'Filter options',
  'status.loading': 'Loading options…',
  'status.applying': 'Applying…',
  'status.empty': 'No options',
  'overlay.aria': '/{command} options',
  'listbox.aria': '/{command} matches',
  'notice.imagesUnsupported': '/{command} does not accept image attachments; remove them first',
  'cmd.compact': 'Compact older conversation history',
  'cmd.export': 'Download this Session log as a ZIP archive',
  'cmd.feedback': 'record feedback about this session',
  'cmd.goal': 'set or view the goal for a long-running task',
  'cmd.permission': 'Switch the permission preset (sandbox mode + approval policy)',
  'cmd.plan': 'Enter or leave plan mode',
} satisfies Record<CommandKey, string>

/** Russian dictionary, checked complete against the zh key set. */
export const ru = {
  'search.placeholder': 'Поиск…',
  'search.aria': 'Фильтр вариантов',
  'status.loading': 'Загрузка вариантов…',
  'status.applying': 'Применение…',
  'status.empty': 'Нет вариантов',
  'overlay.aria': 'Варианты /{command}',
  'listbox.aria': 'Совпадения /{command}',
  'notice.imagesUnsupported': '/{command} не принимает изображения; сначала удалите их',
  'cmd.compact': 'Сжать давнюю историю диалога',
  'cmd.export': 'Скачать журнал этой сессии в ZIP-архиве',
  'cmd.feedback': 'Оставить отзыв об этой сессии',
  'cmd.goal': 'Задать или посмотреть цель длительной задачи',
  'cmd.permission': 'Сменить пресет разрешений (песочница и политика одобрений)',
  'cmd.plan': 'Войти в режим плана или выйти из него',
} satisfies Record<CommandKey, string>
