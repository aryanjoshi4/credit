import { useMemo, useState } from 'react'
import amexPlatinumImage from './assets/amex-platinum.png'
import chaseSapphirePreferredImage from './assets/chase-sapphire-preferred.png'
import './App.css'

const offers = [
  {
    id: 1,
    issuer: 'American Express',
    card: 'Platinum Card',
    network: 'AMEX',
    reward: 'Up to 175,000',
    rewardType: 'POINTS',
    value: '$1,750',
    spend: '$12,000',
    timeframe: '6 months',
    annualFee: '$895',
    category: 'Travel',
    color: 'amex',
    initials: 'A',
    productImage: amexPlatinumImage,
    tag: 'PREMIUM PICK',
    description: 'Premium travel & lifestyle rewards',
  },
  {
    id: 2,
    issuer: 'Chase',
    card: 'Sapphire Preferred',
    network: 'VISA',
    reward: '75,000',
    rewardType: 'POINTS',
    value: '$750',
    spend: '$5,000',
    timeframe: '3 months',
    annualFee: '$95',
    category: 'Travel',
    color: 'chase',
    initials: 'C',
    productImage: chaseSapphirePreferredImage,
    tag: 'POPULAR',
    description: 'Flexible travel rewards',
  },
  {
    id: 3,
    issuer: 'Capital One',
    card: 'Venture Rewards',
    network: 'VISA',
    reward: '75,000',
    rewardType: 'MILES',
    value: '$750',
    spend: '$4,000',
    timeframe: '3 months',
    annualFee: '$95',
    category: 'Travel',
    color: 'capital-one',
    initials: 'C1',
    tag: '',
    description: 'Miles made simple',
  },
  {
    id: 4,
    issuer: 'Citi',
    card: 'Strata Premier',
    network: 'MASTERCARD',
    reward: '70,000',
    rewardType: 'POINTS',
    value: '$700',
    spend: '$4,000',
    timeframe: '3 months',
    annualFee: '$95',
    category: 'Travel',
    color: 'citi',
    initials: 'C',
    tag: 'LIMITED TIME',
    description: 'Everyday earning, elevated',
  },
  {
    id: 5,
    issuer: 'Discover',
    card: 'it Cash Back',
    network: 'DISCOVER',
    reward: '$200',
    rewardType: 'CASH BACK',
    value: '$200',
    spend: '$1,000',
    timeframe: '3 months',
    annualFee: '$0',
    category: 'Cash back',
    color: 'discover',
    initials: 'D',
    tag: 'NO ANNUAL FEE',
    description: 'Cash back with no annual fee',
  },
  {
    id: 6,
    issuer: 'Bank of America',
    card: 'Travel Rewards',
    network: 'VISA',
    reward: '25,000',
    rewardType: 'POINTS',
    value: '$250',
    spend: '$1,000',
    timeframe: '90 days',
    annualFee: '$0',
    category: 'Travel',
    color: 'boa',
    initials: 'B',
    tag: '',
    description: 'No-fee travel, your way',
  },
]

const categories = ['All cards', 'Travel', 'Dining', 'Cash back']

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (name === 'search') {
    return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
  }
  if (name === 'bookmark') {
    return <svg {...common}><path d="M6.5 4.8A1.8 1.8 0 0 1 8.3 3h7.4a1.8 1.8 0 0 1 1.8 1.8V21L12 17.3 6.5 21V4.8Z" /></svg>
  }
  if (name === 'arrow') {
    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  }
  if (name === 'sparkle') {
    return <svg {...common}><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></svg>
  }
  if (name === 'chevron') {
    return <svg {...common}><path d="m7 10 5 5 5-5" /></svg>
  }
  return null
}

