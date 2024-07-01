import { CustomComponent } from "@olivercaine/ui-components/src/ui/components/CustomComponent"

export default function Page() {
  return (
    <main className="grid place-items-center min-h-screen">
      <h1>Hello World!2</h1>
      <CustomComponent wow="pow" key={1}/>
    </main>
  );
}
