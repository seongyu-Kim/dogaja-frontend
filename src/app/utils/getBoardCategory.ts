import { headers } from "next/headers";

export function getBoardCategory() {
  const headersList = headers();
  const url = headersList.get("referer") || "";
  console.log(url);
  const categoryRegex = /(findFriend|inquiry|review|together)/;
  const match = url.match(categoryRegex);
  const category = match ? match[1] : null;

  return [category];
}
