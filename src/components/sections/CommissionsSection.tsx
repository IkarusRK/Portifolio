import { useState } from 'react';
import { COMMISSION_TIERS } from '../../data/portfolioData';
import type { CommissionTier } from '../../data/portfolioData';
import { cosmicAudio } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { CheckCircle, Sparkles, Send, Calculator } from 'lucide-react';

interface CommissionsSectionProps {
  prefilledProject?: string;
}

export const CommissionsSection: React.FC<CommissionsSectionProps> = ({ prefilledProject }) => {
  const [selectedTier, setSelectedTier] = useState<string>('tier-armaduras');
  const [discordNick, setDiscordNick] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [platform, setPlatform] = useState<string>('Conan Exiles ModKit');
  const [projectDescription, setProjectDescription] = useState<string>(
    prefilledProject ? `Gostaria de solicitar um modelo baseado no projeto: ${prefilledProject}.` : ''
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Quick Calculator State
  const [calcTier, setCalcTier] = useState<string>('armaduras');
  const [calcComplexity, setCalcComplexity] = useState<number>(1); // 1 = Standard, 1.3 = Complex, 1.6 = Legendary

  const baseRates: Record<string, number> = {
    props: 380,
    armaduras: 1250,
    mapas: 2800,
  };

  const calculatedTotal = Math.round(baseRates[calcTier] * calcComplexity);

  const handleSelectTierCard = (tier: CommissionTier) => {
    cosmicAudio.playClick();
    setSelectedTier(tier.id);
    if (tier.id === 'tier-props') setCalcTier('props');
    if (tier.id === 'tier-armaduras') setCalcTier('armaduras');
    if (tier.id === 'tier-mapas') setCalcTier('mapas');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cosmicAudio.playEclipsePulse();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ddb7ff', '#ffc640', '#7bd0ff'],
    });

    setIsSubmitted(true);
  };

  return (
    <section id="comissoes" className="section-spacing">
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          {/* Breadcrumb / Telemetry */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1rem',
            }}
          >
            <span className="badge-pill badge-secondary">
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-secondary)',
                  boxShadow: '0 0 8px #ffc640',
                }}
              />
              2 Vagas Abertas para este Mês • Fila Estelar
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            Terminal de Encomendas &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Comissões 3D
            </span>
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1.05rem', marginTop: '0.75rem' }}>
            Modelagem AAA dark fantasy voltada para Conan Exiles, servidores privados e Unreal Engine 5. Texturas PBR 4K, runas emissivas cosmológicas e topologia limpa inspecionada vértice a vértice.
          </p>
        </div>

        {/* 3 Commission Tiers Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
            alignItems: 'stretch',
          }}
        >
          {COMMISSION_TIERS.map((tier) => {
            const isFeatured = tier.recommended;
            return (
              <div
                key={tier.id}
                className="glass-card"
                style={{
                  padding: '2.5rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  border: selectedTier === tier.id ? '2px solid var(--color-primary)' : isFeatured ? '2px solid var(--color-secondary)' : undefined,
                  boxShadow: selectedTier === tier.id ? '0 0 25px var(--primary-glow)' : isFeatured ? '0 20px 50px rgba(255, 198, 64, 0.2)' : undefined,
                }}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-14px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(90deg, var(--color-secondary), var(--color-secondary-container))',
                      color: 'var(--color-on-secondary)',
                      padding: '0.2rem 1rem',
                      borderRadius: '9999px',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      boxShadow: '0 0 15px rgba(255, 198, 64, 0.4)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Mais Solicitado • AAA Rigged
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="badge-pill badge-primary" style={{ fontSize: '0.7rem' }}>
                      {tier.tierNumber}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)' }}>
                      {tier.budgetPolycount}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--color-on-surface)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {tier.title}
                  </h3>

                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {tier.description}
                  </p>

                  {/* Price Box */}
                  <div
                    style={{
                      background: 'rgba(12, 7, 23, 0.7)',
                      padding: '1rem',
                      borderRadius: '0.65rem',
                      marginBottom: '1.5rem',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-outline)', fontFamily: 'JetBrains Mono' }}>
                      Investimento a partir de
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: isFeatured ? 'var(--color-secondary)' : 'var(--color-on-surface)',
                      }}
                    >
                      {tier.priceFormatted}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-tertiary)', marginTop: '0.2rem' }}>
                      Prazo: {tier.deliveryTime}
                    </div>
                  </div>

                  {/* Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {tier.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface-variant)', fontSize: '0.85rem' }}>
                        <CheckCircle
                          size={15}
                          style={{
                            color: isFeatured ? 'var(--color-secondary)' : 'var(--color-primary)',
                            flexShrink: 0,
                          }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectTierCard(tier)}
                  className={isFeatured ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', fontSize: '0.9rem' }}
                >
                  Selecionar Este Tier
                </button>
              </div>
            );
          })}
        </div>

        {/* Live Estimator & Briefing Transmission Form */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            border: '1px solid rgba(183, 109, 255, 0.3)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
            }}
          >
            {/* Left Column: Quick Interactive Price Calculator */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <Calculator size={20} style={{ color: 'var(--color-secondary)' }} />
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  Calculadora Instantânea de Orçamento
                </h3>
              </div>
              <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Simule em tempo real o valor estimado e especificações de produção para seu projeto:
              </p>

              {/* Asset Type Selector */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.4rem' }}>
                  TIPO DE ATIVO:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[
                    { id: 'props', label: 'Props / Arma' },
                    { id: 'armaduras', label: 'Armadura / Set' },
                    { id: 'mapas', label: 'Mapa / Cidadela' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        cosmicAudio.playClick();
                        setCalcTier(t.id);
                      }}
                      className={`hud-btn ${calcTier === t.id ? 'active' : ''}`}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Complexity Level */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.4rem' }}>
                  GRAU DE COMPLEXIDADE / EFEITOS:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[
                    { val: 1, label: 'Padrão AAA' },
                    { val: 1.3, label: 'Física Chaos / Runas' },
                    { val: 1.6, label: 'Lendário / Niagara' },
                  ].map((c) => (
                    <button
                      key={c.val}
                      type="button"
                      onClick={() => {
                        cosmicAudio.playClick();
                        setCalcComplexity(c.val);
                      }}
                      className={`hud-btn ${calcComplexity === c.val ? 'active' : ''}`}
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Result Display Card */}
              <div
                style={{
                  background: 'rgba(12, 7, 23, 0.85)',
                  padding: '1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 198, 64, 0.35)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-outline)' }}>Estimativa Preliminar:</span>
                  <span
                    className="font-display"
                    style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-secondary)' }}
                  >
                    R$ {calculatedTotal.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-on-surface-variant)' }}>
                  Inclui suporte a Conan Exiles DevKit (.pak), exportação em FBX/Blend, texturas 4K UDIM e revisão de bake.
                </div>
              </div>
            </div>

            {/* Right Column: Transmission Form */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <Send size={20} style={{ color: 'var(--color-primary)' }} />
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                  Transmitir Briefing para Eclipsa
                </h3>
              </div>

              {isSubmitted ? (
                <div
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid var(--color-primary)',
                  }}
                >
                  <Sparkles size={42} style={{ color: 'var(--color-secondary)', margin: '0 auto 1rem auto' }} />
                  <h4 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-on-surface)', marginBottom: '0.5rem' }}>
                    Briefing Transmitido com Sucesso!
                  </h4>
                  <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Eclipsa recebeu seus dados cósmicos na fila estelar. Entraremos em contato via Discord ou Email em menos de 24 horas para alinhar referências e cronograma de modelagem.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-ghost"
                    style={{ marginTop: '1.5rem' }}
                  >
                    Enviar Outro Briefing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.35rem' }}>
                      SEU NOME OU DISCORD NICK *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: ConanLover#1234 ou Valquíria"
                      value={discordNick}
                      onChange={(e) => setDiscordNick(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(12, 7, 23, 0.85)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-on-surface)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.35rem' }}>
                      SEU E-MAIL PARA CONTATO *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(12, 7, 23, 0.85)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-on-surface)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.35rem' }}>
                      PLATAFORMA / DESTINO DO MODELO
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(12, 7, 23, 0.85)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-on-surface)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      <option value="Conan Exiles ModKit (.pak)">Conan Exiles ModKit (.pak)</option>
                      <option value="Unreal Engine 5.4 (.uasset)">Unreal Engine 5.4 (.uasset)</option>
                      <option value="Arquivos Puros FBX / Blend 4K">Arquivos Puros FBX / Blend 4K</option>
                      <option value="Cinemática / Animação / Blender">Cinemática / Animação / Blender</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', marginBottom: '0.35rem' }}>
                      DESCREVA SUA VISÃO, REFERÊNCIAS E PRAZO
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Conte sobre o conceito da armadura, arma ou mapa, referências visuais e requisitos de jogabilidade..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        backgroundColor: 'rgba(12, 7, 23, 0.85)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '0.5rem',
                        color: 'var(--color-on-surface)',
                        fontSize: '0.9rem',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '0.9rem', width: '100%', marginTop: '0.5rem' }}
                  >
                    <Sparkles size={16} />
                    <span>Transmitir Pedido de Comissão</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
