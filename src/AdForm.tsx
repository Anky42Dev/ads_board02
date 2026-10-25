import { useState, type FormEvent } from "react";
import { createAd } from "./api";

export default function AdForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price", price);
    if (image) form.append("image", image);

    try {
      await createAd(form);
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      e.currentTarget.reset();
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Новое объявление</h2>
      <input
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        required
      />
      <input
        type="number"
        placeholder="Цена, ₽"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />
      {error && <div className="error">{error}</div>}
      <button disabled={sending}>{sending ? "Отправляем…" : "Опубликовать"}</button>
    </form>
  );
}
