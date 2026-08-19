/** `trajectory` namespace dictionaries (view tab label + toolbar strings). */

/** Dictionary namespace owned by this plugin. */
export const NS = 'trajectory'

/** The trajectory dictionary key set (the source of truth for both locales). */
export type TrajectoryKey =
  | 'view.trajectory'
  | 'toolbar.aria'
  | 'toolbar.duration'
  | 'toolbar.useActualDuration'
  | 'toolbar.useEqualWidth'
  | 'toolbar.actualTime'
  | 'toolbar.turns'
  | 'toolbar.expandTurns'
  | 'toolbar.collapseTurns'
  | 'toolbar.calls'
  | 'toolbar.expandCalls'
  | 'toolbar.collapseCalls'
  | 'toolbar.search'
  | 'toolbar.searchPlaceholder'
  | 'lane.input'
  | 'lane.model'
  | 'lane.tools'
  | 'timeline.aria'
  | 'timeline.overview.aria'
  | 'timeline.empty'
  | 'tooltip.total'
  | 'tooltip.started'
  | 'tooltip.ttft'
  | 'tooltip.decoding'
  | 'earlier.loading'
  | 'earlier.loadingAria'
  | 'earlier.clickToLoad'
  | 'earlier.loadAria'
  | 'table.started'
  | 'table.totalDuration'
  | 'table.ttft'
  | 'table.generation'
  | 'table.throughput'
  | 'table.timingSource'
  | 'table.notAvailable'
  | 'table.sessionTimestamps'
  | 'table.sessionTimestampsRunning'
  | 'table.metric.notRecorded'
  | 'table.metric.stepStartUnavailable'
  | 'table.metric.pending'
  | 'table.metric.firstTokenUnavailable'
  | 'table.metric.usageUnavailable'
  | 'table.metric.outputTokensUnavailable'
  | 'table.metric.durationTooShort'
  | 'table.openSummary.title'
  | 'table.openSummary.blockAria'
  | 'table.blockLabel'
  | 'table.thinking'
  | 'table.toolCallOnly'
  | 'table.noContent'
  | 'table.noPayloadCaptured'
  | 'table.noResultCaptured'
  | 'table.resultJson'
  | 'table.openImage.title'
  | 'table.eventDetails.aria'
  | 'table.resizeDetails.aria'
  | 'table.resizeHint.title'
  | 'table.closeDetails.aria'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The trajectory view tab label and toolbar strings. */
    'trajectory': TrajectoryKey
  }
}

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh: Record<TrajectoryKey, string> = {
  'view.trajectory': '轨迹',
  'toolbar.aria': '轨迹工具栏',
  'toolbar.duration': 'Duration',
  'toolbar.useActualDuration': 'Use actual duration',
  'toolbar.useEqualWidth': 'Use equal-width operations',
  'toolbar.actualTime': '实际时间',
  'toolbar.turns': 'Turns',
  'toolbar.expandTurns': 'Expand turns',
  'toolbar.collapseTurns': 'Collapse turns',
  'toolbar.calls': 'Calls',
  'toolbar.expandCalls': 'Expand calls',
  'toolbar.collapseCalls': 'Collapse calls',
  'toolbar.search': '搜索轨迹',
  'toolbar.searchPlaceholder': '搜索',
  'lane.input': '输入',
  'lane.model': '模型',
  'lane.tools': '工具',
  'timeline.aria': '轨迹时间线',
  'timeline.overview.aria': '时间线总览；水平拖动以聚焦事件',
  'timeline.empty': '无时序数据',
  'tooltip.total': '总计 {duration}',
  'tooltip.started': '开始 {time}',
  'tooltip.ttft': 'TTFT {duration}',
  'tooltip.decoding': '解码 {duration}',
  'earlier.loading': '正在加载更早的历史…',
  'earlier.loadingAria': '正在加载更早的历史',
  'earlier.clickToLoad': '点击加载更早的历史',
  'earlier.loadAria': '加载更早的历史',
  'table.started': '开始',
  'table.totalDuration': '总时长',
  'table.ttft': 'TTFT',
  'table.generation': '生成',
  'table.throughput': '吞吐量',
  'table.timingSource': '时序来源',
  'table.notAvailable': '不可用',
  'table.sessionTimestamps': '会话时间戳',
  'table.sessionTimestampsRunning': '会话时间戳（运行中）',
  'table.metric.notRecorded': '未记录',
  'table.metric.stepStartUnavailable': '步骤开始时间不可用',
  'table.metric.pending': '等待中',
  'table.metric.firstTokenUnavailable': '首个 token 时间不可用',
  'table.metric.usageUnavailable': '用量数据不可用',
  'table.metric.outputTokensUnavailable': '输出 token 数不可用',
  'table.metric.durationTooShort': '时长过短',
  'table.openSummary.title': '打开调用摘要',
  'table.openSummary.blockAria': '打开第 #{number} 个块的调用摘要',
  'table.blockLabel': '块 #{number} {type}',
  'table.thinking': '思考中',
  'table.toolCallOnly': '仅工具调用',
  'table.noContent': '无内容',
  'table.noPayloadCaptured': '未捕获输入',
  'table.noResultCaptured': '未捕获结果',
  'table.resultJson': '结果 JSON',
  'table.openImage.title': '打开图片',
  'table.eventDetails.aria': '事件详情',
  'table.resizeDetails.aria': '调整事件详情大小',
  'table.resizeHint.title': '拖动调整大小，双击重置',
  'table.closeDetails.aria': '关闭详情',
}

