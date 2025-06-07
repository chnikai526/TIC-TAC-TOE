import Link from 'next/link';

export default function NavMenu() {
  return (
    <nav style={{ marginBottom: 20 }}>
      <Link href="/" style={{ marginRight: 15 }}>Home</Link>
      <Link href="/game" style={{ marginRight: 15 }}>Game</Link>
      <Link href="/counter" style={{ marginRight: 15 }}>Counter</Link>
      <Link href="/greeting">Greeting</Link>
    </nav>
  );
}