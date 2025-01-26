import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav className="flex space-x-4">
      <Link href="/" className="text-blue-500 hover:underline">
        Home
      </Link>
      <Link href="/contact" className="text-blue-500 hover:underline">
        Contact
      </Link>
    </nav>
  );
};

export default Nav;
