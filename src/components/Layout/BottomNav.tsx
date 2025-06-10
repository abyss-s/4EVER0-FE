import { NavLink } from 'react-router-dom';
import {
  CalendarIcon,
  ChatBubbleIcon,
  HomeIcon,
  LightningBoltIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const navItems = [
  { label: '미션', icon: CalendarIcon, path: '/mission' },
  { label: '무너톡', icon: ChatBubbleIcon, path: '/chatbot' },
  { label: '홈', icon: HomeIcon, path: '/' },
  { label: '핫플', icon: LightningBoltIcon, path: '/hotplace' },
  { label: 'MY', icon: PersonIcon, path: '/me' },
];

const BottomNav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 mx-auto max-w-[375px] w-full border-t bg-white py-2 z-10">
      <nav className="flex justify-around">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-colors ${
                isActive ? 'text-[#E03131]' : 'text-gray-600 hover:text-[#E03131]'
              }`
            }
          >
            <Icon className="w-5 h-5 mb-1" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default BottomNav;
