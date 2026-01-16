type TabButtonProps = {
  label: string;
  onClick: () => void;
  active: boolean;
};

export const TabButton = ({ label, onClick, active }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-4 py-2 rounded-xl w-45 shadow-lg ${
        active ? 'activeTab' : 'tab'
      }`}
    >
      {label}
    </button>
  );
};
