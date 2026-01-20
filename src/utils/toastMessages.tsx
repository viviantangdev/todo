import { CircleCheckBig, Edit, Trash2 } from 'lucide-react';

type ToastContentKey = keyof typeof TOAST_CONTENT;

export const TOAST_CONTENT = {
  add: {
    message: (todoTitle: string) => `Added: ${todoTitle}`,
    icon: CircleCheckBig,
    iconClass: 'completeIcon',
  },
  edit: {
    message: (todoTitle: string) => `Edited: ${todoTitle}`,
    icon: Edit,
    iconClass: 'completeIcon',
  },
  delete: {
    message: (todoTitle: string) => `Deleted: ${todoTitle}`,
    icon: Trash2,
    iconClass: 'text-red-400',
  },
};

export function getToastMessage(key: ToastContentKey, todoTitle: string) {
  const msg = TOAST_CONTENT[key];
  return {
    text: msg.message(todoTitle),
    Icon: msg.icon,
    iconClass: msg.iconClass,
  };
}