/** English dictionary. */
export const en: Record<TrajectoryKey, string> = {
  'view.trajectory': 'Trajectory',
  'toolbar.aria': 'Trajectory toolbar',
  'toolbar.duration': 'Duration',
  'toolbar.useActualDuration': 'Use actual duration',
  'toolbar.useEqualWidth': 'Use equal-width operations',
  'toolbar.actualTime': 'Actual time',
  'toolbar.turns': 'Turns',
  'toolbar.expandTurns': 'Expand turns',
  'toolbar.collapseTurns': 'Collapse turns',
  'toolbar.calls': 'Calls',
  'toolbar.expandCalls': 'Expand calls',
  'toolbar.collapseCalls': 'Collapse calls',
  'toolbar.search': 'Search trajectory',
  'toolbar.searchPlaceholder': 'Search',
  'lane.input': 'Input',
  'lane.model': 'Model',
  'lane.tools': 'Tools',
  'timeline.aria': 'Trajectory timeline',
  'timeline.overview.aria': 'Timeline overview; drag horizontally to focus events',
  'timeline.empty': 'No timing data',
  'tooltip.total': 'Total {duration}',
  'tooltip.started': 'Started {time}',
  'tooltip.ttft': 'TTFT {duration}',
  'tooltip.decoding': 'Decoding {duration}',
  'earlier.loading': 'Loading earlier history…',
  'earlier.loadingAria': 'Loading earlier history',
  'earlier.clickToLoad': 'Click to load earlier history',
  'earlier.loadAria': 'Load earlier history',
  'table.started': 'Started',
  'table.totalDuration': 'Total duration',
  'table.ttft': 'TTFT',
  'table.generation': 'Generation',
  'table.throughput': 'Throughput',
  'table.timingSource': 'Timing source',
  'table.notAvailable': 'Not available',
  'table.sessionTimestamps': 'Session timestamps',
  'table.sessionTimestampsRunning': 'Session timestamps (running)',
  'table.metric.notRecorded': 'Not recorded',
  'table.metric.stepStartUnavailable': 'Step start unavailable',
  'table.metric.pending': 'Pending',
  'table.metric.firstTokenUnavailable': 'First token unavailable',
  'table.metric.usageUnavailable': 'Usage unavailable',
  'table.metric.outputTokensUnavailable': 'Output tokens unavailable',
  'table.metric.durationTooShort': 'Duration too short',
  'table.openSummary.title': 'Open tool call summary',
  'table.openSummary.blockAria': 'Open Block #{number} tool call summary',
  'table.blockLabel': 'Block #{number} {type}',
  'table.thinking': 'Thinking',
  'table.toolCallOnly': 'Tool call only',
  'table.noContent': 'No content',
  'table.noPayloadCaptured': 'No payload captured',
  'table.noResultCaptured': 'No result captured',
  'table.resultJson': 'Result JSON',
  'table.openImage.title': 'Open image',
  'table.eventDetails.aria': 'Event details',
  'table.resizeDetails.aria': 'Resize event details',
  'table.resizeHint.title': 'Drag to resize. Double-click to reset.',
  'table.closeDetails.aria': 'Close details',
}

