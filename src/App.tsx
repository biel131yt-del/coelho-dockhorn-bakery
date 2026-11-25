import { useEffect, useRef, useState, type ReactNode, type TouchEvent } from "react";
import { Wheat, Leaf, Clock, MapPin, CalendarDays, Instagram, MessageCircle, Menu, X, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import hero from "./assets/hero-breads.jpg";
import sourdough from "./assets/sourdough.jpg";
import rustic from "./assets/rustic-onion.jpg";
import brioche from "./assets/brioche.jpg";
import folhados from "./assets/folhados.jpg";

const PHONE = "5551982356921";
const wa = (msg?: string) => `https://wa.me/${PHONE}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
const WA_ORDER = wa("Olá! Vi o site da Coelho & Dockhorn e gostaria de fazer uma encomenda.");
const INSTAGRAM = "https://www.instagram.com/coelhodockhorn/";
const MAPS = "https://www.google.com/maps/place/Coelho+%26+Dockhorn+Fine+Bakery/@-29.9195836,-51.1967257,17z";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    el.classList.add("will-reveal");
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const btnGold = "inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-lg";
const btnOutline = "inline-flex items-center justify-center gap-2 rounded-sm border border-foreground/40 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex flex-col leading-none">
      <span className={`font-serif text-2xl font-semibold ${light ? "text-espresso-foreground" : "text-foreground"}`}>Coelho <span className="text-primary">&amp;</span> Dockhorn</span>
      <span className="mt-1 text-[0.6rem] tracking-[0.45em] text-primary">FINE BAKERY</span>
    </a>
  );
}

const nav = [["Início", "#inicio"], ["Vitrine Artesanal", "#vitrine"], ["Agenda de Feiras", "#agenda"], ["Encomendas", "#encomendas"]] as const;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }} className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/80 py-3 backdrop-blur-md" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}<span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href={WA_ORDER} target="_blank" rel="noreferrer" className="rounded-sm bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover">Encomendar</a>
        </nav>
        <button ref={menuButton} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-nav" className="menu-button lg:hidden" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      <div id="mobile-nav" hidden={!open} className="lg:hidden">
        <nav aria-label="Navegação principal" className="mx-5 mt-3 flex flex-col gap-4 rounded-sm border border-border bg-background/95 p-6 backdrop-blur-md">
          {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-serif text-xl">{l}</a>)}
          <a href={WA_ORDER} target="_blank" rel="noreferrer" className={btnGold}>Encomendar</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="animate-fade-up inline-flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.3em] text-primary-hover">
            <span className="h-px w-10 bg-primary" />PANIFICAÇÃO ARTESANAL &amp; EMPÓRIO GOURMET
          </p>
          <h1 className="animate-fade-up mt-6 font-serif text-4xl leading-[1.08] font-medium sm:text-5xl lg:text-[4.2rem]" style={{ animationDelay: "150ms" }}>
            Pães artesanais <em>feitos com tempo.</em>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg" style={{ animationDelay: "300ms" }}>
            Pães de fermentação natural, folhados e receitas autorais feitos à mão. Estamos nas feiras de Canoas e recebemos encomendas pelo WhatsApp.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row" style={{ animationDelay: "450ms" }}>
            <a href="#vitrine" className={btnGold}>Ver produtos <ArrowRight className="h-4 w-4" /></a>
            <a href={WA_ORDER} target="_blank" rel="noreferrer" className={btnOutline}><MessageCircle className="h-4 w-4" /> Encomendar pelo WhatsApp</a>
          </div>
        </div>
        <div className="animate-fade-up relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "250ms" }}>
          <div className="absolute -inset-4 translate-x-3 translate-y-3 rounded-t-full border border-primary/60 md:-inset-5" />
          <div className="relative overflow-hidden rounded-t-full shadow-2xl">
            <img src={hero} alt="Pães de fermentação natural e croissants recém-saídos do forno" width={1024} height={1280} fetchPriority="high" className="animate-slow-zoom aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const active = produtos[index];
  const isPlaying = !paused && !hovered && !focused && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    let timer: number | undefined;
    function schedule() {
      window.clearTimeout(timer);
      if (!document.hidden) timer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % produtos.length);
      }, 6700);
    }
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [index, isPlaying]);

  function move(delta: number) {
    setIndex((current) => (current + delta + produtos.length) % produtos.length);
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  }

  return (
    <section className="product-carousel bg-espresso text-espresso-foreground"
      aria-label="Destaques da vitrine" aria-roledescription="carrossel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => { touchStart.current = null; }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
      <div className="carousel-inner mx-auto max-w-7xl px-5 md:px-8">
        <div className="carousel-label"><Wheat size={17} aria-hidden="true" /> Na vitrine</div>
        <div className="carousel-window" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
          <a className="carousel-slide" href={`#${active.id}`}>
            <img key={active.id} src={active.img} width={56} height={56} alt="" />
            <span key={active.id + "-caption"} className="carousel-caption">
              <span className="carousel-name">{active.name}</span>
              <span className="carousel-summary">{active.short}</span>
            </span>
            <ArrowRight className="carousel-link-arrow" size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="carousel-controls" role="group" aria-label="Controles do carrossel">
          <button type="button" aria-label="Produto anterior" onClick={() => move(-1)}><ChevronLeft size={19} aria-hidden="true" /></button>
          <div className="carousel-dots" role="group" aria-label="Selecionar produto">
            {produtos.map((product, position) => (
              <button key={product.id} className="carousel-dot" type="button" aria-label={product.name}
                aria-current={position === index ? "true" : undefined} onClick={() => setIndex(position)}><span /></button>
            ))}
          </div>
          <button type="button" aria-label="Próximo produto" onClick={() => move(1)}><ChevronRight size={19} aria-hidden="true" /></button>
          {!reducedMotion && (
            <button type="button" aria-label={paused ? "Retomar rotação automática" : "Pausar rotação automática"} onClick={() => setPaused(!paused)}>
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-[0.7rem] font-medium tracking-[0.35em] text-primary-hover">{kicker}</p>
      <h2 className="mt-4 font-serif text-4xl font-medium md:text-5xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3"><span className="h-px w-12 bg-primary" /><Wheat className="h-4 w-4 text-primary" /><span className="h-px w-12 bg-primary" /></div>
      {sub && <p className="mt-5 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

const feiras = [
  { day: "Quarta-feira", name: "Feira Gastronômica Harmonia", time: "14h às 19h", place: "Bairro Harmonia, Canoas/RS" },
  { day: "Sábado", name: "Feira do Produtor & Artesanato", time: "08h às 13h", place: "Centro / Região Metropolitana" },
  { day: "Domingo", name: "Eventos & Feiras Especiais", time: "09h às 15h", place: "Confira o local atualizado no Instagram" },
];

function Agenda() {
  return (
    <section id="agenda" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle kicker="AGENDA DAS FEIRAS" title="Encontre a padaria nas feiras" sub="Confirme os horários e locais pelo Instagram antes de sair." />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {feiras.map((f, i) => (
            <Reveal key={f.name} delay={i * 150}>
              <article className="group relative h-full overflow-hidden rounded-sm border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-2xl">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-primary-hover"><CalendarDays className="h-4 w-4" />{f.day.toUpperCase()}</div>
                <h3 className="mt-4 font-serif text-2xl font-medium">{f.name}</h3>
                <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                  <p className="flex items-center gap-3"><Clock className="h-4 w-4 text-primary" />{f.time}</p>
                  <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f.place}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-muted-foreground">Quer reservar seu pão favorito para retirar direto na feira? Clique no botão abaixo e garanta o seu antes que esgote.</p>
          <a href={wa("Olá! Gostaria de reservar um pão para retirar na feira.")} target="_blank" rel="noreferrer" className={`${btnGold} mt-6`}><MessageCircle className="h-4 w-4" /> Reservar para a feira</a>
        </Reveal>
      </div>
    </section>
  );
}

const produtos = [
  { id: "sourdough", short: "Fermentação natural, casca crocante e miolo aerado.", name: "Sourdough Tradicional", img: sourdough, tag: "Fornada Limitada", desc: "Farinha nobre, água e sal. Fermentação natural de 36 horas para casca crocante e miolo aerado." },
  { id: "rustico", short: "Cebola roxa caramelizada e ervas frescas.", name: "Rústico de Cebola Roxa & Ervas", img: rustic, tag: "Fornada Limitada", desc: "Massa de levain recheada com cebola roxa caramelizada e ervas frescas do dia." },
  { id: "brioche", short: "Trança macia, dourada e amanteigada.", name: "Trança de Brioche", img: brioche, tag: "Sob Encomenda", desc: "Amanteigada e macia, com manteiga pura e ovos caipiras. Dourada no ponto certo." },
  { id: "folhados", short: "Croissants e folhados laminados à mão.", name: "Folhados Artesanais", img: folhados, tag: "Sob Encomenda", desc: "Croissants e folhados laminados à mão, em camadas finas de manteiga francesa." },
];

function Vitrine() {
  return (
    <section id="vitrine" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle kicker="VITRINE ARTESANAL" title="Nossas Criações Artesanais" sub="Receitas autorais produzidas em pequenos lotes, com tempo e respeito ao processo." />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {produtos.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article id={p.id} className="product-card group flex h-full flex-col">
                <div className="relative overflow-hidden rounded-t-full border border-border">
                  <img src={p.img} alt={p.name} loading="lazy" width={816} height={816} className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                  <span className="absolute bottom-4 left-4 rounded-sm bg-background/90 px-3 py-1 text-[0.65rem] font-medium tracking-[0.2em] text-primary-hover backdrop-blur">{p.tag.toUpperCase()}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <a href={wa(`Olá! Gostaria de encomendar o ${p.name} da Coelho & Dockhorn.`)} target="_blank" rel="noreferrer" className="group/btn mt-5 inline-flex items-center gap-2 self-start border-b border-primary pb-1 text-sm font-medium transition-colors hover:text-primary-hover">
                  Reservar este item <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const diferenciais = [
  { icon: Wheat, title: "Fermentação Natural", text: "Processo lento e respeitoso que garante sabor único, casca crocante e leveza." },
  { icon: Leaf, title: "Ingredientes Selecionados", text: "Farinhas nobres, manteiga pura e insumos frescos sem conservantes artificiais." },
  { icon: Clock, title: "Feito Sob Demanda", text: "Produção artesanal em pequenos lotes para feiras e encomendas personalizadas." },
];

function Diferenciais() {
  return (
    <section className="border-t border-border bg-secondary py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle kicker="NOSSO OFÍCIO" title="Por que Coelho & Dockhorn" />
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {diferenciais.map((d, i) => (
            <Reveal key={d.title} delay={i * 150} className="group text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-primary transition-all duration-500 group-hover:rotate-12 group-hover:bg-primary">
                <d.icon strokeWidth={1.2} className="h-8 w-8 text-primary-hover transition-colors group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium">{d.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{d.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="encomendas" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm bg-espresso px-8 py-16 text-center text-espresso-foreground md:px-16 md:py-24">
            <div className="pointer-events-none absolute inset-4 rounded-sm border border-primary/40" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
            <p className="relative text-[0.7rem] tracking-[0.35em] text-primary">ENCOMENDAS &amp; EVENTOS</p>
            <h2 className="relative mx-auto mt-5 max-w-3xl font-serif text-3xl font-medium leading-tight md:text-5xl">
              Receba nossas fornadas ou leve a Coelho &amp; Dockhorn para seu evento
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-espresso-foreground/75">Atendemos encomendas individuais, cestas gourmet e mesas de panificação para eventos e feiras.</p>
            <a href={wa()} target="_blank" rel="noreferrer" className={`${btnGold} animate-pulse-ring relative mt-10 px-10 py-4 text-base`}><MessageCircle className="h-5 w-5" /> Falar no WhatsApp Agora</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8">
        <div><Logo /><p className="mt-4 max-w-xs text-sm text-muted-foreground">Alta panificação artesanal feita à mão, com fermentação natural.</p></div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 text-xs tracking-[0.3em] text-primary-hover">ONDE ESTAMOS</p>
          <a href={MAPS} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-foreground"><MapPin className="mt-0.5 h-4 w-4 text-primary" />Harmonia, Canoas - RS</a>
          <p className="mt-2 pl-6">Atendimento em Feiras &amp; Sob Encomenda</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 text-xs tracking-[0.3em] text-primary-hover">CONTATO</p>
          <a href={wa()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="h-4 w-4 text-primary" />+55 51 98235-6921</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 hover:text-foreground"><Instagram className="h-4 w-4 text-primary" />@coelhodockhorn</a>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-5 text-xs text-muted-foreground md:px-8">© {new Date().getFullYear()} Coelho &amp; Dockhorn — Fine Bakery</p>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo">
      <Hero />
      <ProductCarousel />
      <Vitrine />
      <Agenda />
      <Diferenciais />
      <CTA />
      </main>
      <Footer />
      <a href={WA_ORDER} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="animate-pulse-ring fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
