
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-h1 font-h1">Heading 1</h1>
        <h2 className="text-h2 font-h2">Heading 2</h2>
        <h3 className="text-h3 font-h3">Heading 3</h3>
        <h4 className="text-h4 font-h4">Heading 4</h4>
        <h5 className="text-h5 font-h5">Heading 5</h5>
        <h6 className="text-h6 font-h6">Heading 6</h6>
        <p className="text-p font-p">This is a paragraph. It provides an example of how the paragraph text looks.</p>
      </main>
    </div>
  );
}
