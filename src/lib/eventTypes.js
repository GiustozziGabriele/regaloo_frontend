
const year = new Date().getFullYear()

export const eventTypes = [
  { value: 'birthday',   icon: '🎂', label: 'Compleanno', bg: '#FFF3E0',
    defaultTitle: (year) => `Compleanno ${year}`,
    defaultDate:  (year, user) => user?.birthday ?? '' },

  { value: 'christmas',  icon: '🎄', label: 'Natale',     bg: '#E8F5E9',
    defaultTitle: (year) => `Natale ${year}`,
    defaultDate:  (year) => `25/12/${year}` },

  { value: 'graduation', icon: '🎓', label: 'Laurea',     bg: '#E3F2FD',
    defaultTitle: (year) => `Laurea ${year}`,
    defaultDate:  () => '' },

  { value: 'wedding',    icon: '💍', label: 'Matrimonio', bg: '#FCE4EC',
    defaultTitle: (year) => `Matrimonio ${year}`,
    defaultDate:  () => '' },

  { value: 'other',      icon: '✨', label: 'Altro',      bg: '#F3E5F5',
    defaultTitle: () => '',
    defaultDate:  () => '' },
]

// mappa per accesso rapido per value
export const eventTypeMap = Object.fromEntries(
  eventTypes.map(t => [t.value, t])
)
