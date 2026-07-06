//Simple navigation item component for the navbar
const NavItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <li>
      <a href={href} className='hover:text-gray-400'>
        {text}
      </a>
    </li>
  );
};

export default NavItem;
