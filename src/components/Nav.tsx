import Link from 'next/link';

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className = "" }) => {
  return (
    <nav className={className}>
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
