export default function CustomerInfo() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
        <span className="w-8 h-8 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full flex items-center justify-center text-white font-bold mr-4 text-lg">
          3
        </span>
        Your Information
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-cream font-semibold mb-3 text-lg">
            Full Name *
            <input
              type="text"
              className="input-field w-full px-4 py-4 rounded-xl text-cream placeholder-cream/50 focus:outline-none text-lg"
              placeholder="Enter your full name"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-cream font-semibold mb-3 text-lg">
            Email Address *
            <input
              type="email"
              className="input-field w-full px-4 py-4 rounded-xl text-cream placeholder-cream/50 focus:outline-none text-lg"
              placeholder="your@email.com"
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-cream font-semibold mb-3 text-lg">
            Game *
            <select className="input-field w-full px-4 py-4 rounded-xl text-cream focus:outline-none text-lg bg-dark-custom-secondary">
              <option value="">Select your game</option>
              <option value="valorant">Valorant</option>
              <option value="league">League of Legends</option>
              <option value="csgo">CS2</option>
              <option value="rocket">Rocket League</option>
              <option value="overwatch">Overwatch 2</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block text-cream font-semibold mb-3 text-lg">
            Current Rank
            <input
              type="text"
              className="input-field w-full px-4 py-4 rounded-xl text-cream placeholder-cream/50 focus:outline-none text-lg"
              placeholder="e.g., Diamond 2, Gold 3"
            />
          </label>
        </div>
        <div className="md:col-span-2">
          <label className="block text-cream font-semibold mb-3 text-lg">
            Specific Areas to Focus On
            <textarea
              className="input-field w-full px-4 py-4 rounded-xl text-cream placeholder-cream/50 focus:outline-none text-lg h-32 resize-none"
              placeholder="Tell us what you'd like to improve (e.g., positioning, aim, game sense, team play...)"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
