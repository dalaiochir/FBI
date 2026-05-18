'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Charge = {
  title: string;
  desc: string;
  emoji: string;
};

const targetName = process.env.NEXT_PUBLIC_TARGET_NAME?.trim() || 'Эрэн сурвалжлагдаж буй хамгийн өхөөрдөм нэгэн';
const sitePassword = process.env.NEXT_PUBLIC_SITE_PASSWORD?.trim() || '2:47';
const audioFile = process.env.NEXT_PUBLIC_AUDIO_FILE?.trim() || '/Bruno Mars-Treasure.mp3';

const charges: Charge[] = [
  {
    title: 'Хэт их өхөөрдөм байдал',
    desc: 'Аюултай хэмжээнд ичих, догдлох, сэтгэл санаа тогтворгүй болох нөхцөлийг удаа дараа үүсгэсэн.',
    emoji: '💘',
  },
  {
    title: 'Миний амар тайвныг алдагдуулсан',
    desc: 'Миний бодол санаанд зөвшөөрөлгүй нэвтэрч, гарахаас татгалзсан.',
    emoji: '🚨',
  },
  {
    title: 'Шалтгаангүй инээмсэглүүлсэн',
    desc: 'Утсаа хараад ганцаараа инээмсэглэх сэжигтэй үйл ажиллагаанд холбогдсон.',
    emoji: '😌',
  },
];

const evidence = [
  'Чиний зурвас ирэх бүрд миний дэлгэцийн хэрэглээ огцом нэмэгддэг.',
  'Гэрчүүд намайг утсаа хараад тэнэг юм шиг инээмсэглэдгийг баталсан.',
  'Чи миний толгой дотор түрээс төлөхгүйгээр хууль бусаар суурьшсан.',
  'Би гэнэт дажгүй харагдах гэж хичээдэг болсон нь маш сэжигтэй.',
];

const typedText = `Маш нухацтай мөрдөн шалгасны эцэст ${targetName} нь аюултай хэмжээнд өхөөрдөм бөгөөд миний одоогийн байдалд шууд хариуцлагатай этгээдээр албан ёсоор тогтоогдлоо.`;

