import { useEffect, useRef, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Arrow = ({ dark = false }: { dark?: boolean }) => <span className={`arrow ${dark ? 'arrow-dark' : ''}`}>↗</span>
const Mark = () => <span className="mark" aria-hidden="true"><i /><i /><i /></span>

function OperatingFlow() {
  const nodes = [
    ['01', 'ENQUIRY', 12, 30], ['02', 'RESPONSE', 32, 30], ['03', 'QUOTE', 52, 30],
    ['04', 'PAYMENT', 72, 30], ['05', 'FULFILMENT', 72, 70], ['06', 'INSIGHT', 52, 70],
  ]
  return <div className="flow-frame">
    <div className="flow-top"><span>VNT / SYSTEM MAP</span><span>OPERATING FLOW / 001</span></div>
    <svg className="flow-svg" viewBox="0 0 620 520" role="img" aria-label="A connected operating flow from customer enquiry to insight">
      <defs><linearGradient id="flowLine" x1="0" x2="1"><stop stopColor="#a7a7a7" stopOpacity=".25"/><stop offset=".45" stopColor="#f2f0ea"/><stop offset="1" stopColor="#a7a7a7" stopOpacity=".2"/></linearGradient></defs>
      <path className="flow-line flow-draw" d="M62 156 H186 H310 H434 V364 H310" fill="none" stroke="url(#flowLine)" strokeWidth="1.2" />
      <path className="flow-line flow-draw delay" d="M62 156 V364 H186 H310" fill="none" stroke="#f2f0ea" strokeOpacity=".35" strokeWidth="1" />
      <path className="signal" d="M62 156 H186 H310 H434 V364 H310" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="2 17" />
      {nodes.map(([num, label, x, y]) => <g key={label} className="flow-node" transform={`translate(${Number(x) * 6.2 - 18} ${Number(y) * 5.2 - 9})`}><rect width="52" height="20" fill="#222" stroke="#a7a7a7" strokeWidth=".6"/><text x="7" y="13" fill="#f2f0ea" fontSize="7" fontFamily="Arial">{num}</text><text x="22" y="13" fill="#aaa9a2" fontSize="6" fontFamily="Arial">{label}</text><circle cx="47" cy="10" r="2" fill="#f2f0ea"/></g>)}
    </svg>
    <div className="flow-bottom"><span>CONNECTED BY DESIGN</span><span>LIVE / READY</span></div>
  </div>
}

function GlassConsole() {
  return <div className="glass-console" aria-label="VANTOR operating system status">
    <div className="glass-console-top"><span><i className="live-dot" /> SYSTEM STATUS</span><span>VNT—LIVE</span></div>
    <div className="glass-console-main"><strong>COHERENT</strong><span>Operational pathways aligned</span></div>
    <div className="glass-console-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
    <div className="glass-console-bottom"><span>↑ 06 ACTIVE NODES</span><span>◎ 0 FRICTION EVENTS</span></div>
  </div>
}

function ImmersiveStory() {
  const fragments = ['MESSAGES', 'PRODUCT DATA', 'ORDERS', 'PAYMENTS', 'PEOPLE', 'FULFILMENT']
  return <section className="storyboard" id="story"><div className="story-copy"><div className="section-kicker light"><span>THE SHIFT</span><span>From friction to flow</span></div><h2>Make the complexity<br /><i>make sense.</i></h2><p>Most businesses don’t have one problem. They have a hundred small handoffs that never learned how to work together.</p><div className="story-progress"><span>01</span><span className="story-progress-line" /><span>03</span></div><div className="story-caption">Scroll to see the operation come into focus.</div></div><div className="story-viewport"><div className="story-pinned"><div className="story-meta"><span>VNT / OPERATIONAL LENS</span><span>SCROLL NARRATIVE / 001</span></div><div className="story-grid" /><div className="story-state story-chaos"><div className="story-state-title">FRAGMENTED ACTIVITY</div>{fragments.map((item, i) => <div className={`chaos-chip c${i}`} key={item}><span>0{i + 1}</span>{item}<b>+</b></div>)}<div className="story-question">Where does it go next?</div></div><div className="story-state story-connect"><div className="story-state-title">THE SYSTEM FINDS THE PATH</div><svg viewBox="0 0 500 360" aria-hidden="true"><path className="story-path path-a" d="M30 70 H150 L250 180 H470"/><path className="story-path path-b" d="M30 290 H150 L250 180 H470"/><path className="story-path path-c" d="M80 180 H250 H470"/><circle cx="250" cy="180" r="28"/><circle className="story-signal" cx="30" cy="180" r="4"/></svg><div className="story-system-core">VNT<br /><span>ENGINE</span></div></div><div className="story-state story-clear"><div className="story-state-title">ONE COHERENT OPERATION</div><div className="clear-route"><span>ENQUIRY</span><i>→</i><span>RESPONSE</span><i>→</i><span>PAYMENT</span><i>→</i><span>FULFILMENT</span></div><div className="clear-note">Every handoff has a next step.<br />Every improvement has a baseline.</div></div><div className="story-counter"><b>01</b><span>FRAGMENTED</span><b>02</b><span>CONNECTED</span><b>03</b><span>COHERENT</span></div></div></div></section>
}

function App() {
  const path = window.location.pathname
  if (path === '/privacy' || path === '/terms') return <LegalPage type={path.slice(1) as 'privacy' | 'terms'} />
  if (path === '/contact') return <ContactPage />
  const [menu, setMenu] = useState(false)
  const [activeStage, setActiveStage] = useState(2)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const engineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = engineRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root, start: 'top 78%', end: 'bottom 38%', scrub: 1.1 }
      })
      timeline.from('.orbit-ring', { scale: .35, opacity: 0, rotation: -90, duration: 1.2 })
        .from('.engine-core', { scale: .2, opacity: 0, rotation: -45, duration: .55 }, '-=.35')
        .from('.engine-node', { scale: .5, opacity: 0, y: 24, stagger: .16, duration: .7 }, '-=.2')
        .from('.engine-note', { x: 35, opacity: 0, duration: .6 }, '-=.1')
        .to('.orbit-ring', { rotation: 120, duration: 2.3, ease: 'none' }, '-=1.3')
      gsap.from('.stage', { y: 42, opacity: 0, stagger: .12, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.transformation', start: 'top 72%' } })
      gsap.from('.cap-row', { clipPath: 'inset(0 100% 0 0)', stagger: .16, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '#capabilities', start: 'top 68%' } })
      gsap.to('.hero-copy', { y: -110, opacity: .72, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-visual', { y: 95, rotate: 1.5, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.fragment').forEach((fragment, index) => gsap.to(fragment, { y: index % 2 ? -70 : 60, x: index % 3 === 0 ? 24 : -18, rotate: index % 2 ? -4 : 3, ease: 'none', scrollTrigger: { trigger: '.fragment-map', start: 'top bottom', end: 'bottom top', scrub: 1.2 } }))
      gsap.to('.storyboard', { backgroundPosition: '50% 100%', ease: 'none', scrollTrigger: { trigger: '.storyboard', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.to('.problem-grid', { y: -60, ease: 'none', scrollTrigger: { trigger: '.problem', start: 'top bottom', end: 'bottom top', scrub: 1 } })
      gsap.from('.problem-copy p', { x: 45, opacity: 0, stagger: .15, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.problem-copy', start: 'top 78%' } })
      gsap.fromTo('.workflow-rail', { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left center', ease: 'none', scrollTrigger: { trigger: '.workflow', start: 'top 72%', end: 'bottom 48%', scrub: true } })
      gsap.from('.ownership-visual', { x: -100, rotateY: 12, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.ownership', start: 'top 72%' } })
      gsap.from('.fit-tags span', { y: 25, opacity: 0, stagger: .09, duration: .5, ease: 'power2.out', scrollTrigger: { trigger: '.fit-tags', start: 'top 80%' } })
    }, root)
    return () => context.revert()
  }, [])
  const stages = [
    ['01', 'Customer enquiry', 'The first signal enters the system.'],
    ['02', 'Response & context', 'The right information reaches the right person.'],
    ['03', 'Quote or invoice', 'Commercial intent moves forward without repetition.'],
    ['04', 'Payment', 'The handoff is clear, tracked and accountable.'],
    ['05', 'Fulfilment', 'The promise becomes an action the team can see.'],
    ['06', 'Operational insight', 'The business learns from how it moves.'],
  ]
  const faqs = [
    ['What exactly does VANTOR do?', 'VANTOR designs, builds and operates intelligent systems around the way your business actually works. That can include software, integrations, automation and AI-powered capabilities.'],
    ['Is VANTOR a software product or a service?', 'VANTOR operates as a technology partner. We understand your workflows, design the right systems, deploy them into your business and remain involved in their operation and improvement.'],
    ['Does VANTOR replace the software we already use?', 'Not necessarily. We use existing tools where they serve the business, connect them where useful and engineer new capabilities where the gaps matter.'],
    ['Does VANTOR build custom systems?', 'Yes. Every engagement starts with the specific workflows, constraints and opportunities inside your business.'],
    ['Will we remain in control of our business data and accounts?', 'Yes. Access, permissions, documentation, data stewardship and handover expectations are deliberately designed before work begins.'],
    ['Does VANTOR continue maintaining systems after deployment?', 'Yes. The relationship does not end at deployment. We can remain involved to monitor, maintain and improve the system as the business evolves.'],
    ['Which types of businesses does VANTOR work with?', 'We are initially focused on owner-led and founder-led businesses with meaningful operational complexity, particularly retail, commerce and conversation-heavy businesses.'],
  ]
  return <div className="site-shell">
    <header className="nav"><a className="brand" href="#top"><Mark /><span>VANTOR</span></a><nav className={menu ? 'nav-links open' : 'nav-links'}><a href="#what">What we do</a><a href="#method">Our approach</a><a href="#fit">Who we work with</a><a href="#faq">FAQ</a></nav><a className="nav-cta" href="#contact">Start a conversation <Arrow /></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? 'Close' : 'Menu'}</button></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> Intelligent business systems <span className="eyebrow-rule" /></div><h1>Your business should <em>run</em> beautifully.</h1><p className="hero-intro">VANTOR designs, builds and operates intelligent systems that connect the moving parts of your business — making everyday operations easier to manage and growth easier to support.</p><div className="hero-actions"><a className="button" href="#contact">Transform your operations <Arrow /></a><a className="text-link" href="#what">Discover VANTOR <Arrow dark /></a></div><div className="hero-meta"><span>VNT—001</span><span>BUILD · OPERATE · EVOLVE</span><span>SCROLL TO EXPLORE ↓</span></div></div><div className="hero-visual"><OperatingFlow /><GlassConsole /></div></section>

      <section className="dark problem" id="what"><div className="section-kicker light"><span>01</span><span>The friction</span></div><div className="problem-grid"><h2>Growth creates complexity.<br /><span>Your systems should take it away.</span></h2><div className="problem-copy"><p>As a business grows, more tools, conversations, transactions and responsibilities enter the picture.</p><p>But connecting those moving parts often falls on the people running the business. Messages get missed. Work is repeated. Information becomes fragmented.</p><p className="highlight">VANTOR exists to change that.</p></div></div><div className="fragment-map"><div className="fragment-label">FRAGMENTED ACTIVITY / 006</div>{['MESSAGES','PRODUCT DATA','ORDERS','PAYMENTS','PEOPLE','FULFILMENT'].map((x, i) => <div className={`fragment f${i}`} key={x}><span>{x}</span><b>+</b></div>)}<div className="fragment-center">?</div></div></section>

      <section className="transformation"><div className="section-kicker"><span>02</span><span>The transformation</span></div><div className="section-head"><h2>From disconnected activity<br /><i>to one coherent operation.</i></h2><p>An illustrative workflow — showing how the right systems can give every handoff a clear next step.</p></div><div className="workflow"><div className="workflow-rail" />{stages.map(([num, title, desc], i) => <button key={num} className={`stage ${activeStage === i ? 'active' : ''}`} onClick={() => setActiveStage(i)}><span className="stage-num">{num}</span><span className="stage-title">{title}</span><span className="stage-desc">{desc}</span><span className="stage-plus">+</span></button>)}</div></section>

      <section className="capabilities dark" id="capabilities"><div className="section-kicker light"><span>03</span><span>What VANTOR does</span></div><div className="cap-header"><h2>We build the systems<br /><span>behind a better-running business.</span></h2><p>There is no separate system to learn. We make the business itself more coherent.</p></div><div className="cap-list">{[['01','Understand','We study how your business operates, where processes become difficult and which problems are worth solving.'],['02','Engineer','We design and build the software, integrations, automations and intelligent workflows your business needs.'],['03','Operate','We deploy, monitor and maintain those systems so they remain reliable as your business evolves.'],['04','Improve','We identify new opportunities to reduce friction, improve performance and make operations more effective.']].map(([n,t,d]) => <div className="cap-row" key={n}><span className="cap-num">{n}</span><h3>{t}</h3><p>{d}</p><Arrow /></div>)}</div></section>

      <section className="method" id="method"><div className="section-kicker"><span>04</span><span>The VANTOR method</span></div><div className="method-head"><h2>Find the friction.<br /><i>Engineer the improvement.</i><br />Measure the difference.</h2><p>Our friction-to-value engine is a continuous loop for making a business easier to run.</p></div><div className="engine" ref={engineRef}><div className="engine-orbit"><div className="orbit-ring" /><div className="engine-core"><Mark /><span>VNT<br />ENGINE</span></div>{[['01','MAP'],['02','IDENTIFY'],['03','RESOLVE'],['04','VERIFY']].map(([n,t], i) => <div className={`engine-node en${i}`} key={t}><b>{n}</b><span>{t}</span></div>)}</div><div className="engine-note"><span className="note-mark">↳</span><p>Every intervention begins with a baseline. Every improvement earns its place by proving its value.</p></div></div></section>

      <section className="ownership"><div className="ownership-visual"><div className="own-top">VNT / ARCHITECTURE</div><div className="own-diagram"><div className="own-v">V</div>{['CRM','COMMERCE','PEOPLE','FINANCE','DATA'].map((x, i) => <span className={`own-label ol${i}`} key={x}>{x}</span>)}<div className="own-lines" /></div><div className="own-bottom">YOUR BUSINESS / YOUR SYSTEM</div></div><div className="ownership-copy"><div className="section-kicker"><span>05</span><span>Built around your business</span></div><h2>Technology should adapt to your business.<br /><i>Not the other way around.</i></h2><p>Your business has its own workflows, relationships, rules and priorities. VANTOR designs systems around the way your business operates, using existing tools where appropriate and engineering new capabilities where necessary.</p><ul><li>Your business data remains yours.</li><li>Access and permissions are deliberately designed.</li><li>Systems are documented and portable.</li><li>Operational continuity matters.</li></ul></div></section>

      <section className="fit dark" id="fit"><div className="section-kicker light"><span>06</span><span>Who we work with</span></div><div className="fit-layout"><h2>For businesses<br /><i>ready to operate differently.</i></h2><div className="fit-copy"><p>We work best with owner-led and founder-led businesses where growth has outpaced the way work moves.</p><div className="fit-tags"><span>RETAIL & SOCIAL COMMERCE</span><span>FASHION & BEAUTY</span><span>ELECTRONICS</span><span>CONVERSATION-HEAVY TEAMS</span></div><p className="fit-small">A meaningful volume of enquiries. Repetitive administrative work. Multiple disconnected tools. An owner ready to invest in better systems.</p></div></div></section>

      <section className="process"><div className="section-kicker"><span>07</span><span>How we work</span></div><div className="process-head"><h2>A technology partner,<br /><i>from first insight to continuous improvement.</i></h2><p>The relationship does not end at deployment.</p></div><div className="process-grid">{[['01','Discover','We learn how the business operates and understand the problems worth solving.'],['02','Design','We map the workflows and architect a system around the business.'],['03','Deploy','We build, integrate, test and introduce the solution into the operational environment.'],['04','Operate','We monitor, maintain and improve the system as the business evolves.']].map(([n,t,d]) => <div className="process-item" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>

      <section className="faq" id="faq"><div className="section-kicker"><span>08</span><span>Clear answers</span></div><div className="faq-layout"><h2>Questions worth<br /><i>asking.</i></h2><div className="faq-list">{faqs.map(([q,a], i) => <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{q}</span><b>{openFaq === i ? '−' : '+'}</b></button>{openFaq === i && <p>{a}</p>}</div>)}</div></div></section>

      <section className="contact dark" id="contact"><div className="contact-mark"><Mark /><span>VNT / 009</span></div><div className="contact-copy"><div className="section-kicker light"><span>09</span><span>Start a conversation</span></div><h2>Let's make your<br /><i>business easier to run.</i></h2><p>Tell us how your business currently operates, where things become difficult and what you would like to improve.</p><a className="button light-button" href="mailto:hello@vantor.systems">Start a conversation <Arrow dark /></a></div><div className="contact-corner">VANTOR / INTELLIGENT BUSINESS SYSTEMS<br />BUSINESS, WITHOUT THE FRICTION.</div></section>
    </main>
    <footer className="footer"><div className="footer-brand"><a className="brand" href="#top"><Mark /><span>VANTOR</span></a><p>Intelligent business systems.<br />Business, without the friction.</p></div><div className="footer-links"><a href="#what">What we do</a><a href="#method">Our approach</a><a href="#fit">Who we work with</a><a href="#contact">Contact</a></div><div className="footer-meta"><span>BUILD · OPERATE · EVOLVE</span><span>© {new Date().getFullYear()} VANTOR</span></div></footer>
  </div>
}

function RouteShell({ children }: { children: ReactNode }) {
  return <div className="route-shell"><header className="route-nav"><a className="brand" href="/"><Mark /><span>VANTOR</span></a><a className="text-link" href="/">← Back to home</a></header>{children}<footer className="route-footer">VANTOR / INTELLIGENT BUSINESS SYSTEMS</footer></div>
}

function ContactPage() {
  return <RouteShell><main className="route-main"><div className="section-kicker"><span>CONTACT / 001</span><span>Start a conversation</span></div><h1>Tell us where your<br /><em>business gets stuck.</em></h1><p className="route-intro">We would like to understand how your business operates, what is creating unnecessary friction and where better systems could make a difference.</p><form className="contact-form" action="mailto:hello@vantor.systems" method="post" encType="text/plain"><label>Full name<input name="full_name" required /></label><label>Business name<input name="business_name" required /></label><label>Work email<input type="email" name="email" required /></label><label>Business type<input name="business_type" /></label><label className="full-field">What would you like to improve?<textarea name="improvement_goal" rows={5} required /></label><button className="button" type="submit">Send enquiry <Arrow /></button></form><p className="form-note">Submitted information is used only to respond to your enquiry. Read our <a href="/privacy">privacy policy</a>.</p></main></RouteShell>
}

function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const privacy = type === 'privacy'
  return <RouteShell><main className="route-main legal"><div className="section-kicker"><span>VANTOR / {privacy ? 'PRIVACY' : 'TERMS'}</span><span>Last updated November 2026</span></div><h1>{privacy ? <>Privacy, by<br /><em>design.</em></> : <>Clear terms for<br /><em>clear work.</em></>}</h1><p className="route-intro">{privacy ? 'This page explains what information VANTOR may receive when you contact us and how we use it.' : 'These terms describe the basis on which VANTOR provides information and services through this website.'}</p><div className="legal-copy"><h2>{privacy ? 'Information we receive' : 'Using this website'}</h2><p>We collect information you choose to provide, such as your name, business details, email address and the contents of your enquiry. We use it to understand your request and respond to you.</p><h2>{privacy ? 'How we handle it' : 'Our services'}</h2><p>We minimise access to enquiry information and do not sell it. Any future service engagement will be governed by separate written terms that set out scope, ownership, confidentiality and responsibilities.</p><h2>{privacy ? 'Questions' : 'Contact'}</h2><p>For questions about this page, contact <a href="mailto:hello@vantor.systems">hello@vantor.systems</a>.</p></div></main></RouteShell>
}

export default App
