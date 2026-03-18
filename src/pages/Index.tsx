import { useState, useRef, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

type IName = Parameters<typeof Icon>[0]["name"];

const BEFORE_IMG = "https://cdn.poehali.dev/projects/1df29b27-a1c9-47bc-b05e-9a481148df7d/files/36ff76fb-6d35-44c7-a8e5-48fcf7684744.jpg";
const AFTER_IMG = "https://cdn.poehali.dev/projects/1df29b27-a1c9-47bc-b05e-9a481148df7d/files/36ff76fb-6d35-44c7-a8e5-48fcf7684744.jpg";
const HERO_IMG = "https://cdn.poehali.dev/projects/1df29b27-a1c9-47bc-b05e-9a481148df7d/files/d59a6d90-ba66-48cb-a962-45013e596cb3.jpg";
const PROCESS_IMG = "https://cdn.poehali.dev/projects/1df29b27-a1c9-47bc-b05e-9a481148df7d/files/d51d7e18-0997-49d7-a02d-9b27473cd0bb.jpg";

// ─── Before/After Slider ─────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => { if (dragging) update(e.clientX); }, [dragging, update]);
  const onTouchMove = useCallback((e: TouchEvent) => { if (dragging) update(e.touches[0].clientX); }, [dragging, update]);
  const stop = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    };
  }, [onMouseMove, onTouchMove, stop]);

  return (
    <div
      ref={containerRef}
      className="before-after-container w-full rounded-sm overflow-hidden select-none"
      style={{ aspectRatio: "16/9", cursor: "ew-resize" }}
      onMouseDown={(e) => { setDragging(true); update(e.clientX); }}
      onTouchStart={(e) => { setDragging(true); update(e.touches[0].clientX); }}
    >
      <img src={AFTER_IMG} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={BEFORE_IMG} alt="До" className="w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} draggable={false} />
      </div>
      <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-sm tracking-widest uppercase">До</div>
      <div className="absolute top-4 right-4 bg-white/90 text-[#1a2744] text-xs font-semibold px-3 py-1 rounded-sm tracking-widest uppercase">После</div>
      <div className="before-after-slider" style={{ left: `${pos}%` }}>
        <div className="before-after-handle">
          <div className="flex gap-1">
            <Icon name="ChevronLeft" size={14} className="text-[#1a2744]" />
            <Icon name="ChevronRight" size={14} className="text-[#1a2744]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item py-5">
      <button className="w-full flex justify-between items-start text-left gap-4" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-[#1a2744] text-base leading-snug">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#c9962e] flex items-center justify-center transition-transform" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          <Icon name="Plus" size={14} className="text-[#c9962e]" />
        </span>
      </button>
      {open && <p className="mt-4 text-gray-600 leading-relaxed text-sm animate-fade-in">{a}</p>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const navLinks = [
    { label: "О компании", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Портфолио", href: "#portfolio" },
    { label: "Гарантия", href: "#guarantee" },
    { label: "Вопросы", href: "#faq" },
    { label: "Контакты", href: "#contacts" },
  ];

  const services = [
    { icon: "DoorOpen", title: "Замена фасадов", desc: "Полная замена дверок и ящиков кухонного гарнитура. МДФ, пластик, массив — любой материал.", price: "от 800 ₽/фасад" },
    { icon: "Paintbrush", title: "Покраска фасадов", desc: "Покраска эмалью в любой цвет по каталогу RAL. Матовое, глянцевое или сатиновое покрытие.", price: "от 600 ₽/фасад" },
    { icon: "Layers", title: "Перетяжка плёнкой", desc: "Оклейка самоклеящейся или термоплёнкой. Имитация дерева, бетона, патины, однотонная.", price: "от 400 ₽/фасад" },
    { icon: "Wrench", title: "Замена фурнитуры", desc: "Установка новых петель, ручек, направляющих. Мягкое закрывание, доводчики, push-to-open.", price: "от 200 ₽/петля" },
    { icon: "Square", title: "Замена столешницы", desc: "Установка каменных, деревянных и ламинированных столешниц. Выезд и замеры бесплатно.", price: "от 3 500 ₽/п.м." },
    { icon: "Sparkles", title: "Комплексное обновление", desc: "Полное обновление кухни под ключ: фасады + столешница + фурнитура + подсветка.", price: "от 25 000 ₽" },
  ];

  const guarantees = [
    { icon: "ShieldCheck", title: "Гарантия 3 года", desc: "Официальная гарантия на все виды работ и материалы" },
    { icon: "Award", title: "Сертифицированные материалы", desc: "Работаем только с проверенными поставщиками" },
    { icon: "Clock", title: "Срок от 3 дней", desc: "Быстрое выполнение без ущерба качеству" },
    { icon: "Banknote", title: "Фиксированная цена", desc: "Никаких доплат после подписания договора" },
  ];

  const faqs = [
    { q: "Сколько времени занимает обновление кухни?", a: "Стандартная кухня из 8–12 фасадов обновляется за 3–5 рабочих дней. Срок зависит от объёма работ и выбранного материала. Перед стартом мы согласовываем точные сроки с вами." },
    { q: "Нужно ли снимать кухню для покраски или перетяжки?", a: "В большинстве случаев фасады снимаются, работы выполняются в нашем цеху, затем устанавливаются обратно. Это обеспечивает максимальное качество покрытия. Демонтаж и монтаж включены в стоимость." },
    { q: "Можно ли обновить только часть фасадов?", a: "Да, мы работаем как с отдельными элементами, так и с полным комплектом. Однако для единообразного внешнего вида рекомендуем обновлять все фасады одновременно." },
    { q: "Какие материалы вы используете?", a: "Мы работаем с МДФ крашеным, плёнкой ПВХ, термопластиком и натуральным шпоном. Все материалы имеют сертификаты качества. Покраска производится эмалями на водной основе без резкого запаха." },
    { q: "Выезжаете ли вы на замер?", a: "Да, выезд мастера для замера и консультации по Екатеринбургу — бесплатно. Звоните или оставляйте заявку на сайте, согласуем удобное время." },
    { q: "Как заключается договор и какая гарантия?", a: "Мы работаем по официальному договору с фиксированной стоимостью и сроками. Гарантия на работы — 3 года, на материалы — 1 год. Все условия прописаны в договоре." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", fontFamily: "Montserrat, sans-serif" }}>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--navy)" }}>
              <Icon name="Grid2x2" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-sm tracking-wide uppercase" style={{ color: "var(--navy)", letterSpacing: "0.12em" }}>ФасадМастер</div>
              <div className="text-xs text-gray-400 tracking-wide">Екатеринбург</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-xs font-medium tracking-widest uppercase text-gray-600 hover:text-[#1a2744]">{l.label}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+73432000000" className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--navy)" }}>
              <Icon name="Phone" size={15} />
              +7 (343) 200-00-00
            </a>
            <a href="#contacts"><button className="btn-primary text-xs py-2 px-5">Вызвать мастера</button></a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} className="text-[#1a2744]" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="tel:+73432000000" className="text-sm font-semibold text-[#1a2744] flex items-center gap-2">
              <Icon name="Phone" size={14} />+7 (343) 200-00-00
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center noise-overlay overflow-hidden" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Кухня после обновления фасадов" className="w-full h-full object-cover opacity-35" style={{ objectPosition: "center center" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,39,68,0.92) 0%, rgba(26,39,68,0.75) 55%, rgba(26,39,68,0.45) 100%)" }} />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5">
          <div className="absolute top-16 right-20 w-64 h-64 border border-white rotate-12" />
          <div className="absolute top-32 right-40 w-40 h-40 border border-white -rotate-6" />
          <div className="absolute bottom-32 right-10 w-96 h-96 border border-white rotate-3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">Екатеринбург · Работаем с 2012 года</span>
            </div>
            <h1 className="animate-fade-in-up delay-100" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 600, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Новая кухня —<br />
              <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>без замены гарнитура</em>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 animate-fade-in-up delay-200" style={{ maxWidth: "520px" }}>
              Профессиональное обновление кухонных фасадов: покраска, замена, перетяжка плёнкой. Результат — как из шоурума. Гарантия 3 года.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <a href="#contacts"><button className="btn-gold">Получить расчёт</button></a>
              <a href="#portfolio"><button className="btn-outline-white">Смотреть работы</button></a>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg animate-fade-in-up delay-400">
              {[{ num: "500+", label: "кухонь обновлено" }, { num: "12", label: "лет на рынке" }, { num: "3 года", label: "гарантия" }].map((s) => (
                <div key={s.num}>
                  <div className="stat-number">{s.num}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="gold-line" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">О компании</span>
              </div>
              <h2 className="section-title mb-6">Специализируемся<br />только на фасадах</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Мы не занимаемся монтажом кухонь, ремонтом квартир или другими работами — только фасады. Именно эта специализация позволяет нам достигать результата, который невозможно получить у «мастеров на час».
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Наш цех оснащён профессиональным покрасочным оборудованием. Собственные мастера с опытом от 5 лет. Строгий контроль качества на каждом этапе.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "MapPin", text: "Екатеринбург и область" },
                  { icon: "Clock", text: "Работаем без выходных" },
                  { icon: "Users", text: "Команда 18 мастеров" },
                  { icon: "Ruler", text: "Выезд на замер бесплатно" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 rounded-sm" style={{ background: "var(--cream)" }}>
                    <div className="w-8 h-8 flex items-center justify-center rounded-sm flex-shrink-0" style={{ background: "var(--navy)" }}>
                      <Icon name={item.icon as IName} size={15} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={PROCESS_IMG} alt="Производство" className="w-full rounded-sm object-cover" style={{ height: "480px" }} />
              <div className="absolute -bottom-6 -left-6 text-white p-6 rounded-sm shadow-xl" style={{ background: "var(--gold)", maxWidth: "200px" }}>
                <div className="text-3xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>97%</div>
                <div className="text-xs uppercase tracking-wider mt-1 opacity-90">клиентов рекомендуют нас друзьям</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────── */}
      <section id="services" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">Услуги</span>
              <span className="gold-line" />
            </div>
            <h2 className="section-title">Что мы делаем</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="service-card bg-white p-8 rounded-sm border border-gray-100">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-5" style={{ background: "var(--navy)" }}>
                  <Icon name={s.icon as IName} size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-[#1a2744]">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="text-[#c9962e] font-bold text-sm">{s.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#contacts"><button className="btn-primary">Заказать расчёт стоимости</button></a>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ──────────────────────────────────── */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">Портфолио</span>
              <span className="gold-line" />
            </div>
            <h2 className="section-title mb-4">Наши работы</h2>
            <p className="text-gray-500 text-sm">Перетащите разделитель, чтобы увидеть разницу</p>
          </div>
          <div className="max-w-4xl mx-auto mb-10">
            <BeforeAfterSlider />
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Материал", value: "МДФ крашеный, матовая эмаль" },
              { label: "Срок работ", value: "4 рабочих дня" },
              { label: "Экономия vs новая кухня", value: "до 70% стоимости" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-sm border border-gray-100" style={{ background: "var(--cream)" }}>
                <div className="text-xs uppercase tracking-widest text-gray-400 mb-2">{item.label}</div>
                <div className="font-semibold text-[#1a2744]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ──────────────────────────────────── */}
      <section id="guarantee" className="py-24 relative overflow-hidden noise-overlay" style={{ background: "var(--navy)" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-80 h-80 border border-white rotate-12" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white -rotate-6" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">Гарантия</span>
              <span className="gold-line" />
            </div>
            <h2 className="section-title" style={{ color: "white" }}>Работаем официально</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((g) => (
              <div key={g.title} className="p-8 rounded-sm border border-white/10 text-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "var(--gold)" }}>
                  <Icon name={g.icon as IName} size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-3">{g.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 max-w-2xl mx-auto text-center p-8 rounded-sm border border-[#c9962e]/40" style={{ background: "rgba(201,150,46,0.08)" }}>
            <Icon name="FileText" size={32} className="text-[#c9962e] mx-auto mb-4" />
            <h3 className="font-bold text-white text-lg mb-3">Официальный договор</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Работаем только по письменному договору с фиксированными ценами и сроками. Вы защищены на каждом этапе — от замера до приёмки работ.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section id="faq" className="py-24" style={{ background: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">FAQ</span>
              <span className="gold-line" />
            </div>
            <h2 className="section-title">Частые вопросы</h2>
          </div>
          <div className="bg-white rounded-sm p-8 shadow-sm">
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ───────────────────────────────────── */}
      <section id="contacts" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="gold-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9962e]">Контакты</span>
              <span className="gold-line" />
            </div>
            <h2 className="section-title">Свяжитесь с нами</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="p-10 rounded-sm" style={{ background: "var(--cream)" }}>
              <h3 className="font-bold text-xl text-[#1a2744] mb-2">Оставьте заявку</h3>
              <p className="text-gray-500 text-sm mb-7">Мастер перезвонит в течение 30 минут и проконсультирует бесплатно</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">Ваше имя</label>
                  <input type="text" placeholder="Иван" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1a2744] transition-colors rounded-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1a2744] transition-colors rounded-sm" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 block">Комментарий</label>
                  <textarea rows={3} placeholder="Опишите задачу..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#1a2744] transition-colors rounded-sm resize-none" />
                </div>
                <button className="btn-primary w-full mt-2">Отправить заявку</button>
                <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-bold text-xl text-[#1a2744] mb-6">Как нас найти</h3>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (343) 200-00-00", href: "tel:+73432000000" },
                    { icon: "Mail", label: "E-mail", value: "info@fasadmaster-ekb.ru", href: "mailto:info@fasadmaster-ekb.ru" },
                    { icon: "MapPin", label: "Адрес офиса", value: "Екатеринбург, ул. Металлургов, 14", href: "#" },
                    { icon: "Clock", label: "График работы", value: "Пн–Вс: 9:00 — 19:00", href: "#" },
                  ].map((c) => (
                    <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 flex items-center justify-center rounded-sm flex-shrink-0" style={{ background: "var(--navy)" }}>
                        <Icon name={c.icon as IName} size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{c.label}</div>
                        <div className="font-semibold text-[#1a2744] group-hover:text-[#c9962e] transition-colors">{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-sm border border-[#c9962e]/30" style={{ background: "rgba(201,150,46,0.05)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="MessageCircle" size={20} className="text-[#c9962e]" />
                  <span className="font-semibold text-[#1a2744]">Быстрый ответ в мессенджере</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">Отправьте фото вашей кухни — получите предварительную стоимость за 15 минут</p>
                <div className="flex gap-3">
                  <button className="btn-primary flex-1 text-xs py-2">WhatsApp</button>
                  <button className="btn-primary flex-1 text-xs py-2">Telegram</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="py-10 border-t border-gray-100" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: "var(--gold)" }}>
              <Icon name="Grid2x2" size={14} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-wider text-white uppercase">ФасадМастер</span>
          </div>
          <div className="text-gray-500 text-xs text-center">© 2024 ФасадМастер · Екатеринбург · Обновление кухонных фасадов</div>
          <a href="#" className="text-xs text-gray-500 hover:text-[#c9962e] transition-colors">Политика конфиденциальности</a>
        </div>
      </footer>

    </div>
  );
}