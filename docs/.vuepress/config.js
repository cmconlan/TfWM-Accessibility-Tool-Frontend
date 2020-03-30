module.exports = {
  themeConfig: {
    logo: '/assets/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Services', link: '/services/' },
      { text: 'Store', link: '/store/' },
      { text: 'Components', link: '/components/' },
      { text: 'Tests', link: '/tests/' },
      { text: 'Repository', link: 'https://github.com/cmconlan/TfWM-Accessibility-Tool-Frontend' }
    ],
    sidebar: {
      '/services/': [
        ''
      ],
      '/store/': [
        '',
        'metaStore',
        'parameterStore',
        'mapStore'
      ],
      '/components/': [
        '',
        'root',
        'Header',
        'PageContent',
        'Map',
        'LeftSidebar',
        'RightSidebar',
        'FilterHeader',
        'PopulationMetric',
        'DemographicFilter',
        'PointsOfInterest',
        'TimeStrata',
        'AccessibilityMetric'
      ],
      '/tests/': [
        ''
      ],
      '/': [
        ''
      ],
    },
    lastUpdated: 'Last Updated',
    displayAllHeaders: true
  },
  base: '/docs/frontend/'
}
