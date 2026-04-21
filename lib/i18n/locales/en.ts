import type { Translations } from '@/lib/i18n/types';

export const en: Translations = {
  // Login
  'login.hero.line1': 'Start your journey with SAA 2025.',
  'login.hero.line2': 'Log in to explore!',
  'login.button.text': 'LOGIN With Google',
  'login.button.loading': 'Logging in...',
  'login.error.supabase': 'Supabase is not configured. Please check .env.local file',
  'login.error.generic': 'An error occurred while logging in. Please try again.',

  // Common
  'common.footer.copyright': 'Copyright Sun* © 2025',
  'common.languageSelector.ariaLabel': 'Select language',
  'common.languageSelector.listAriaLabel': 'Available languages',

  // Navigation
  'nav.about': 'About SAA 2025',
  'nav.awards': 'Award Information',
  'nav.kudos': 'Sun* Kudos',

  // Profile
  'profile.ariaLabel': 'User menu',
  'profile.profile': 'Profile',
  'profile.signOut': 'Logout',
  'profile.adminDashboard': 'Admin Dashboard',

  // Notification
  'notification.ariaLabel': 'Notifications',
  'notification.unread': '({count} unread)',
  'notification.empty': 'No notifications',

  // Countdown
  'countdown.comingSoon': 'Coming soon',
  'countdown.days': 'Days',
  'countdown.hours': 'Hours',
  'countdown.minutes': 'Minutes',
  'countdown.ariaLabel': '{days} days, {hours} hours, {minutes} minutes until event',

  // Prelaunch
  'prelaunch.title': 'The event will start in',
  'prelaunch.comingSoon': 'Coming soon',
  'prelaunch.days': 'DAYS',
  'prelaunch.hours': 'HOURS',
  'prelaunch.minutes': 'MINUTES',
  'prelaunch.ariaLabel': '{days} days, {hours} hours, {minutes} minutes until event',

  // Event
  'event.time': 'Time:',
  'event.venue': 'Venue:',
  'event.venueValue': 'Au Co Art Center',
  'event.livestreamNote': 'Live broadcast via Livestream',

  // CTA
  'cta.aboutAwards': 'ABOUT AWARDS',
  'cta.aboutKudos': 'ABOUT KUDOS',

  // About — EN_PENDING: content team to provide official English translations
  'about.paragraph1': '[EN_PENDING] Facing the rapidly changing landscape of the AI era and increasingly demanding clients, Sun* has chosen a strategy of diversifying capabilities — not just striving to become the best in its field, but aiming higher, where every Sunner becomes a "problem-solver" — an expert in solving all challenges for projects, clients, and society.',
  'about.paragraph2': '[EN_PENDING] Inspired by diverse capabilities, flexible growth, and the spirit of digging deeper to break through in the AI era, "Root Further" was chosen as the official theme of the Sun* Annual Awards 2025 ceremony.',
  'about.paragraph3': '[EN_PENDING] Going beyond the surface meaning, "Root Further" is the journey of continuously reaching further, rooting stronger, touching the hidden "geological layers" to survive, rise, and nurture the ever-burning passion for creating value that defines Sun* people.',
  'about.paragraph4': '[EN_PENDING] Before storms, only trees with strong enough roots can stand firm. An organization with individuals who believe in diverse capabilities, ready to create and embrace challenges, and master change — is one that not only stands strong against turbulence but also leverages every advantage to conquer the challenges of the times.',
  'about.paragraph5': '[EN_PENDING] No one knows what lies deep within the "earth" of the modern technology industry and market — how many mysterious "geological layers" remain. We only know that when "Root Further" has become our core spirit, we will not fear, but feel excited before any uncharted territory on the journey forward.',
  'about.quote': '"A tree with deep roots fears no storm"',
  'about.quoteSubtitle': '(A tree with deep roots fears no storm - English proverb)',

  // Awards
  'awards.caption': 'Sun* annual awards 2025',
  'awards.title': 'Award System',
  'awards.description': 'Categories will be awarded to the TOP most outstanding individuals.',
  'awards.emptyState': 'Award categories will be announced soon.',
  'awards.detail': 'Details',

  // Kudos — EN_PENDING: content team to provide official English translation
  'kudos.badge': 'NEW IN SAA 2025',
  'kudos.subtitle': 'Recognition Movement',
  'kudos.title': 'Sun* Kudos',
  'kudos.description':
    '[EN_PENDING] A recognition and appreciation initiative for colleagues — happening for the first time for all Sunners. The initiative will launch in November 2025, encouraging Sun* people to share words of recognition and gratitude for colleagues through the system announced by the organizing committee. This will serve as input for the Heads Council to reference during the award selection process.',
  'kudos.detailButton': 'Details',

  // Footer
  'footer.about': 'About SAA 2025',
  'footer.awards': 'Award Information',
  'footer.kudos': 'Sun* Kudos',
  'footer.standards': 'Community Standards',

  // Prize System Page
  'prizePage.subtitle': 'Sun* Annual Awards 2025',
  'prizePage.title': 'SAA 2025 Award System',
  'prizePage.sidebar.ariaLabel': 'Award Categories',
  'prizePage.prizeCount.label': 'Number of prizes:',
  'prizePage.prizeValue.label': 'Prize value:',
  'prizePage.orDivider': 'Or',
  'prizePage.kudos.badge': 'NEW IN SAA 2025',
  'prizePage.kudos.label': 'Recognition Movement',
  'prizePage.kudos.title': 'Sun* Kudos',
  'prizePage.kudos.description':
    '[EN_PENDING] A recognition and appreciation initiative for colleagues — happening for the first time for all Sunners. The initiative will launch in November 2025, encouraging Sun* people to share words of recognition and gratitude for colleagues through the system announced by the organizing committee.',
  'prizePage.kudos.cta': 'Details',

  // Write Kudo Modal
  'writeKudo.title': 'Send appreciation and recognition to your teammate',
  'writeKudo.recipient.label': 'Recipient',
  'writeKudo.recipient.placeholder': 'Search',
  'writeKudo.recipient.noResults': 'No results found',
  'writeKudo.danhHieu.label': 'Title',
  'writeKudo.danhHieu.placeholder': 'Give a title to your teammate',
  'writeKudo.danhHieu.helperExample': 'Example: The person who motivates me.',
  'writeKudo.danhHieu.helperDisplay': 'The title will be displayed as your Kudos heading.',
  'writeKudo.content.placeholder': 'Write your appreciation message here!',
  'writeKudo.content.mentionHint': 'You can use "@ + name" to mention other colleagues',
  'writeKudo.content.communityStandards': 'Community Standards',
  'writeKudo.hashtag.label': 'Hashtag',
  'writeKudo.hashtag.add': 'Hashtag',
  'writeKudo.hashtag.max': 'Max 5',
  'writeKudo.hashtag.createNew': 'Create hashtag: #{input}',
  'writeKudo.image.label': 'Image',
  'writeKudo.image.add': 'Image',
  'writeKudo.image.max': 'Max 5',
  'writeKudo.anonymous.label': 'Send appreciation and recognition anonymously',
  'writeKudo.anonymous.namePlaceholder': 'Enter anonymous name',
  'writeKudo.cancel': 'Cancel',
  'writeKudo.submit': 'Send',
  'writeKudo.submitting': 'Sending...',
  'writeKudo.success': 'Kudo sent successfully!',
  'writeKudo.error': 'Failed to send Kudo. Please try again.',
  'writeKudo.validation.recipientRequired': 'Please select a recipient',
  'writeKudo.validation.titleRequired': 'Please enter a title',
  'writeKudo.validation.contentRequired': 'Please enter content',
  'writeKudo.validation.hashtagRequired': 'Please select at least 1 hashtag',
  'writeKudo.toolbar.bold': 'Bold',
  'writeKudo.toolbar.italic': 'Italic',
  'writeKudo.toolbar.strikethrough': 'Strikethrough',
  'writeKudo.toolbar.numberedList': 'Numbered list',
  'writeKudo.toolbar.link': 'Insert link',
  'writeKudo.toolbar.quote': 'Quote',

  // Live Board - Section Titles
  'liveBoard.kvTitle': 'Recognition and appreciation system',
  'liveBoard.highlightKudos': 'HIGHLIGHT KUDOS',
  'liveBoard.spotlightBoard': 'SPOTLIGHT BOARD',
  'liveBoard.allKudos': 'ALL KUDOS',
  'liveBoard.sectionSubtitle': 'Sun* Annual Awards 2025',

  // Live Board - CTA
  'liveBoard.cta.recognition': 'Today, who would you like to appreciate and recognize?',
  'liveBoard.cta.search': 'Search Sunner profile',

  // Live Board - Filters
  'liveBoard.filter.hashtag': 'Hashtag',
  'liveBoard.filter.department': 'Department',

  // Live Board - Stats
  'liveBoard.stats.kudosReceived': 'Kudos received:',
  'liveBoard.stats.kudosSent': 'Kudos sent:',
  'liveBoard.stats.heartsReceived': 'Hearts received:',
  'liveBoard.stats.secretBoxOpened': 'Secret Boxes opened:',
  'liveBoard.stats.secretBoxUnopened': 'Secret Boxes unopened:',
  'liveBoard.stats.openSecretBox': 'Open Secret Box',

  // Live Board - Leaderboard
  'liveBoard.leaderboard.title': '10 LATEST GIFT RECIPIENTS',
  'liveBoard.leaderboard.empty': 'No data available',

  // Live Board - Actions
  'liveBoard.action.copyLink': 'Copy Link',
  'liveBoard.action.viewDetail': 'View details',
  'liveBoard.action.like': 'Like',
  'liveBoard.action.unlike': 'Unlike',
  'liveBoard.action.linkCopied': 'Link copied — ready to share!',

  // Live Board - Empty States
  'liveBoard.empty.kudos': 'No Kudos available yet.',
  'liveBoard.empty.data': 'No data available',

  // Live Board - Spotlight
  'liveBoard.spotlight.search': 'Search',
  'liveBoard.spotlight.panZoom': 'Pan/Zoom',
  'liveBoard.spotlight.kudosCount': '{count} KUDOS',

  // Live Board - Star Rating Tooltip
  'liveBoard.starRating.tooltip1': '1 star: Sunner received 10 Kudos',
  'liveBoard.starRating.tooltip2': '2 stars: Sunner received 20 Kudos',
  'liveBoard.starRating.tooltip3': '3 stars: Sunner received 50 Kudos',

  // Live Board - Carousel
  'liveBoard.carousel.ariaLabel': 'Highlight Kudos carousel',
  'liveBoard.carousel.prevSlide': 'Previous slide',
  'liveBoard.carousel.nextSlide': 'Next slide',

  // Live Board - Errors
  'liveBoard.error.likeFailed': 'Could not like Kudo. Please try again.',
  'liveBoard.error.loadMore': 'Could not load more. Try again.',
};
