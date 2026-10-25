import { API_URL, type Ad } from "./api";

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <article className="card">
      <div className="photo">
        {ad.image_url ? (
          <img src={API_URL + ad.image_url} alt={ad.title} />
        ) : (
          <span>нет фото</span>
        )}
      </div>
      <h3>{ad.title}</h3>
      <p>{ad.description}</p>
      <div className="price">{ad.price.toLocaleString("ru-RU")} ₽</div>
    </article>
  );
}
