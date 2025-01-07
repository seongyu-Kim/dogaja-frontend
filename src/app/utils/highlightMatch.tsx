export const highlightMatch = (text: string, search: string) => {
  if (!search) return text;

  const regex = new RegExp(`(${search})`, "g");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part === search ? (
      <span key={index} className="text-mainColor">
        {part}
      </span>
    ) : (
      part
    )
  );
};
