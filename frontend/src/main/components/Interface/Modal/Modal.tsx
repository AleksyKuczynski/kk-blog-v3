// src/main/components/Interface/Modal/Modal.tsx
import { cn } from '@/main/lib/utils';
import { ModalVisibility } from './types';

interface ModalProps {
  visibility: ModalVisibility;
  theme: 'default' | 'rounded' | 'sharp';
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const modalStyles = {
  overlay: {
    base: `
      fixed inset-0 
      bg-bgcolor/80 
      backdrop-blur-sm
      z-50 
      flex items-center justify-center
    `,
    states: {
      'hidden': 'invisible opacity-0',
      'animating-in': 'visible opacity-0',
      'visible': 'visible opacity-100',
      'animating-out': 'visible opacity-0'
    }
  },
  container: {
    base: `
      relative
      bg-bgcolor-alt 
      shadow-xl
      max-w-lg w-full mx-4
      max-h-[90vh]
      transform
    `,
    themes: {
      default: 'rounded-lg',
      rounded: 'rounded-2xl',
      sharp: 'border-2 border-prcolor'
    },
    states: {
      'hidden': 'scale-95 translate-y-4 opacity-0',
      'animating-in': 'scale-95 translate-y-4 opacity-0',
      'visible': 'scale-100 translate-y-0 opacity-100',
      'animating-out': 'scale-95 translate-y-4 opacity-0'
    }
  }
};

export default function Modal({
  visibility,
  theme,
  title,
  description,
  children,
  onClose,
  containerRef
}: ModalProps) {
  return (
    <div 
      className={cn(
        modalStyles.overlay.base,
        modalStyles.overlay.states[visibility],
        'transition-opacity duration-200'
      )}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={containerRef}
        className={cn(
          modalStyles.container.base,
          modalStyles.container.themes[theme],
          modalStyles.container.states[visibility],
          'transition-all duration-200'
        )}
      >
        {title && (
          <div className="p-6 pb-0">
            <h2 id="modal-title" className="text-xl font-semibold text-txcolor">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-txcolor-secondary">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="p-6 overflow-auto">
          {children}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-txcolor-muted hover:text-txcolor"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}