import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cosmicAudio } from '../../utils/audioSynth';

export interface SelectOption {
  value: string;
  label: string;
  badge?: string;
  description?: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione uma opção...',
  label,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Keyboard navigation (Escape closes)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    cosmicAudio.playClick();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (val: string) => {
    cosmicAudio.playClick();
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono',
            color: 'var(--color-outline)',
            marginBottom: '0.35rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </label>
      )}

      {/* Select Trigger Button */}
      <button
        type="button"
        id={id}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: isOpen ? 'rgba(22, 14, 40, 0.95)' : 'rgba(12, 7, 23, 0.85)',
          border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
          borderRadius: '0.5rem',
          color: selectedOption ? 'var(--color-on-surface)' : 'var(--color-outline)',
          fontSize: '0.9rem',
          fontFamily: 'inherit',
          cursor: 'pointer',
          textAlign: 'left',
          boxShadow: isOpen ? '0 0 16px var(--primary-glow)' : 'none',
          transition: 'all 0.25s ease',
          outline: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
          {selectedOption?.badge && (
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'JetBrains Mono',
                fontWeight: 700,
                padding: '0.15rem 0.45rem',
                borderRadius: '0.3rem',
                backgroundColor: 'rgba(183, 109, 255, 0.15)',
                color: 'var(--color-primary)',
                border: '1px solid rgba(183, 109, 255, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedOption.badge}
            </span>
          )}
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          size={16}
          style={{
            color: 'var(--color-primary)',
            transition: 'transform 0.25s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: 'rgba(16, 9, 32, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(183, 109, 255, 0.3)',
            borderRadius: '0.65rem',
            padding: '0.4rem',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.9), 0 0 20px rgba(183, 109, 255, 0.25)',
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.6rem 0.8rem',
                  borderRadius: '0.45rem',
                  border: isSelected ? '1px solid rgba(183, 109, 255, 0.3)' : '1px solid transparent',
                  backgroundColor: isSelected ? 'var(--color-surface-container-highest)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--color-on-surface-variant)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(183, 109, 255, 0.1)';
                    e.currentTarget.style.color = 'var(--color-on-surface)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-on-surface-variant)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flex: 1, minWidth: 0 }}>
                  {option.badge && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 700,
                        padding: '0.15rem 0.4rem',
                        borderRadius: '0.3rem',
                        backgroundColor: isSelected ? 'rgba(255, 198, 64, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? 'var(--color-secondary)' : 'var(--color-outline)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {option.badge}
                    </span>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: isSelected ? 600 : 400 }}>{option.label}</span>
                    {option.description && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--color-outline)', marginTop: '2px' }}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>

                {isSelected && (
                  <Check size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

