export const API_URL = "https://inai-col1.fishrungames.com";

export interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
}

interface AdsResponse {
  items: Ad[];
}

export async function fetchAds(): Promise<Ad[]> {
  const res = await fetch(`${API_URL}/ads`);
  if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
  const data: AdsResponse = await res.json();
  return data.items;
}

export async function createAd(form: FormData): Promise<Ad> {
  const res = await fetch(`${API_URL}/ads`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Ошибка отправки: ${res.status}`);
  return res.json();
}
