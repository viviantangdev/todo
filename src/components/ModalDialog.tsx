import { X, type LucideIcon } from 'lucide-react';
import type React from 'react';

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
  footerAcions: React.ReactNode[];
};

export const ModalDialog = ({
  onClose,
  header,
  content,
  footerAcions,
}: ModalDialogProps) => {
  const HeaderIcon = header.headerIcon;
  return (
    <>
      <div className='backdrop z-10'>
        <div className='dialog flex flex-col'>
          {/* Close button */}
          <div className='flex w-full justify-end items-end '>
            <button aria-label='Close dialog' onClick={onClose}>
              <X />
            </button>
          </div>
          {/*Header, Content, Footer actions*/}
          <div className='flex flex-col justify-center items-center gap-8 p-5 text-center'>
            <div className='flex flex-col items-center gap-1.5'>
              <HeaderIcon.icon size={60} className={`${HeaderIcon.styling}`} />
              <h3 className='text-2xl tracking-wide'>{header.title}</h3>
            </div>
            {content}
            <div className='flex gap-2 w-full'>
              {footerAcions.map((action) => action)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
