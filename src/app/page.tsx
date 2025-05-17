"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type ApodData = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
};

export default function Home() {
  const [apod, setApod] = useState<ApodData | null>(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
      if (!apiKey) {
        console.error("Missing NASA API key!");
        return;
      }

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );

      if (!res.ok) {
        console.error("API fetch error:", res.status);
        return;
      }

      const data: ApodData = await res.json();
      setApod(data);
    };

    fetchAPOD();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>NASA Astronomy Picture of the Day</h1>
      {apod ? (
        <div>
          <h2>{apod.title}</h2>
          {apod.media_type === "image" && (
            <Image src={apod.url} alt={apod.title} width={800} height={600} />
          )}
          <p>{apod.explanation}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
