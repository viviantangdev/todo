import { X, type LucideIcon } from 'lucide-react';
import type React from 'react';
import { useEffect, type FormEvent } from 'react';

type ModalDialogProps = {
  onClose: () => void;
  header: {
    title: string;
    headerIcon: {
      icon: LucideIcon;
      styling?: string;
    };
  };
  content: React.ReactNode;
  footerAction: {
    label: string;
    onConfirm: () => void;
    styling: string;
  };
};

export const ModalDialog = ({
  onClose,
  header,
  content,
  footerAction,
}: ModalDialogProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    footerAction.onConfirm();
  };

  const HeaderIcon = header.headerIcon;

  return (
    <>
      <div className='backdrop z-10'>
        <div
          role='dialog'
          aria-modal='true'
          className='dialog flex flex-col z-20'
        >
          {/* Close button */}
          <div className='flex w-full justify-end items-end '>
            <button aria-label='Close dialog' onClick={onClose}>
              <X />
            </button>
          </div>
          {/*Header, Content, Footer actions*/}
          <form
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center gap-8 p-5 text-center'
          >
            <div className='flex flex-col items-center gap-1.5'>
              <HeaderIcon.icon size={50} className={`${HeaderIcon.styling}`} />
              <h3 className='text-2xl tracking-wide'>{header.title}</h3>
            </div>
            {content}
            <div className='flex gap-2 w-full'>
              <button
                type='button'
                aria-label='Cancel'
                onClick={onClose}
                className='secondaryButton w-full'
              >
                Cancel
              </button>

              <button
                type='submit'
                autoFocus
                aria-label={footerAction.label}
                className={`w-full ${footerAction.styling}`}
              >
                {footerAction.label}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
