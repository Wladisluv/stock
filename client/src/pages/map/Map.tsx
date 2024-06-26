// @ts-nocheck
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
  const initialCoordinates = [38.96942, 45.040795];

  useEffect(() => {
    if (map.current) return; // Prevents re-initializing the map

    // Initialize map
    map.current = new maptilersdk.Map({
      container: mapContainer.current!,
      style: maptilersdk.MapStyle.STREETS,
      center: initialCoordinates,
      zoom: zoom,
    });

    // Add initial marker at given coordinates
    const initialMarker = new maptilersdk.Marker({ color: "#0000FF" }) // Blue marker
      .setLngLat(initialCoordinates)
      .addTo(map.current);

    setMarker(initialMarker); // Save marker in state

    // Logic for map called from page
    if (mapCall === "page") {
      goodsStore?.goods?.forEach((emp) => {
        if (!isNaN(emp.lng) && !isNaN(emp.lat)) {
          const empMarker = new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([emp.lng, emp.lat])
            .addTo(map.current);

          const popup = new maptilersdk.Popup()
            .setMaxWidth("300px")
            .setText(emp.name);

          empMarker.getElement().addEventListener("mouseenter", () => {
            popup.addTo(map.current);
          });

          empMarker.getElement().addEventListener("mouseleave", () => {
            popup.remove();
          });

          empMarker.setPopup(popup);
        }
      });
    }

    // Handle map clicks
    if (mapCall !== "page") {
      map.current.on("click", async (e: any) => {
        const { lng, lat } = e?.lngLat;

        if (!isNaN(lng) && !isNaN(lat)) {
          if (marker) {
            marker.remove();
          }

          const newMarker = new maptilersdk.Marker({ color: "#FF0000" })
            .setLngLat([lng, lat])
            .addTo(map.current);

          setMarker(newMarker);

          const response = await fetch(
            `${GEOCODER_BASE_URL}q=${lat}+${lng}&key=${process.env.REACT_APP_GEOCODER_API_KEY}`
          );
          const data = await response.json();

          if (data.results?.[0]?.formatted) {
            setStreet(data.results[0].formatted);

            if (onMapClick) {
              onMapClick({ lng, lat, loc: data.results[0].formatted });
            }
          }
        }
      });
    }

    return () => {
      if (marker) {
        marker.remove();
      }
    };
  }, [zoom, mapCall, GEOCODER_BASE_URL, onMapClick]);

  return (
    <div
      className={mapCall === "page" ? styles.pageMapWrap : styles.modalMapWrap}
    >
      {mapCall === "page" ? (
        <>
          <h1>О нас</h1>
          <div>
            <h2 style={{ color: "black" }}>
              Мы находимся по адресу:
              <span style={{ color: "blue" }}>
                ул. Северная, 324, Краснодар, Краснодарский край, 350000
              </span>
            </h2>
            <h2 style={{ color: "black" }}>
              Телефон для связи:
              <span style={{ color: "blue" }}>+7 (962) 301-12-23</span>
            </h2>
            <h2 style={{ color: "black" }}>
              Время работы:
              <span style={{ color: "blue" }}>С 9:00 ДО 19:00</span>
            </h2>
          </div>
          <p className={styles.address}>{street}</p>
        </>
      ) : (
        <p className={styles.address}>{street}</p>
      )}
      <div ref={mapContainer} className={styles.map} />
    </div>
  );
};

export default Map;
