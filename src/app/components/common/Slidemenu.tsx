import React from 'react';

interface SlideMenuItem {
  label: React.ReactNode;
  onClick?: () => void;
}

interface SlideMenuProps {
  show: boolean;
  items: SlideMenuItem[];
  className?: string;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ show, items, className }) => {  
  return (
    <>
      {show && (
        <div 
          className={`absolute top-full bg-white text-mainColor border-4 border-mainColor rounded-b-lg shadow-lg transition-all duration-300 ease-in-out ${className}`}
          style={{ zIndex: 10 }}
        >
          {/* 메뉴 아이템 리스트 */}
          <ul className="p-2">
            {items.length > 0 ? (
              items.map((item, index) => (
                <li 
                  key={index} 
                  className={`hover:underline cursor-pointer text-sm py-px ${
                    index !== items.length - 1 ? 'border-b border-mainColor' : ''
                  }`}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="text-gray-500 py-2">항목이 없습니다.</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default SlideMenu;
