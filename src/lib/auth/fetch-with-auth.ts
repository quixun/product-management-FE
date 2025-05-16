export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("authRefreshToken");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshRes.ok) {
      throw new Error("Refresh token expired");
    }

    const data = await refreshRes.json();
    localStorage.setItem("authToken", data.accessToken);
    localStorage.setItem("authRefreshToken", data.refreshToken);

    res = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
  }

  return res;
}
