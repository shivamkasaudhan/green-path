import React from 'react';
import { Link } from 'react-router-dom';

const menuLink = [
  { id: 1, name: 'Add Blog', link: '/addblog' },
  { id: 2, name: 'Blogs', link: '/blogs' },
  { id: 3, name: 'Users', link: '/users' },
  { id: 4, name: 'Orders', link: '/orders' },
  { id: 5, name: 'Farmers', link: '/farmer' },
  { id: 6, name: 'Products', link: '/products' },
];

const Header = () => {
  return (
    <div>
      <ul className="flex items-center gap-4">
        {menuLink.map(({ id, name, link }) => (
          <li key={id}>
            <Link to={link} className="inline-block px-4 text-blue-500 hover:underline">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
