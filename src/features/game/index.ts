// Game feature public API
// Export only what other features need

// Main component (for page routing)
export { default } from './pages/index'

// Game Components
export { default as GameCard } from './components/game-card'
export { default as GameModal } from './components/game-modal'
export { default as MyGamesSection } from './components/my-games-section'
export { default as CommunitySection } from './components/community-section'

// Game Detail Components
export * from './pages/detail'

// Hooks
export * from './hooks/use-saved-games'
export * from './hooks/use-filtered-communities'
export * from './hooks/use-available-games'

// Schema
export * from './schema'

// Types
export * from '@shared/types/game.types'
