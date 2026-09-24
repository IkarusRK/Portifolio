import React, { useState } from 'react';
import { cosmicAudio } from '../../utils/audioSynth';
import { Castle, Sun, Shield, Download, CheckCircle } from 'lucide-react';

export const EnvironmentsShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'levelDesign' | 'lumen' | 'optimization'>('levelDesign');

  const tabContents = {
    levelDesign: {
      title: 'Level Design & Bloqueio Modular',
      desc: 'Composição arquitetônica ciclópea estruturada em blocos modulares de basalto com encaixe em grid de 512cm. Projetado com linhas de visão limpas para combate corpo a corpo e navegação de bosses.',
      points: [
        'Kit modular de 48 peças de pedra esculpida e arcos monumentais',
        'Paredes escaláveis balanceadas para o sistema de stamina do Conan Exiles',
        'Zonas de spawn rúnicas com colisões complexas pré-calculadas',
        'Pontes suspensas sobre abismos astrais com vertigem gravitacional'
      ],
      spec: '48 Peças Modulares • Grid 512cm'
    },
    lumen: {
      title: 'Iluminação Volumétrica Lumen & Céu Cósmico',
      desc: 'Sistema de luz dinâmica global desenvolvido para simular a conjunção das luas gêmeas sobre o relevo rochoso, com nébulas volumétricas e reflexos em poças de água estelar.',
      points: [
        'Luz celestial em tempo real com sombras suaves de alta definição',
        'Volumetric fog roxo translúcido com dispersão de luz Rayleigh',
        'Tochas e brasas com emissão de calor e partículas físicas Niagara',
        'Ciclo dia/noite sincronizado com o servidor multiplayer'
      ],
      spec: 'UE 5.4 Lumen • HDR 60 FPS'
    },
    optimization: {
      title: 'Nanite Geometry & Malhas de Colisão',
      desc: 'Topologia sem limites de LOD artificial graças ao Unreal Engine Nanite. O jogador experimenta silhuetas megalíticas sem pop-in visual mesmo em servidores com 60 jogadores simultâneos.',
      points: [
        'Zero pop-in de LOD com streaming contínuo de geometria Nanite',
        'NavMesh gerado com precisão para NPCs e feras míticas',
        'Uso otimizado de VRAM através de Trim Sheets de textura 4K',
        'Consumo de rede minimizado através de blueprints compiladas em C++'
      ],
      spec: '1.25M Tris Nanite • 0% Pop-in'
    }
  };

  const handleTabClick = (tab: 'levelDesign' | 'lumen' | 'optimization') => {
    cosmicAudio.playClick();
    setActiveTab(tab);
  };

  return (
    <section id="mapas-cenarios" className="section-spacing" style={{ backgroundColor: 'var(--color-surface-dim)' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-secondary)',
                boxShadow: '0 0 8px var(--color-secondary)',
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Cartografia Cósmica &amp; Worldbuilding • Grid #HYB-VOID-08
            </span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
            }}
          >
            Catedral Astral das Águas <span style={{ color: 'var(--color-primary)', fontWeight: 300 }}>&amp; Cidadela Madrovitale</span>
          </h2>
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '1rem', maxWidth: '640px', marginTop: '0.5rem' }}>
            Complexo palaciano monumental sobre águas reflexivas, torres pontiagudas douradas, vitrais em arabesco estelar e cristais esmeralda modelados para Unreal Engine 5.
          </p>
        </div>

        {/* Big Panoramic Stage Banner */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <img
            src="./assets/catedral-astral.jpg"
            alt="Catedral Astral das Águas - Eclipsa"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12, 7, 23, 0.9) 0%, rgba(12, 7, 23, 0.2) 60%, transparent 100%)',
            }}
          />

          {/* Floating Pill on image */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="badge-pill badge-secondary">BIOMA ESTELAR ATIVO • BUILD 4.19.2</span>
              <span className="badge-pill badge-primary">CONAN DEVKIT VERIFICADO</span>
            </div>

            <a
              href="#comissoes"
              onClick={() => cosmicAudio.playClick()}
              className="btn-primary"
              style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}
            >
              <Download size={15} />
              <span>Solicitar Build de Mapa</span>
            </a>
          </div>
        </div>

        {/* Interactive Technical Breakdown Dock */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          {/* Tab Strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '1rem',
            }}
          >
            <button
              onClick={() => handleTabClick('levelDesign')}
              className={`hud-btn ${activeTab === 'levelDesign' ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Castle size={15} />
              <span>Level Design &amp; Bloqueio</span>
            </button>
            <button
              onClick={() => handleTabClick('lumen')}
              className={`hud-btn ${activeTab === 'lumen' ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Sun size={15} />
              <span>Iluminação Volumétrica Lumen</span>
            </button>
            <button
              onClick={() => handleTabClick('optimization')}
              className={`hud-btn ${activeTab === 'optimization' ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Shield size={15} />
              <span>Nanite &amp; Colisão</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-on-surface)', marginBottom: '0.75rem' }}>
                {tabContents[activeTab].title}
              </h3>
              <p style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                {tabContents[activeTab].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tabContents[activeTab].points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-on-surface)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec Box */}
            <div
              className="glass-card"
              style={{
                padding: '1.5rem',
                border: '1px solid rgba(255, 198, 64, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--color-outline)', textTransform: 'uppercase' }}>
                Benchmark de Engenharia UE5
              </div>
              <div className="font-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                {tabContents[activeTab].spec}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-on-surface-variant)', lineHeight: 1.5 }}>
                Testado em servidores oficiais e dedicados de Conan Exiles com stress test de até 50 combatentes simultâneos sem perda de quadros.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
