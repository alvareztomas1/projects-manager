export const getCookie = (cookieName: string): string | undefined => {
  const value: string = `; ${document.cookie}`;
  const parts: string[] = value.split(`; ${cookieName}=`);

  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie;
  }

  return undefined;
};
