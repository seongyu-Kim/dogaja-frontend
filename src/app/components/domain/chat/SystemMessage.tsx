export default function SystemMessage({ content }: { content: string }) {
  return (
    <div className="bg-gray-200 w-full rounded-md flex justify-center py-1">
      <p>{content}</p>
    </div>
  );
}
