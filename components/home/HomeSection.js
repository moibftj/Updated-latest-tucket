'use client'

const HOME_LINKS = [
  {
    id: 'shared',
    title: 'Shared Trips',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    action: 'section',
  },
  {
    id: 'future',
    title: 'Future Trips',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
    action: 'section',
  },
  {
    id: 'mytrips',
    title: 'My Trips',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    action: 'section',
  },
  {
    id: 'new',
    title: 'New Trip Form',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400',
    action: 'newTrip',
  },
]

const TRIP_TIPS = [
  'Invite one friend who travels a lot—your feed gets 10× better',
  'Log what future-you will forget: links, prices, timings, and those tiny hacks',
  'Share trips with your circle only. No internet strangers.',
]

const QuickLinkCard = ({ title, image, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all h-48 bg-cover bg-center relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <span className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all flex items-center justify-center">
      <span className="text-2xl font-bold text-white">{title}</span>
    </span>
  </button>
)

const HomeSection = ({ user, onSelectSection, onNewTrip }) => (
  <div>
    <div className="mb-6 sm:mb-8 bg-gradient-to-r from-[#ff34ac]/10 via-white to-[#7dbbe5]/10 p-4 sm:p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome back, {user.name}</h2>
      <p className="text-sm sm:text-base text-gray-600">
        Time to plan with people you actually know. Your circle is here.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {HOME_LINKS.map(({ id, title, image, action }) => (
        <QuickLinkCard
          key={id}
          title={title}
          image={image}
          onClick={action === 'section' ? () => onSelectSection(id) : onNewTrip}
        />
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Trip Planning Tips</h3>
        <ul className="space-y-2 sm:space-y-3">
          {TRIP_TIPS.map((tip) => (
            <li key={tip} className="flex items-start">
              <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
              <span className="text-sm sm:text-base text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Your Circle</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-3">Quiet for now.</p>
        <p className="text-sm sm:text-base text-gray-600">
          Invite one friend who travels a lot—your feed gets 10× better.
        </p>
      </div>
    </div>
  </div>
)

export default HomeSection
