// Game Stats feature public API
// Export only what other features need

// Game Components
export { default as GameCard } from './components/game-card'
export { default as GameModal } from './components/game-modal'
export { default as MyGamesSection } from './components/my-games-section'
export { default as CommunitySection } from './components/community-section'

// Game Detail Components
export * from './components/detail'

// Replay Analysis Components
export { default as CustomerInfo } from './components/customer-info'
export { default as FileUpload } from './components/file-upload'
export { default as HowItWorks } from './components/how-it-works'
export { default as OrderSummary } from './components/order-summary'
export { default as PackageSelection } from './components/package-selection'

// Hooks
export * from './components/hooks'

// Types
export * from '@shared/types/game.types'
