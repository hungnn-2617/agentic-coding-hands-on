export type Locale = 'vi' | 'en';

export type TranslationKey =
  // Login
  | 'login.hero.line1'
  | 'login.hero.line2'
  | 'login.button.text'
  | 'login.button.loading'
  | 'login.error.supabase'
  | 'login.error.generic'
  // Common
  | 'common.footer.copyright'
  | 'common.languageSelector.ariaLabel'
  | 'common.languageSelector.listAriaLabel'
  // Navigation
  | 'nav.about'
  | 'nav.awards'
  | 'nav.kudos'
  // Profile
  | 'profile.ariaLabel'
  | 'profile.profile'
  | 'profile.signOut'
  | 'profile.adminDashboard'
  // Notification
  | 'notification.ariaLabel'
  | 'notification.unread'
  | 'notification.empty'
  // Countdown
  | 'countdown.comingSoon'
  | 'countdown.days'
  | 'countdown.hours'
  | 'countdown.minutes'
  | 'countdown.ariaLabel'
  // Prelaunch
  | 'prelaunch.title'
  | 'prelaunch.comingSoon'
  | 'prelaunch.days'
  | 'prelaunch.hours'
  | 'prelaunch.minutes'
  | 'prelaunch.ariaLabel'
  // Event
  | 'event.time'
  | 'event.venue'
  | 'event.venueValue'
  | 'event.livestreamNote'
  // CTA
  | 'cta.aboutAwards'
  | 'cta.aboutKudos'
  // About
  | 'about.paragraph1'
  | 'about.paragraph2'
  | 'about.paragraph3'
  | 'about.paragraph4'
  | 'about.paragraph5'
  | 'about.quote'
  | 'about.quoteSubtitle'
  // Awards
  | 'awards.caption'
  | 'awards.title'
  | 'awards.description'
  | 'awards.emptyState'
  | 'awards.detail'
  // Kudos
  | 'kudos.badge'
  | 'kudos.subtitle'
  | 'kudos.title'
  | 'kudos.description'
  | 'kudos.detailButton'
  // Footer
  | 'footer.about'
  | 'footer.awards'
  | 'footer.kudos'
  | 'footer.standards'
  // Prize System Page
  | 'prizePage.subtitle'
  | 'prizePage.title'
  | 'prizePage.sidebar.ariaLabel'
  | 'prizePage.prizeCount.label'
  | 'prizePage.prizeValue.label'
  | 'prizePage.orDivider'
  | 'prizePage.kudos.badge'
  | 'prizePage.kudos.label'
  | 'prizePage.kudos.title'
  | 'prizePage.kudos.description'
  | 'prizePage.kudos.cta'
  // Live Board - Section Titles
  | 'liveBoard.kvTitle'
  | 'liveBoard.highlightKudos'
  | 'liveBoard.spotlightBoard'
  | 'liveBoard.allKudos'
  | 'liveBoard.sectionSubtitle'
  // Live Board - CTA
  | 'liveBoard.cta.recognition'
  | 'liveBoard.cta.search'
  // Live Board - Filters
  | 'liveBoard.filter.hashtag'
  | 'liveBoard.filter.department'
  // Live Board - Stats
  | 'liveBoard.stats.kudosReceived'
  | 'liveBoard.stats.kudosSent'
  | 'liveBoard.stats.heartsReceived'
  | 'liveBoard.stats.secretBoxOpened'
  | 'liveBoard.stats.secretBoxUnopened'
  | 'liveBoard.stats.openSecretBox'
  // Live Board - Leaderboard
  | 'liveBoard.leaderboard.title'
  | 'liveBoard.leaderboard.empty'
  // Live Board - Actions
  | 'liveBoard.action.copyLink'
  | 'liveBoard.action.viewDetail'
  | 'liveBoard.action.like'
  | 'liveBoard.action.unlike'
  | 'liveBoard.action.linkCopied'
  // Live Board - Empty States
  | 'liveBoard.empty.kudos'
  | 'liveBoard.empty.data'
  // Live Board - Spotlight
  | 'liveBoard.spotlight.search'
  | 'liveBoard.spotlight.panZoom'
  | 'liveBoard.spotlight.kudosCount'
  // Live Board - Star Rating
  | 'liveBoard.starRating.tooltip1'
  | 'liveBoard.starRating.tooltip2'
  | 'liveBoard.starRating.tooltip3'
  // Live Board - Carousel
  | 'liveBoard.carousel.ariaLabel'
  | 'liveBoard.carousel.prevSlide'
  | 'liveBoard.carousel.nextSlide'
  // Live Board - Errors
  | 'liveBoard.error.likeFailed'
  | 'liveBoard.error.loadMore'
  // Live Board - Search
  | 'liveBoard.searchPlaceholder'
  | 'liveBoard.noSearchResults'
  | 'liveBoard.searchHint'
  // Write Kudo Modal
  | 'writeKudo.title'
  | 'writeKudo.recipient.label'
  | 'writeKudo.recipient.placeholder'
  | 'writeKudo.recipient.noResults'
  | 'writeKudo.danhHieu.label'
  | 'writeKudo.danhHieu.placeholder'
  | 'writeKudo.danhHieu.helperExample'
  | 'writeKudo.danhHieu.helperDisplay'
  | 'writeKudo.content.placeholder'
  | 'writeKudo.content.mentionHint'
  | 'writeKudo.content.communityStandards'
  | 'writeKudo.hashtag.label'
  | 'writeKudo.hashtag.add'
  | 'writeKudo.hashtag.max'
  | 'writeKudo.hashtag.createNew'
  | 'writeKudo.image.label'
  | 'writeKudo.image.add'
  | 'writeKudo.image.max'
  | 'writeKudo.anonymous.label'
  | 'writeKudo.anonymous.namePlaceholder'
  | 'writeKudo.cancel'
  | 'writeKudo.submit'
  | 'writeKudo.submitting'
  | 'writeKudo.success'
  | 'writeKudo.error'
  | 'writeKudo.validation.recipientRequired'
  | 'writeKudo.validation.titleRequired'
  | 'writeKudo.validation.contentRequired'
  | 'writeKudo.validation.hashtagRequired'
  | 'writeKudo.toolbar.bold'
  | 'writeKudo.toolbar.italic'
  | 'writeKudo.toolbar.strikethrough'
  | 'writeKudo.toolbar.numberedList'
  | 'writeKudo.toolbar.link'
  | 'writeKudo.toolbar.quote';

export type Translations = Record<TranslationKey, string>;

export type TranslationParams = Record<string, string | number>;
