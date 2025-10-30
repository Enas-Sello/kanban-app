
export default function Column({ column }: { column: string }) {
  return (
    <div>
      <h2>{column.toUpperCase()}</h2>
      {/* Column content goes here */}
    </div>
  );
}