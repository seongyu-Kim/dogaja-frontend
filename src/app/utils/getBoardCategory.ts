import { headers } from "next/headers";

export function getBoardCategory() {
  const headersList = headers();
  const url = headersList.get("referer") || "";
  const categoryRegex = /(findFriend|inquiry|review|together|report)/;
  const match = url.match(categoryRegex);
  const category = match ? match[1] : null;

  return category;
}