function OfferCard({ offer, saved, onToggleSave }) {
  return (
    <article className="offer-card">
      <div className={`card-art card-art--${offer.color}${offer.productImage ? ' card-art--image' : ''}`}>
        {offer.productImage ? (
          <img className="card-art__image" src={offer.productImage} alt={`${offer.issuer} ${offer.card}`} />
        ) : (
          <>
            <div className="card-art__top">
              <span className="issuer-mark">{offer.initials}</span>
              <span className="card-network">{offer.network}</span>
            </div>
            <span className="card-art__name">{offer.issuer}</span>
            <span className="card-art__product">{offer.card}</span>
            <span className="card-art__chip" aria-hidden="true"><i /><i /><i /><i /></span>
          </>
        )}
      </div>
      <div className="offer-card__content">
        <div className="offer-card__heading">
          <div>
            <p className="offer-card__issuer">{offer.issuer}</p>
            <h3>{offer.card}</h3>
          </div>
          <button
            className={`save-button${saved ? ' save-button--active' : ''}`}
            type="button"
            aria-label={saved ? `Remove ${offer.card} from saved cards` : `Save ${offer.card}`}
            aria-pressed={saved}
            onClick={() => onToggleSave(offer.id)}
          >
            <Icon name="bookmark" size={17} />
          </button>
        </div>
        <p className="offer-description">{offer.description}</p>
        <div className="reward-block">
          <div>
            <span className="eyebrow">WELCOME OFFER</span>
            <p className="reward-amount">{offer.reward} <span>{offer.rewardType}</span></p>
          </div>
          <span className="value-pill">≈ {offer.value} value</span>
        </div>
        <div className="offer-details">
          <div><span>Spend</span><strong>{offer.spend}</strong></div>
          <div><span>In</span><strong>{offer.timeframe}</strong></div>
          <div><span>Annual fee</span><strong>{offer.annualFee}</strong></div>
        </div>
        <a className="offer-link" href="#how-it-works">
          View offer <Icon name="arrow" size={16} />
        </a>
      </div>
      {offer.tag && <span className="offer-tag">{offer.tag}</span>}
    </article>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All cards')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('Featured')
  const [savedOffers, setSavedOffers] = useState([])
  const [showSaved, setShowSaved] = useState(false)

  const filteredOffers = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = offers.filter((offer) => {
      const matchesCategory = activeCategory === 'All cards' || offer.category === activeCategory
      const matchesSearch = !query || `${offer.issuer} ${offer.card} ${offer.category} ${offer.rewardType}`.toLowerCase().includes(query)
      const matchesSaved = !showSaved || savedOffers.includes(offer.id)
      return matchesCategory && matchesSearch && matchesSaved
    })

    if (sortOrder === 'Highest offer') {
      return [...filtered].sort((a, b) => Number(b.reward.replace(/\D/g, '')) - Number(a.reward.replace(/\D/g, '')))
    }
    if (sortOrder === 'Lowest annual fee') {
      return [...filtered].sort((a, b) => Number(a.annualFee.replace(/\D/g, '')) - Number(b.annualFee.replace(/\D/g, '')))
    }
    return filtered
  }, [activeCategory, savedOffers, search, showSaved, sortOrder])

  function toggleSaved(id) {
    setSavedOffers((current) => (
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
    ))
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Pointwise home">
          <span className="brand-mark"><Icon name="sparkle" size={19} /></span>
          <span>pointwise<span className="brand-period">.</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link nav-link--active" href="#offers">Explore cards</a>
          <a className="nav-link" href="#how-it-works">How it works</a>
        </nav>
        <button
          className={`saved-nav${showSaved ? ' saved-nav--active' : ''}`}
          type="button"
          onClick={() => {
            setShowSaved((current) => !current)
            document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <Icon name="bookmark" size={16} />
          <span>Saved</span>
          {savedOffers.length > 0 && <span className="saved-count">{savedOffers.length}</span>}
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="status-dot" /> YOUR NEXT REWARD STARTS HERE</div>
            <h1>Good cards.<br />Great <span>getaways.</span></h1>
            <p className="hero-description">Find the right credit card offer for the way you live, spend, and travel.</p>
            <a className="hero-cta" href="#offers">Explore card offers <Icon name="arrow" size={17} /></a>
            <div className="hero-note"><span className="note-stars">✳</span> Compare rewards, not just annual fees.</div>
          </div>
          <div className="hero-art" aria-label="American Express Platinum and Chase Sapphire Preferred cards">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <div className="hero-stamp">POINTS<br />TO PLACES</div>
            <div className="hero-card hero-card--back">
              <img src={chaseSapphirePreferredImage} alt="" />
            </div>
            <div className="hero-card hero-card--front">
              <img src={amexPlatinumImage} alt="" />
            </div>
            <span className="hero-orbit-label">✦ &nbsp; YOUR NEXT ADVENTURE</span>
          </div>
          <div className="hero-index">01 <span /> 03</div>
        </section>

        <section className="offers-section" id="offers">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE GOOD STUFF</span>
              <h2>{showSaved ? 'Your saved cards' : 'Offers worth a look'}<span className="heading-period">.</span></h2>
              <p className="section-description">
                {showSaved ? 'Your shortlist, all in one place.' : 'A few standout welcome offers to get you started.'}
              </p>
            </div>
            <div className="offer-count"><span>{filteredOffers.length.toString().padStart(2, '0')}</span> OFFERS</div>
          </div>

          <div className="filter-toolbar">
            <div className="category-tabs" role="group" aria-label="Filter by card category">
              {categories.map((category) => (
                <button
                  className={`category-tab${activeCategory === category ? ' category-tab--active' : ''}`}
                  type="button"
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setShowSaved(false)
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="toolbar-actions">
              <label className="search-box">
                <Icon name="search" size={17} />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search cards"
                  aria-label="Search cards"
                />
              </label>
              <label className="sort-select">
                <span className="sr-only">Sort offers</span>
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option>Featured</option>
                  <option>Highest offer</option>
                  <option>Lowest annual fee</option>
                </select>
                <Icon name="chevron" size={15} />
              </label>
            </div>
          </div>

          {filteredOffers.length > 0 ? (
            <div className="offer-grid">
              {filteredOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  saved={savedOffers.includes(offer.id)}
                  onToggleSave={toggleSaved}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon"><Icon name={showSaved ? 'bookmark' : 'search'} size={22} /></span>
              <h3>{showSaved ? 'No saved cards yet' : 'No cards found'}</h3>
              <p>{showSaved ? 'Save an offer you like and it will show up here.' : 'Try a different search or category.'}</p>
              {showSaved && <button type="button" onClick={() => setShowSaved(false)}>Explore all offers</button>}
            </div>
          )}
          <p className="offer-disclaimer">Welcome offers are subject to issuer eligibility and may change. Reward values are estimates; review the issuer’s terms before applying.</p>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-intro">
            <span className="section-kicker">A LITTLE MORE CLARITY</span>
            <h2>Make your points<br />go <span>further.</span></h2>
            <p>Picking a card shouldn’t feel like homework. Start with what matters to you.</p>
          </div>
          <div className="how-steps">
            <article className="how-step">
              <span className="step-number">01</span>
              <div><h3>Find your kind of reward</h3><p>Compare points, miles, and cash back in one place.</p></div>
              <Icon name="arrow" size={18} />
            </article>
            <article className="how-step">
              <span className="step-number">02</span>
              <div><h3>Know what it takes</h3><p>See the spending requirement and annual fee up front.</p></div>
              <Icon name="arrow" size={18} />
            </article>
            <article className="how-step">
              <span className="step-number">03</span>
              <div><h3>Choose what fits</h3><p>Save your favorites and decide on your own time.</p></div>
              <Icon name="arrow" size={18} />
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand brand--footer" href="#"><span className="brand-mark"><Icon name="sparkle" size={17} /></span><span>pointwise<span className="brand-period">.</span></span></a>
        <span>Make every point count.</span>
        <span className="footer-disclaimer">Please use credit responsibly. Terms and eligibility vary by issuer.</span>
      </footer>
    </div>
  )
}

export default App
