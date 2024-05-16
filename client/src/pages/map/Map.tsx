import { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import goodsStore from "../../stores/goods-store";

import styles from "./Map.module.scss";

interface Props {
  mapCall: string;
  onMapClick?: (data: any) => void | undefined;
  goodMarker?: { lat: number; lng: number; address?: string };
}

const Map = ({ mapCall, onMapClick, goodMarker }: Props) => {
  const [street, setStreet] = useState("");
  const mapContainer = useRef(null);
  const map: React.MutableRefObject<any> = useRef(null);
  const [zoom] = useState(14);
  const [marker, setMarker] = useState<maptilersdk.Marker | null>(null);

  const GEOCODER_BASE_URL = process.env.REACT_APP_GEOCODER_BASE_URL;

  const API_KEY: string = process.env.REACT_APP_MAP_API_KEY!;

  maptilersdk.config.apiKey = API_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS, // Основная карта
      center: [38.9772, 45.0353],
      zoom: zoom,
    });

    if (goodMarker) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current!,
        style: maptilersdk.MapStyle.STREETS, // Отдельная карта для каждого работника
        center: [goodMarker?.lng!, goodMarker?.lat!],
        zoom: zoom,
      });
    }

    let newMarker: maptilersdk.Marker | null = null;
    let empMarker: maptilersdk.Marker | null = null;
    let allEmpMarkers: maptilersdk.Marker | null = null;

    if (mapCall === "page") {
      goodsStore.goods.map((emp) => {
        const marker = new maptilersdk.Marker({ color: "#FF0000" }) // Если карта расположена на странице
          .setLngLat([emp.location?.lng!, emp.location?.lat!]) // Добавляем на нее маркеры всех существующих рабочих
          .addTo(map!.current);

        const popup = new maptilersdk.Popup()
          .setHTML(
            `<div class="${styles.markerPopup}">
            <h2>${emp.firstName} ${emp.lastName}</h2>
            <p>${emp.category?.title}</p>
            </div>`
          )
          .setMaxWidth("300px");

        marker.getElement().addEventListener("mouseenter", () => {
          // Попап при наведении для каждого работника
          popup.addTo(map!.current);
        });

        marker.getElement().addEventListener("mouseleave", () => {
          popup.remove();
        });

        marker.setPopup(popup);
      });
    }

    if (goodMarker) {
      empMarker = new maptilersdk.Marker({
        color: "#FF0000",
      })
        .setLngLat([goodMarker?.lng!, goodMarker?.lat!]) // Добавление маркера на карту конкретного работника
        .addTo(map!.current);
    }

    setStreet(goodMarker?.address!);

    if (mapCall !== "page") {
      map.current.on("click", async (e: any) => {
        if (empMarker) {
          empMarker.remove();
        }
        const { lng, lat } = e.lngLat;

        if (newMarker) {
          newMarker.remove();
        }

        newMarker = new maptilersdk.Marker({ color: "#FF0000" }) // Добавляем маркер на основную мапу
          .setLngLat([lng, lat])
          .addTo(map!.current);

        const response = await fetch(
          `${GEOCODER_BASE_URL}q=${lat}+${lng}&key=${process.env.REACT_APP_GEOCODER_API_KEY}` // преобразуем широту и долготу в улицу
        );
        const data = await response.json();

        setStreet(data.results[0].formatted); // Кладем отсортированную улицу в стейт

        if (onMapClick) {
          onMapClick!({ lng, lat, loc: data.results[0].formatted });
        }
      });
    }

    return () => {
      if (newMarker) {
        newMarker.remove();
      }
    };
  }, [zoom, marker]);

  return (
    <div
      className={mapCall === "page" ? styles.pageMapWrap : styles.modalMapWrap} // Разные размера в зависимости от вызова
    >
      {mapCall === "page" ? (
        <>
          <h1>О нас</h1> <p className={styles.address}>{street}</p>
        </>
      ) : (
        <p className={styles.address}>{street}</p>
      )}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default Map;
