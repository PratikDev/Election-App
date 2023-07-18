/**
 * @param length length of the uid
 * @returns a random string of the given length
 */
export function uid(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let uid = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    uid += characters.charAt(randomIndex);
  }

  return uid;
}