export default function HomePage() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [passwordInput, setPasswordInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [musicError, setMusicError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, id) => ({
        id,
        left: `${(id * 5.1 + 7) % 100}%`,
        delay: `${(id % 7) * 0.7}s`,
        duration: `${8 + (id % 5) * 1.4}s`,
        size: `${14 + (id % 6) * 4}px`,
      })),
    [],
  );

  useEffect(() => {
    if (!unlocked) return;

    if (typedIndex >= typedText.length) return;
    const timer = window.setTimeout(() => setTypedIndex((prev) => prev + 1), 22);
    return () => window.clearTimeout(timer);
  }, [typedIndex, unlocked]);

  const tryPlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setAudioPlaying(true);
      setMusicError('');
    } catch {
      setAudioPlaying(false);
      setMusicError('Хөгжмийн товч дээр нэг удаа дараарай — зарим браузер автоматаар тоглуулахыг хориглодог.');
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await tryPlay();
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  };

  const handleUnlock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordInput.trim() !== sitePassword) {
      setUnlockError('Нууц үг буруу байна. Зөвхөн зөвшөөрөгдсөн өхөөрдөм нэгэн л нэвтэрнэ.');
      return;
    }

    setUnlockError('');
    setUnlocked(true);
    window.setTimeout(() => {
      void tryPlay();
    }, 300);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white selection:bg-pink-500/40">
      <audio
        ref={audioRef}
        src={audioFile}
        loop
        preload="auto"
        onCanPlay={() => setAudioReady(true)}
        onPlay={() => setAudioPlaying(true)}
        onPause={() => setAudioPlaying(false)}
      />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(236,72,153,0.12),transparent_24%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_12%,transparent_88%,rgba(255,255,255,0.03))]" />

      {floatingHearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-float pointer-events-none fixed bottom-[-10vh] text-pink-300/70"
          style={{ left: heart.left, animationDelay: heart.delay, animationDuration: heart.duration, fontSize: heart.size }}
          aria-hidden="true"
        >
          ❤
        </span>
      ))}

      {!unlocked ? (
        <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
          <div className="w-full max-w-xl rounded-[2rem] border border-white/12 bg-white/8 p-6 shadow-[0_30px_120px_-30px_rgba(0,0,0,0.75)] backdrop-blur-2xl md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Нууц нэвтрэлт</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Дурлалын Холбооны Товчоо</h1>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70">
                <span className="siren-dot bg-red-400" />
                <span className="siren-dot siren-dot-delay bg-blue-400" />
                нууц материал
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm leading-7 text-white/70">
                Энэхүү романтик цагдаагийн тайлан нь хязгаарлагдмал нууц материал юм.{' '}
                <span className="font-semibold text-white">{targetName}</span>-д зориулсан хэргийн файлыг нээхийн тулд нууц үгээ оруулна уу.
              </p>

              <form onSubmit={handleUnlock} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="password" className="mb-2 block text-xs uppercase tracking-[0.28em] text-white/45">
                    Хэргийн файлын нууц үг
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Нууц үгээ оруулна уу"
                    className="w-full rounded-2xl border border-white/12 bg-white/7 px-4 py-4 text-base text-white outline-none ring-0 transition placeholder:text-white/30 focus:border-pink-300/45"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-2xl border border-pink-300/20 bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-[0_20px_80px_-20px_rgba(236,72,153,0.75)] transition duration-300 hover:scale-[1.02]"
                >
                  <span className="shine absolute inset-y-0 left-[-35%] w-1/3 bg-white/25" />
                  <span className="relative">Хэргийн файлыг нээх</span>
                </button>

                {unlockError ? <p className="text-sm text-pink-200">{unlockError}</p> : null}
              </form>
            </div>

            <p className="mt-5 text-xs leading-6 text-white/40">
              Санамж:<code className="rounded bg-white/10 px-1.5 py-1 text-white/70">Илгээсэн цагийг хараарай🫣</code>
            </p>
          </div>
        </section>
      ) : (
        <div className="relative z-10">
          <header className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-10">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
                <div className="pulse-ring absolute inset-0 rounded-2xl border border-pink-300/30" />
                <span className="text-xl">🚔</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Зүрхний гэмт хэргийн хэлтэс</p>
                <h2 className="text-sm font-semibold text-white/90">Дурлалын Холбооны Товчоо</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => void toggleMusic()}
                className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/85 backdrop-blur-md transition hover:border-white/25 hover:bg-white/10"
              >
                {audioPlaying ? 'Хөгжмийг зогсоох ♫' : audioReady ? 'Хөгжим тоглуулах ♫' : 'Хөгжим ачаалж байна…'}
              </button>
              <span className="rounded-full border border-red-400/25 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-red-200">
                Идэвхтэй хэрэг: {targetName}
              </span>
            </div>
          </header>

          <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-8 pt-4 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-10">
            <div className="fade-up">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 backdrop-blur-md">
                <span className="siren-dot bg-red-400" />
                Романтик цагдаагаас ирүүлсэн албан мэдэгдэл
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Чи баривчлагдлаа
                <span className="mt-2 block bg-gradient-to-r from-red-300 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                  миний зүрхийг хулгайлсан хэргээр.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
                {typedText.slice(0, typedIndex)}
                <span className="typing-cursor">|</span>
              </p>

              {musicError ? <p className="mt-3 text-sm text-pink-200">{musicError}</p> : null}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#sentence"
                  className="group relative overflow-hidden rounded-2xl border border-red-300/25 bg-gradient-to-r from-red-500 to-pink-500 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_20px_80px_-20px_rgba(239,68,68,0.7)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  <span className="shine absolute inset-y-0 left-[-35%] w-1/3 bg-white/25" />
                  <span className="relative">Шийтгэлийг харах</span>
                </a>
                <a
                  href="#charges"
                  className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Яллах үндэслэлүүдийг харах
                </a>
              </div>
            </div>

            <div className="fade-up-delayed flex justify-center lg:justify-end">
              <div className="tilt-card relative w-full max-w-md">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-red-500/25 via-pink-500/20 to-blue-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-red-200/80">Сэжигтний мэдээлэл</p>
                      <p className="mt-1 text-xl font-bold">{targetName}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="siren-dot bg-red-400" />
                      <span className="siren-dot siren-dot-delay bg-blue-400" />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-dashed border-white/20 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-800/80 p-5">
                    <div className="absolute -right-10 top-6 h-24 w-24 rounded-full bg-red-500/20 blur-2xl" />
                    <div className="absolute -left-10 bottom-4 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />

                    <div className="relative flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="pulse-ring absolute inset-0 rounded-[1.4rem] border border-pink-300/30" />
                        <img
                          src="/enkule.png"
                          alt={targetName}
                          className="h-56 w-56 rounded-[1.4rem] border border-white/15 bg-white/5 object-cover shadow-inner shadow-white/10"
                          onError={(e) => {
                            e.currentTarget.src = '/suspect-placeholder.svg';
                          }}
                        />
                      </div>

                      <p className="mt-5 text-xs uppercase tracking-[0.38em] text-white/45">Фото нотлох баримт</p>
                      <h3 className="mt-2 text-3xl font-black tracking-tight">Маш сэжигтэй</h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
                        Сэтгэл хулгайлсан, дэндүү дур булаам байсан, мөн намайг хэвийн байж чадахгүй болтол удаа дараа үймүүлсэн хэрэгт эрэн сурвалжлагдаж байна.
                      </p>

                      <div className="mt-5 grid w-full grid-cols-3 gap-3 text-left">
                        {[
                          ['Хоч', 'Зүрхний хулгайч'],
                          ['Аюулын түвшин', 'Дэндүү өхөөрдөм'],
                          ['Барьцаа', 'Нэг болзоо'],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">{label}</p>
                            <p className="mt-1 text-sm font-semibold text-white/90">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="charges" className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">Албан тайлан</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Яллах үндэслэлүүдийн жагсаалт</h3>
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 backdrop-blur-md md:block">
                Цагаатгагдах ямар ч боломжгүй
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {charges.map((charge, idx) => (
                <article
                  key={charge.title}
                  className="charge-card relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-400 via-pink-300 to-blue-300 opacity-70" />
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl shadow-lg">
                    {charge.emoji}
                  </div>
                  <h4 className="text-2xl font-bold">{charge.title}</h4>
                  <p className="mt-3 leading-7 text-white/65">{charge.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-red-200/85">
                    <span className="h-2 w-2 rounded-full bg-red-300" />
                    Зүрхний хэлтсээс баталгаажуулав
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Цуглуулсан нотлох баримтууд</p>
              <h3 className="mt-2 text-3xl font-black tracking-tight">Энэ хэрэг бүрэн нотлогдсон</h3>
              <div className="mt-6 space-y-4">
                {evidence.map((item, idx) => (
                  <div key={item} className="fade-item flex items-start gap-4 rounded-2xl border border-white/10 bg-black/20 p-4" style={{ animationDelay: `${idx * 120}ms` }}>
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-pink-400 text-sm font-bold text-slate-950">
                      {idx + 1}
                    </div>
                    <p className="text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="sentence" className="relative overflow-hidden rounded-[2rem] border border-red-300/15 bg-gradient-to-br from-red-500/10 via-pink-500/10 to-blue-500/10 p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <div className="absolute -left-12 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-red-500/20 blur-3xl" />
              <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />

              <p className="relative text-xs uppercase tracking-[0.35em] text-red-100/75">Эцсийн шийтгэл</p>
              <h3 className="relative mt-2 text-3xl font-black tracking-tight md:text-4xl">Шүүх шийдвэрээ гаргалаа.</h3>
              <p className="relative mt-4 max-w-xl text-lg leading-8 text-white/75">
                Нотлох баримтууд хангалттай байгаа тул {targetName} нь нэг албан ёсны болзоо, хязгааргүй өхөөрдөм үйлдэл,
                мөн миний сэтгэл санааны тогтвортой байдлыг үргэлжлүүлэн алдагдуулах шийтгэл хүлээнэ.
              </p>

              <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setRevealed(true)}
                  className="group relative overflow-hidden rounded-2xl border border-red-300/20 bg-gradient-to-r from-red-500 to-pink-500 px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-[0_20px_70px_-20px_rgba(236,72,153,0.75)] transition-all duration-300 hover:scale-[1.03]"
                >
                  <span className="shine absolute inset-y-0 left-[-35%] w-1/3 bg-white/25" />
                  <span className="relative">Шийтгэлийг зөвшөөрөх</span>
                </button>
                <button
                  onClick={() => setRevealed(true)}
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[0.25em] text-white/85 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Эсэргүүцэл байхгүй
                </button>
              </div>

              <div className={`verdict-card relative mt-6 rounded-[1.6rem] border border-pink-300/20 bg-black/25 p-5 text-center text-lg font-semibold text-pink-100 ${revealed ? 'verdict-card-visible' : ''}`}>
                Шийтгэлийг хүлээн авлаа. Чиний шийтгэл бол...
                <span className="mt-2 block text-3xl font-black tracking-tight text-white md:text-4xl">Надтай болзоонд явах. 💐</span>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}