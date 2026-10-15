import fs from "node:fs";
import path from "node:path";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { ImageResponse } from "next/og";
import { type ShareCard, shareCards } from "../cards";

/*
  Link previews, drawn once at build time into out/og/<card>.png, so they work on
  GitHub Pages, which has no server to draw them on request. Satori renders this to a
  PNG rather than a browser, so the sizes here are pixels of the image.
*/
export const dynamic = "force-static";
export const dynamicParams = false;

const WIDTH = 1200;
const HEIGHT = 630;
const INK = "#0b0b0b";
const PAPER = "#f2f2f2";
const MUTED = "#8f8f8f";

const read = (...segments: string[]) => fs.readFileSync(path.join(process.cwd(), ...segments));
const picture = (publicPath: string) =>
  `data:image/jpeg;base64,${read("public", publicPath).toString("base64")}`;
const clip = (text: string, length: number) =>
  text.length > length ? `${text.slice(0, length).replace(/\s+\S*$/, "")} …` : text;

/* manga screentone: dots that shrink with their distance from (cx, cy) */
function screentone(cx: number, cy: number, reach: number) {
  const pitch = 14;
  let dots = "";
  for (let y = pitch / 2; y < HEIGHT; y += pitch) {
    for (let x = pitch / 2; x < WIDTH; x += pitch) {
      const falloff = 1 - Math.hypot(x - cx, y - cy) / reach;
      if (falloff > 0.08) dots += `<circle cx="${x}" cy="${y}" r="${(falloff * 4.4).toFixed(2)}"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" fill="#fff" fill-opacity="0.18">${dots}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function Byline({ withName }: { withName: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <img
        alt=""
        src={picture(person.avatar)}
        width={64}
        height={64}
        style={{ borderRadius: 32, border: "1px solid rgba(255,255,255,0.18)" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {withName && <span style={{ fontSize: 28, fontWeight: 500 }}>{person.name}</span>}
        <span style={{ fontSize: withName ? 22 : 28, color: MUTED }}>{baseURL}</span>
      </div>
    </div>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <span
      style={{
        fontSize: 20,
        fontWeight: 500,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: MUTED,
      }}
    >
      {children}
    </span>
  );
}

function TextCard({ card }: { card: ShareCard }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: WIDTH,
        height: HEIGHT,
        padding: "64px 72px",
        background: INK,
        color: PAPER,
        fontFamily: "Inter",
      }}
    >
      <img
        alt=""
        src={screentone(WIDTH + 40, -40, 620)}
        width={WIDTH}
        height={HEIGHT}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <Byline withName={card.title !== person.name} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
        <Kicker>{card.kicker}</Kicker>
        <span
          style={{
            fontFamily: "Newsreader",
            fontWeight: 500,
            fontSize: card.title.length > 40 ? 68 : 92,
            lineHeight: 1.04,
            letterSpacing: -1.5,
          }}
        >
          {card.title}
        </span>
        {card.detail && (
          <span style={{ fontSize: 28, lineHeight: 1.4, color: "#a6a6a6" }}>
            {clip(card.detail, 130)}
          </span>
        )}
      </div>
    </div>
  );
}

function PoemCard({ card }: { card: ShareCard }) {
  return (
    <div
      style={{
        display: "flex",
        width: WIDTH,
        height: HEIGHT,
        background: INK,
        color: PAPER,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 640,
          height: HEIGHT,
          padding: "64px 56px 64px 72px",
        }}
      >
        <Byline withName />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Kicker>{card.kicker}</Kicker>
          <span
            style={{
              fontFamily: "Newsreader",
              fontWeight: 500,
              fontSize: 60,
              lineHeight: 1.05,
              letterSpacing: -1,
            }}
          >
            {card.title}
          </span>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: 6 }}>
            {(card.lines ?? []).map((line) => (
              <span
                key={line}
                style={{
                  fontFamily: "Newsreader",
                  fontStyle: "italic",
                  fontSize: 30,
                  lineHeight: 1.4,
                  color: "#bdbdbd",
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
      {card.photo && (
        <img
          alt=""
          src={picture(card.photo)}
          width={560}
          height={HEIGHT}
          style={{ objectFit: "cover", borderLeft: "1px solid rgba(255,255,255,0.12)" }}
        />
      )}
    </div>
  );
}

export function generateStaticParams() {
  return shareCards().map(({ card }) => ({ card: `${card}.png` }));
}

export async function GET(_request: Request, { params }: { params: { card: string } }) {
  const card = shareCards().find((entry) => `${entry.card}.png` === params.card);
  if (!card) {
    return new Response("Not found", { status: 404 });
  }

  const font = (file: string) => read("src", "app", "og", "fonts", file);

  return new ImageResponse(card.photo ? <PoemCard card={card} /> : <TextCard card={card} />, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Inter", data: font("Inter-Regular.woff"), weight: 400, style: "normal" },
      { name: "Inter", data: font("Inter-Medium.woff"), weight: 500, style: "normal" },
      { name: "Newsreader", data: font("Newsreader-Medium.woff"), weight: 500, style: "normal" },
      { name: "Newsreader", data: font("Newsreader-Italic.woff"), weight: 400, style: "italic" },
    ],
  });
}
