import { add } from '@ultimate/package'

export default function Page() {
  return (
    <main className="grid place-items-center min-h-screen">
      <h1>Hello World!</h1>
      <p>1.0.0</p>
      <p>App: web</p>
      <p>{add(2,3)}</p>
    </main>
  );
}