/** Russian dictionary. */
export const ru: Record<TrajectoryKey, string> = {
  'view.trajectory': 'Траектория',
  'toolbar.aria': 'Панель траектории',
  'toolbar.duration': 'Длительность',
  'toolbar.useActualDuration': 'Фактическая длительность',
  'toolbar.useEqualWidth': 'Равная ширина операций',
  'toolbar.actualTime': 'Фактическое время',
  'toolbar.turns': 'Раунды',
  'toolbar.expandTurns': 'Развернуть раунды',
  'toolbar.collapseTurns': 'Свернуть раунды',
  'toolbar.calls': 'Вызовы',
  'toolbar.expandCalls': 'Развернуть вызовы',
  'toolbar.collapseCalls': 'Свернуть вызовы',
  'toolbar.search': 'Поиск по траектории',
  'toolbar.searchPlaceholder': 'Поиск',
  'lane.input': 'Ввод',
  'lane.model': 'Модель',
  'lane.tools': 'Инструменты',
  'timeline.aria': 'Таймлайн траектории',
  'timeline.overview.aria': 'Обзор таймлайна; перетаскивайте по горизонтали, чтобы фокусироваться на событиях',
  'timeline.empty': 'Нет данных о времени',
  'tooltip.total': 'Всего: {duration}',
  'tooltip.started': 'Начало: {time}',
  'tooltip.ttft': 'TTFT {duration}',
  'tooltip.decoding': 'Декодирование: {duration}',
  'earlier.loading': 'Загрузка более ранней истории…',
  'earlier.loadingAria': 'Загрузка более ранней истории',
  'earlier.clickToLoad': 'Нажмите, чтобы загрузить более раннюю историю',
  'earlier.loadAria': 'Загрузить более раннюю историю',
  'table.started': 'Начало',
  'table.totalDuration': 'Общая длительность',
  'table.ttft': 'TTFT',
  'table.generation': 'Генерация',
  'table.throughput': 'Пропускная способность',
  'table.timingSource': 'Источник времени',
  'table.notAvailable': 'Недоступно',
  'table.sessionTimestamps': 'Метки времени сессии',
  'table.sessionTimestampsRunning': 'Метки времени сессии (выполняется)',
  'table.metric.notRecorded': 'Не записано',
  'table.metric.stepStartUnavailable': 'Недоступно время начала шага',
  'table.metric.pending': 'Ожидает',
  'table.metric.firstTokenUnavailable': 'Недоступно время первого токена',
  'table.metric.usageUnavailable': 'Данные об использовании недоступны',
  'table.metric.outputTokensUnavailable': 'Недоступно число выходных токенов',
  'table.metric.durationTooShort': 'Длительность слишком мала',
  'table.openSummary.title': 'Открыть сводку вызова',
  'table.openSummary.blockAria': 'Открыть сводку вызова блока #{number}',
  'table.blockLabel': 'Блок #{number} {type}',
  'table.thinking': 'Рассуждение',
  'table.toolCallOnly': 'Только вызов инструмента',
  'table.noContent': 'Нет содержимого',
  'table.noPayloadCaptured': 'Ввод не зафиксирован',
  'table.noResultCaptured': 'Результат не зафиксирован',
  'table.resultJson': 'Результат JSON',
  'table.openImage.title': 'Открыть изображение',
  'table.eventDetails.aria': 'Детали события',
  'table.resizeDetails.aria': 'Изменить размер панели деталей',
  'table.resizeHint.title': 'Перетащите, чтобы изменить размер. Двойной клик — сброс.',
  'table.closeDetails.aria': 'Закрыть детали',
}
