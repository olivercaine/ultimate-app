import { CustomComponent } from "@olivercaine/ui-components/src/ui/components/CustomComponent"

export default function Page() {
  return (
    <main className="grid place-items-center min-h-screen">
      <h1>Hello World!</h1>
      <p>1.0.0</p>
      <p>App: web</p>
      <CustomComponent wow="pow" key={1}/>
    </main>
  );
}
