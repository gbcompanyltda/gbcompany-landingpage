"use client";

import React, { useEffect, useState } from "react";



const bp = process.env.NEXT_PUBLIC_BASE_PATH || "";
const A = (f: string) => `${bp}/figma/${f}`;
const WPP = "https://wa.me/11930968872";

const CANVAS_W = 1920;

/* fator global de tipografia — reduz todas as fontes de uma vez
   (Archivo Black é bem larga e pesada, então o fator é bem menor) */
const FS = 0.74;
const fs = (n: number) => Math.round(n * FS * 10) / 10;

const HOME_H = 1083;
const SERV_H = 1083;
const BRIEF_H = 900;
const PROD_H = 1083;
const FECH_H = 760;
const FOOT_H = 289;
const CANVAS_H = HOME_H + SERV_H + BRIEF_H + PROD_H + FECH_H + FOOT_H; // 5198

/* --- WhatsApp glyph ------------------------------------------------ */
function Wpp({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* --- Faixa de código (Frame 4) ----------------------------------- */
type Tok = { t: string; l: number; y: number; s: number; o: number; c: string; b?: boolean };
const TOKENS: Tok[] = [
  { t: "{ }", l: 30, y: 27, s: 28, o: 0.2, c: "#8d57f8", b: true },
  { t: "const dev = () => {", l: 150, y: 13.5, s: 14, o: 0.15, c: "#8d57f8" },
  { t: "[ ]", l: 350, y: 69.5, s: 32, o: 0.2, c: "#56b6c2", b: true },
  { t: "</>", l: 480, y: 30.5, s: 26, o: 0.18, c: "#e06c75", b: true },
  { t: "function()", l: 560, y: 62.5, s: 12, o: 0.13, c: "#61afef" },
  { t: "{ code }", l: 700, y: 20, s: 20, o: 0.2, c: "#8d57f8" },
  { t: "if (true) {", l: 830, y: 58, s: 13, o: 0.15, c: "#8d57f8" },
  { t: "< / >", l: 960, y: 38, s: 30, o: 0.2, c: "#e06c75" },
  { t: "[ ... ]", l: 1080, y: 66, s: 18, o: 0.18, c: "#56b6c2" },
  { t: "return { };", l: 1180, y: 18.5, s: 14, o: 0.15, c: "#8d57f8" },
  { t: "{ => }", l: 1320, y: 62.5, s: 24, o: 0.2, c: "#8d57f8" },
  { t: "import { }", l: 1440, y: 16, s: 13, o: 0.13, c: "#8d57f8" },
  { t: "( )", l: 1550, y: 72, s: 28, o: 0.2, c: "#61afef", b: true },
  { t: "export default", l: 1620, y: 25.5, s: 12, o: 0.13, c: "#8d57f8" },
  { t: "{ [ ] }", l: 1770, y: 58.5, s: 22, o: 0.2, c: "#8d57f8" },
  { t: "&&", l: 90, y: 67, s: 20, o: 0.15, c: "#56b6c2", b: true },
  { t: "===", l: 250, y: 41, s: 18, o: 0.18, c: "#56b6c2", b: true },
  { t: "// dev", l: 420, y: 46.5, s: 11, o: 0.13, c: "#98c379" },
  { t: "=>", l: 650, y: 59.5, s: 24, o: 0.2, c: "#56b6c2", b: true },
  { t: "{ ... }", l: 1850, y: 21.5, s: 16, o: 0.18, c: "#8d57f8" },
  { t: "#!/bin", l: 1000, y: 11.5, s: 11, o: 0.1, c: "#98c379" },
  { t: "npm run", l: 1250, y: 66.5, s: 11, o: 0.1, c: "#e5c07b" },
  { t: "<<", l: 50, y: 47.5, s: 16, o: 0.15, c: "#56b6c2", b: true },
  { t: ">>", l: 1900, y: 74.5, s: 16, o: 0.15, c: "#56b6c2", b: true },
  { t: "/* */", l: 770, y: 68.5, s: 14, o: 0.13, c: "#98c379" },
];

function CodeStrip({ top }: { top: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: CANVAS_W,
        height: 96,
        background: "#d2d3da",
        overflow: "hidden",
      }}
    >
      {TOKENS.map((k, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: k.l,
            top: k.y,
            transform: "translateY(-50%)",
            fontSize: k.s,
            fontWeight: k.b ? 700 : 400,
            color: k.c,
            opacity: k.o,
            whiteSpace: "nowrap",
          }}
        >
          {k.t}
        </span>
      ))}
    </div>
  );
}

/* --- Monitor genérico (hover Landing Pages / SaaS em Serviços) ---- */
function GenericMonitor({ variant }: { variant: "landing" | "saas" }) {
  const bar = (w: string, h = 10, c = "#e2e0f4") => (
    <div style={{ width: w, height: h, borderRadius: 6, background: c }} />
  );
  return (
    <div style={{ width: 620, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 620,
          height: 388,
          borderRadius: 18,
          border: "12px solid #1e1b2e",
          background: "#ffffff",
          overflow: "hidden",
          boxShadow: "0 40px 80px -20px rgba(24,20,46,.45)",
        }}
      >
        {/* browser chrome */}
        <div
          style={{
            height: 34,
            background: "#f1eefb",
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "0 14px",
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ff5f57" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#febc2e" }} />
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28c840" }} />
          <div
            style={{
              marginLeft: 12,
              flex: 1,
              height: 16,
              borderRadius: 999,
              background: "#e2ddf5",
            }}
          />
        </div>

        {variant === "landing" ? (
          <div style={{ padding: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "#8d57f8" }} />
              <div style={{ display: "flex", gap: 14 }}>
                {bar("46px", 8)}
                {bar("46px", 8)}
                {bar("46px", 8)}
              </div>
            </div>
            <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12 }}>
              {bar("62%", 22, "#c9bef0")}
              {bar("48%", 14)}
              {bar("40%", 14)}
              <div
                style={{
                  marginTop: 8,
                  width: 150,
                  height: 34,
                  borderRadius: 999,
                  background: "#8d57f8",
                }}
              />
            </div>
            <div style={{ marginTop: 26, display: "flex", gap: 16 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 96,
                    borderRadius: 12,
                    background: "#f4f1fc",
                    border: "1px solid #e7e1f8",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", height: "calc(100% - 34px)" }}>
            <div style={{ width: 120, background: "#f1eefb", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "#8d57f8" }} />
              {Array.from({ length: 5 }).map((_, i) => (
                <React.Fragment key={i}>{bar("80%", 9)}</React.Fragment>
              ))}
            </div>
            <div style={{ flex: 1, padding: 22 }}>
              {bar("40%", 18, "#c9bef0")}
              <div style={{ marginTop: 18, display: "flex", gap: 14 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ flex: 1, height: 62, borderRadius: 10, background: "#f4f1fc", border: "1px solid #e7e1f8" }} />
                ))}
              </div>
              <div style={{ marginTop: 18, height: 150, borderRadius: 12, background: "#f4f1fc", border: "1px solid #e7e1f8", display: "flex", alignItems: "flex-end", gap: 10, padding: 16 }}>
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: "#8d57f8", opacity: 0.35 + i * 0.09 }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ width: 90, height: 44, background: "linear-gradient(#d9d6e6,#b9b5c9)" }} />
      <div style={{ width: 260, height: 16, borderRadius: 8, background: "#c4c0d4" }} />
    </div>
  );
}

/* Abaixo de 860px trocamos o canvas de 1920px por <MobileSite>.
   Começa em `false` para que o HTML estático/SSR seja sempre o desktop
   (bom pra SEO); o efeito ajusta no cliente antes do preloader sumir. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return isMobile;
}

/* ================================================================= *
 *  PÁGINA                                                            *
 * ================================================================= */
export default function Page() {
  const [servTab, setServTab] = useState<"mobile" | "webapp" | "desktop" | "landing" | "saas">("webapp");
  const [prodTab, setProdTab] = useState<"finance" | "lucena">("finance");
  const [contatoOpen, setContatoOpen] = useState(false);
  const isMobile = useIsMobile();

  // "Software sob medida" lembra a última sub-opção (Mobile / Web App / Desktop)
  const lastSoftware = React.useRef<"mobile" | "webapp" | "desktop">("webapp");
  const pickServ = React.useCallback((t: typeof servTab) => {
    if (t === "mobile" || t === "webapp" || t === "desktop") lastSoftware.current = t;
    setServTab(t);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get("serv");
    const p = q.get("prod");
    if (s === "mobile" || s === "webapp" || s === "desktop" || s === "landing" || s === "saas") setServTab(s);
    if (p === "finance" || p === "lucena") setProdTab(p);
  }, []);

  // rede de segurança: garante que a página apareça mesmo se o "load" demorar
  useEffect(() => {
    const reveal = () => document.documentElement.setAttribute("data-ready", "1");
    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal);
    const t = setTimeout(reveal, 6000);
    return () => {
      window.removeEventListener("load", reveal);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
    {isMobile ? (
      <MobileSite
        onContato={() => setContatoOpen(true)}
        servTab={servTab}
        pickServ={pickServ}
        prodTab={prodTab}
        setProdTab={setProdTab}
        lastSoftware={lastSoftware}
      />
    ) : (
    <div className="figma-outer" style={{ ["--canvas-h" as string]: `${CANVAS_H}px` } as React.CSSProperties}>
      <div className="figma-viewport">
        <div className="figma-canvas">
        {/* ============================= HOME ============================= */}
        <HomeScene onContato={() => setContatoOpen(true)} />

        {/* =========================== SERVIÇOS =========================== */}
        <section
          id="servicos"
          style={{ position: "absolute", left: 0, top: HOME_H, width: CANVAS_W, height: SERV_H, background: "rgba(0,14,82,0.12)", overflow: "hidden" }}
        >
          <img
            src={A("servicos-bg.png")}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, pointerEvents: "none" }}
          />

          <h2 style={{ position: "absolute", left: 120, top: 52, width: 900, margin: 0, fontSize: fs(52), lineHeight: 1.08, fontWeight: 700, color: "#000" }}>
            Nossos principais serviços
          </h2>

          {/* Duas colunas centralizadas na mesma linha horizontal */}
          <div
            style={{
              position: "absolute",
              left: 120,
              right: 76,
              top: 208,
              height: 486,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 44,
            }}
          >
            {/* Coluna esquerda: pills + cardbox */}
            <div style={{ width: 660, flex: "none" }}>
              <ServicePillsRow tab={servTab} setTab={pickServ} lastSoftware={lastSoftware} />

              <div
                className="fx-lift"
                style={{
                  position: "relative",
                  marginTop: 20,
                  width: 660,
                  height: 328,
                  borderRadius: 40,
                  background: "#8d57f8",
                  overflow: "hidden",
                  boxShadow: "0 44px 90px -34px rgba(141,87,248,.55)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 78,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 42px",
                  }}
                >
                  <p
                    key={servTab}
                    className="anim-fade"
                    style={{ margin: 0, textAlign: "center", fontSize: fs(22), lineHeight: 1.36, fontWeight: 700, color: "#fff" }}
                  >
                    {SERVICE_TEXT[servTab]}
                  </p>
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 78,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    key={servTab}
                    className="anim-fade"
                    style={{ margin: 0, textAlign: "center", fontSize: fs(28), fontWeight: 700, color: "#000", whiteSpace: "nowrap" }}
                  >
                    {SERVICE_PILL_TITLE[servTab]}
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna direita: mockups + sub-abas */}
            <ServiceMockups tab={servTab} setTab={pickServ} />
          </div>
        </section>

        {/* =========================== BRIEFING =========================== */}
        <section
          id="briefing"
          style={{ position: "absolute", left: 0, top: HOME_H + SERV_H, width: CANVAS_W, height: BRIEF_H, background: "#f4f1fc", overflow: "hidden" }}
        >
          {/* Círculo decorativo atrás da cena */}
          <div
            style={{
              position: "absolute",
              left: 1120,
              top: -160,
              width: 900,
              height: 900,
              borderRadius: "50%",
              background: "#8d57f8",
              opacity: 0.12,
              pointerEvents: "none",
            }}
          />

          {/* Eyebrow */}
          <div
            style={{
              position: "absolute",
              left: 120,
              top: 150,
              background: "#fff",
              borderRadius: 100,
              padding: "12px 28px",
              fontSize: fs(22),
              fontWeight: 700,
              fontStyle: "italic",
              color: "#8d57f8",
              boxShadow: "0 12px 30px -14px rgba(141,87,248,.4)",
            }}
          >
            Briefing
          </div>

          {/* Título */}
          <h2 style={{ position: "absolute", left: 120, top: 232, width: 820, margin: 0, fontSize: fs(56), lineHeight: 1.12, fontWeight: 700, color: "#000" }}>
            Entendemos o seu problema e entregamos a solução
          </h2>

          {/* Texto */}
          <p style={{ position: "absolute", left: 123, top: 468, width: 760, margin: 0, fontSize: fs(24), lineHeight: 1.45, fontWeight: 700, color: "#6c6969" }}>
            A GB Company faz o briefing do que a sua empresa precisa, mergulha no seu problema e resolve com um sistema sob medida — feito para atender exatamente às suas exigências.
          </p>

          {/* CTA WhatsApp */}
          <a
            className="fx-cta fx-cta-blue"
            href={WPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              left: 123,
              top: 656,
              width: 470,
              height: 77,
              borderRadius: 10,
              background: "#8d57f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              textDecoration: "none",
              fontSize: fs(24),
              fontWeight: 700,
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            Falar com um especialista
            <Wpp size={30} color="#ffffff" />
          </a>

          {/* Foto: reunião de briefing da GB Company */}
          <div
            className="fx-lift"
            style={{
              position: "absolute",
              left: 1000,
              top: 208,
              width: 850,
              height: 478,
              borderRadius: 28,
              overflow: "hidden",
              background: "#e9e3fb",
              boxShadow: "0 50px 90px -30px rgba(24,20,46,.4)",
            }}
          >
            <img
              src={A("briefing.png")}
              alt="Equipe da GB Company em reunião de briefing com clientes"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* =========================== PRODUTOS =========================== */}
        <section
          id="produtos"
          style={{
            position: "absolute",
            left: 0,
            top: HOME_H + SERV_H + BRIEF_H,
            width: CANVAS_W,
            height: PROD_H,
            background: prodTab === "finance" ? "#171e57" : "#290002",
            overflow: "hidden",
            transition: "background .4s",
          }}
        >
          <img
            src={A("produtos-bg.png")}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.1, pointerEvents: "none" }}
          />

          {PROD_BETA[prodTab] && (
            <span
              className="prod-beta"
              style={{
                position: "absolute",
                right: 120,
                top: 60,
                fontSize: fs(13),
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "#fff",
                background: "#8d57f8",
                padding: "4px 11px",
                borderRadius: 6,
              }}
            >
              BETA
            </span>
          )}
          <h2 style={{ position: "absolute", left: 120, top: 52, width: 900, margin: 0, fontSize: fs(52), lineHeight: 1.08, fontWeight: 700, color: "#fff" }}>
            Um pouco da gbcompany
          </h2>
          <p style={{ position: "absolute", left: 123, top: 130, width: 620, margin: 0, fontSize: fs(20), lineHeight: 1.4, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>
            Alguns dos produtos que já construímos e mantemos no ar.
          </p>

          {/* Duas colunas centralizadas na mesma linha horizontal */}
          <div
            style={{
              position: "absolute",
              left: 120,
              right: 76,
              top: 208,
              height: 486,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 44,
            }}
          >
            {/* Coluna esquerda: pills + cardbox */}
            <div style={{ width: 660, flex: "none" }}>
              <ProductPills tab={prodTab} setTab={setProdTab} />

              <div
                className="fx-lift"
                style={{
                  position: "relative",
                  marginTop: 20,
                  width: 660,
                  height: 328,
                  borderRadius: 40,
                  background: "#fff",
                  overflow: "hidden",
                  boxShadow: "0 44px 90px -34px rgba(0,0,0,.45)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 44px",
                  }}
                >
                  <p
                    key={prodTab}
                    className="anim-fade"
                    style={{
                      margin: 0,
                      textAlign: "center",
                      fontSize: fs(21),
                      lineHeight: 1.42,
                      fontWeight: 700,
                      color: prodTab === "finance" ? "#171e57" : "#6b0f14",
                    }}
                  >
                    {prodTab === "finance"
                      ? 'App de controle financeiro mês a mês. Acompanhe o saldo disponível, contas, receitas e despesas (fixas e variáveis), com orçamento de gastos, metas de "guardar" e análises visuais.'
                      : "Plataforma Rede Lucena: App nativo para clientes fazerem pedidos e acompanharem entregas; no painel web a rede gere estoque, campanhas e financeiro."}
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna direita: mockups */}
            <ProductShowcase tab={prodTab} />
          </div>
        </section>

        {/* ========================== FECHAMENTO ========================= */}
        <section
          style={{
            position: "absolute",
            left: 0,
            top: HOME_H + SERV_H + BRIEF_H + PROD_H,
            width: CANVAS_W,
            height: FECH_H,
            background: "#5672f8",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 1500,
              top: 60,
              fontSize: fs(480),
              fontWeight: 700,
              lineHeight: 1,
              color: "rgba(255,255,255,0.08)",
              whiteSpace: "nowrap",
            }}
          >
            {"}"}
          </span>

          <div style={{ background: "#fff", borderRadius: 100, padding: "14px 28px", position: "relative" }}>
            <span style={{ fontSize: fs(22), fontWeight: 700, fontStyle: "italic", color: "#5672f8" }}>Fale conosco</span>
          </div>
          <p style={{ width: 1300, margin: 0, textAlign: "center", fontSize: fs(48), fontWeight: 700, color: "#fff", position: "relative" }}>
            Ajudamos a sua empresas a alavancar os números com sistemas inteligentes.
          </p>
          <a
            className="fx-cta fx-cta-purple"
            href={WPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "26px 48px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              position: "relative",
            }}
          >
            <Wpp size={32} color="#5672f8" />
            <span style={{ fontSize: fs(28), fontWeight: 700, color: "#5672f8" }}>Chamar no WhatsApp</span>
          </a>
        </section>

        {/* ============================ FOOTER =========================== */}
        <footer
          style={{
            position: "absolute",
            left: 0,
            top: HOME_H + SERV_H + BRIEF_H + PROD_H + FECH_H,
            width: CANVAS_W,
            height: FOOT_H,
            background: "#fff",
            overflow: "hidden",
          }}
        >
          <img src={A("logo.png")} alt="GB Company" style={{ position: "absolute", left: 165, top: 81, width: 90, height: 90 }} />
          <p style={{ position: "absolute", left: 110, top: 208, width: 200, margin: 0, fontSize: fs(24), fontWeight: 700, color: "#6c6969", textAlign: "center" }}>
            Copyright 2026
          </p>
          <p style={{ position: "absolute", left: 594, top: 117, width: 731, margin: 0, fontSize: fs(22), fontWeight: 700, fontStyle: "italic", color: "#000", textAlign: "center" }}>
            &quot;Falou-lhes, pois, Jesus outra vez, dizendo: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida&quot;.
          </p>
          <p style={{ position: "absolute", left: 594, top: 201, width: 731, margin: 0, fontSize: fs(22), fontWeight: 700, fontStyle: "italic", color: "#5672f8", textAlign: "center" }}>
            João 8:12
          </p>

          {/* Redes */}
          <a href={`mailto:${"gbcompanyltda@gmail.com"}`} aria-label="E-mail" style={{ position: "absolute", left: 1638, top: 121, width: 48, height: 48, color: "#5672f8" }}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M3 6l9 6 9-6" />
            </svg>
          </a>
          <a href={WPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ position: "absolute", left: 1714, top: 120, width: 48, height: 48, color: "#000" }}>
            <Wpp size={48} color="#000" />
          </a>
        </footer>
        </div>
      </div>
    </div>
    )}
    <ContactModal open={contatoOpen} onClose={() => setContatoOpen(false)} />
    </>
  );
}

/* ================================================================= *
 *  Modal de contato — abre pelo botão "Contato" do header            *
 * ================================================================= */
const MAIL = "gbcompanyltda@gmail.com";

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      className={`cm-overlay ${open ? "cm-in" : "cm-out"}`}
      onClick={onClose}
      onAnimationEnd={() => {
        if (!open) setMounted(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Informações de contato"
    >
      <div className="cm-card" onClick={(e) => e.stopPropagation()}>
        <div className="cm-head">
          <div>
            <p className="cm-title">Fale com a GB Company</p>
            <p className="cm-sub">Escolha o melhor canal pra você</p>
          </div>
          <button type="button" className="cm-x" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        <a className="cm-row" href={WPP} target="_blank" rel="noopener noreferrer" onClick={onClose}>
          <span className="cm-ico">
            <Wpp size={20} />
          </span>
          <span>
            <span className="cm-row-label">WhatsApp</span>
            <span className="cm-row-value">(11) 93096-8872</span>
          </span>
        </a>

        <a className="cm-row" href={`mailto:${MAIL}`} onClick={onClose}>
          <span className="cm-ico">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M3 6l9 6 9-6" />
            </svg>
          </span>
          <span>
            <span className="cm-row-label">E-mail</span>
            <span className="cm-row-value">{MAIL}</span>
          </span>
        </a>

      </div>
    </div>
  );
}

/* ================================================================= *
 *  Produtos que ainda estão em BETA (badge no canto da seção)        *
 * ================================================================= */
const PROD_BETA: Record<string, boolean> = {
  finance: true,
  lucena: true,
};

/* ================================================================= *
 *  Textos das abas de Serviços                                       *
 * ================================================================= */
const SERVICE_TEXT: Record<string, string> = {
  webapp:
    "Desenvolvemos soluções digitais personalizadas para as necessidades do seu negócio — de sistemas web e aplicativos mobile a plataformas completas",
  mobile:
    "Aplicativos móveis nativos para iOS e Android — rápidos, offline-first e prontos para escalar junto com o seu negócio.",
  desktop:
    "Sistemas desktop robustos para operações internas, integrações e automações que o navegador não alcança.",
  landing:
    "Landing pages de alta conversão: carregamento instantâneo, SEO afiado e um design sob medida para transformar visitantes em clientes.",
  saas:
    "Plataformas SaaS completas: multiusuário, cobrança recorrente, painéis administrativos e escalabilidade na nuvem — do MVP ao produto maduro.",
};
const SERVICE_PILL_TITLE: Record<string, string> = {
  webapp: "Software sob medida",
  mobile: "Software sob medida",
  desktop: "Software sob medida",
  landing: "Landing Pages",
  saas: "SaaS",
};

/* --- Case real de Landing Page (Levi Jorda Home Care) ---------- */
function LandingCase() {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* só o monitor + o celular, sem caixa (PNG com fundo recortado) */}
      <img
        src={`${bp}/levijorda-devices.png`}
        alt="Landing page da Levi Jorda Home Care desenvolvida pela GB Company"
        style={{ display: "block", width: "100%" }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 8 }}>
        <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28c840" }} />
        <span style={{ fontSize: fs(22), fontWeight: 700, color: "#000" }}>
          Case entregue pela GB Company — Levi Jorda Home Care
        </span>
      </div>
    </div>
  );
}

/* --- Monitor desktop com a tela "Seu projeto aqui" ------------- */
function DesktopMockup() {
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 640,
          borderRadius: 18,
          border: "14px solid #1e1b2e",
          background: "#fff",
          overflow: "hidden",
          boxShadow: "0 40px 80px -20px rgba(24,20,46,.45)",
        }}
      >
        <img src={A("servicos-screen.png")} alt="Seu projeto aqui" style={{ display: "block", width: "100%" }} />
      </div>
      {/* pé do monitor */}
      <div style={{ width: 84, height: 42, background: "linear-gradient(#d9d6e6,#b9b5c9)" }} />
      <div style={{ width: 280, height: 16, borderRadius: 9, background: "#c4c0d4" }} />
    </div>
  );
}

/* --- Encolhe um mockup de tamanho fixo mantendo a caixa de layout - */
function Scaled({ k, w, h, children }: { k: number; w: number; h: number; children: React.ReactNode }) {
  return (
    <div className="fx-mock" style={{ width: Math.round(w * k), height: Math.round(h * k) }}>
      <div style={{ width: w, height: h, transform: `scale(${k})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

type ServTab = "mobile" | "webapp" | "desktop" | "landing" | "saas";
const SOFTWARE_SUB = [
  ["mobile", "Mobile"],
  ["webapp", "Web App"],
  ["desktop", "Desktop"],
] as const;

/* --- Pills de Serviços — categoria, uma ao lado da outra -------- */
function ServicePillsRow({
  tab,
  setTab,
  lastSoftware,
}: {
  tab: ServTab;
  setTab: (t: ServTab) => void;
  lastSoftware: React.RefObject<"mobile" | "webapp" | "desktop">;
}) {
  const isSoftware = tab === "mobile" || tab === "webapp" || tab === "desktop";

  const pill: React.CSSProperties = {
    height: 52,
    borderRadius: 100,
    fontSize: fs(21),
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0 8px 22px -12px rgba(24,20,46,.3)",
  };
  const on: React.CSSProperties = { background: "#8d57f8", color: "#fff" };
  const off: React.CSSProperties = { background: "#fff", color: "#000" };

  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <div
        className="fx-pill fx-pill-flat"
        data-active={isSoftware}
        onMouseEnter={() => !isSoftware && setTab(lastSoftware.current)}
        onClick={() => setTab(lastSoftware.current)}
        style={{ ...pill, ...(isSoftware ? on : off) }}
      >
        Software sob medida
      </div>
      <div
        className="fx-pill fx-pill-flat"
        data-active={tab === "landing"}
        onMouseEnter={() => setTab("landing")}
        onClick={() => setTab("landing")}
        style={{ ...pill, ...(tab === "landing" ? on : off) }}
      >
        Landing Pages
      </div>
      <div
        className="fx-pill fx-pill-flat"
        data-active={tab === "saas"}
        onMouseEnter={() => setTab("saas")}
        onClick={() => setTab("saas")}
        style={{ ...pill, ...(tab === "saas" ? on : off) }}
      >
        SaaS
      </div>
    </div>
  );
}

/* --- Mockups de Serviços + sub-abas de Software abaixo deles ---- */
function ServiceMockups({ tab, setTab }: { tab: ServTab; setTab: (t: ServTab) => void }) {
  const isSoftware = tab === "mobile" || tab === "webapp" || tab === "desktop";
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Mockups — faixa de altura fixa */}
      <div style={{ height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          key={tab}
          className="anim-card"
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 32 }}
        >
          {tab === "landing" && (
            <div className="fx-mock" style={{ width: 580 }}>
              <LandingCase />
            </div>
          )}
          {tab === "saas" && <Scaled k={0.92} w={620} h={448}><GenericMonitor variant="saas" /></Scaled>}
          {tab === "desktop" && <Scaled k={0.83} w={640} h={490}><DesktopMockup /></Scaled>}
          {tab === "webapp" && (
            <>
              <img className="fx-mock" src={A("mockup-note.png")} alt="Seu projeto aqui" style={{ height: 353, width: "auto", display: "block" }} />
              <img className="fx-mock" src={A("mockup-mobile.png")} alt="Seu projeto aqui" style={{ height: 391, width: "auto", display: "block" }} />
            </>
          )}
          {tab === "mobile" && (
            <img className="fx-mock" src={A("mockup-mobile.png")} alt="Seu projeto aqui" style={{ height: 416, width: "auto", display: "block" }} />
          )}
        </div>
      </div>

      {/* Sub-abas de "Software sob medida" — abaixo dos mockups */}
      <div
        style={{
          display: "flex",
          gap: 12,
          height: 44,
          opacity: isSoftware ? 1 : 0,
          transform: isSoftware ? "translateY(0)" : "translateY(8px)",
          pointerEvents: isSoftware ? "auto" : "none",
          transition: "opacity .25s ease, transform .25s ease",
        }}
      >
        {SOFTWARE_SUB.map(([key, label]) => (
          <div
            key={key}
            className="fx-pill fx-pill-flat"
            data-active={tab === key}
            onMouseEnter={() => setTab(key)}
            onClick={() => setTab(key)}
            style={{
              height: 44,
              borderRadius: 100,
              fontSize: fs(17),
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 22px",
              whiteSpace: "nowrap",
              cursor: "pointer",
              userSelect: "none",
              background: tab === key ? "#8d57f8" : "#fff",
              color: tab === key ? "#fff" : "#3a2f57",
              boxShadow: "0 8px 20px -10px rgba(24,20,46,.3)",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Mockups de Produtos (coluna direita) --------------------- */
function ProductShowcase({ tab }: { tab: "finance" | "lucena" }) {
  return (
    <div style={{ flex: 1, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        key={tab}
        className="anim-card"
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 32 }}
      >
        {tab === "finance" ? (
          <>
            <img className="fx-mock" src={A("mockup-finance-1.png")} alt="App Finance" style={{ height: 403, width: "auto", display: "block" }} />
            <img className="fx-mock" src={A("mockup-finance-2.png")} alt="App Finance" style={{ height: 403, width: "auto", display: "block" }} />
          </>
        ) : (
          <>
            <img className="fx-mock" src={A("mockup-lucena-laptop.png")} alt="Painel Rede Lucena" style={{ height: 330, width: "auto", display: "block" }} />
            <img className="fx-mock" src={A("mockup-lucena-phone.png")} alt="App Rede Lucena" style={{ height: 403, width: "auto", display: "block" }} />
          </>
        )}
      </div>
    </div>
  );
}

/* --- Pills de Produtos — uma ao lado da outra, acima do cardbox - */
function ProductPills({ tab, setTab }: { tab: "finance" | "lucena"; setTab: (t: "finance" | "lucena") => void }) {
  const pill: React.CSSProperties = {
    height: 52,
    borderRadius: 100,
    fontSize: fs(21),
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 28px",
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    boxShadow: "0 10px 26px -14px rgba(0,0,0,.5)",
  };

  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
      <div
        className="fx-pill"
        data-active={tab === "lucena"}
        onMouseEnter={() => setTab("lucena")}
        onClick={() => setTab("lucena")}
        style={{ ...pill, background: tab === "lucena" ? "#6b0f14" : "#fff", color: tab === "lucena" ? "#fff" : "#6b0f14" }}
      >
        Rede Lucena
      </div>
      <div
        className="fx-pill"
        data-active={tab === "finance"}
        onMouseEnter={() => setTab("finance")}
        onClick={() => setTab("finance")}
        style={{ ...pill, background: tab === "finance" ? "#171e57" : "#fff", color: tab === "finance" ? "#fff" : "#171e57" }}
      >
        Finance
      </div>
    </div>
  );
}

/* ================================================================= *
 *  HOME — entrada da página + notebook "sistema vivo"                *
 * ================================================================= */
const SERVICES = ["Websites", "Apps Mobile", "Sistemas Web", "Dashboards", "Integrações"];

const ptInt = (n: number) => Math.round(n).toLocaleString("pt-BR");
const ptBRL = (n: number) => "R$ " + Math.round(n).toLocaleString("pt-BR");

/* número que sobe na entrada e depois oscila de leve (dashboard "vivo") */
function useLiveNumber(base: number, active: boolean) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 950;
    const loop = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(base * (1 - Math.pow(1 - p, 3)));
      raf = p < 1 ? requestAnimationFrame(loop) : 0;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, base]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setN((v) => {
        const amp = Math.max(1, base * 0.0035);
        const next = v + (Math.random() - 0.42) * amp * 2;
        return Math.min(base * 1.04, Math.max(base * 0.92, next));
      });
    }, 3600);
    return () => clearInterval(id);
  }, [active, base]);

  return n;
}

/* mini gráfico que "cresce" periodicamente */
function MiniChart({ active }: { active: boolean }) {
  const [bars, setBars] = useState<number[]>([34, 52, 40, 62, 46, 70, 54]);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setBars(Array.from({ length: 7 }, () => 26 + Math.round(Math.random() * 68))),
      4200,
    );
    return () => clearInterval(id);
  }, [active]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 54 }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 11,
            height: `${h}%`,
            borderRadius: 3,
            background: i === 6 ? "#5672f8" : "#cdbff2",
            transition: "height .9s cubic-bezier(.16, 1, .3, 1)",
          }}
        />
      ))}
    </div>
  );
}

/* rolagem suave com easing até uma seção (clique no play / nav) */
function goToSection(id: string, e?: { preventDefault(): void }) {
  e?.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  const reduce =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const flash = () => {
    el.classList.add("section-arrive");
    window.setTimeout(() => el.classList.remove("section-arrive"), 1000);
  };

  if (reduce) {
    window.scrollTo(0, targetY);
    history.replaceState(null, "", "#" + id);
    return;
  }

  const startY = window.scrollY;
  const dist = targetY - startY;
  const dur = Math.min(1300, Math.max(600, Math.abs(dist) * 0.5));
  const t0 = performance.now();
  const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
    else {
      history.replaceState(null, "", "#" + id);
      flash();
    }
  };
  requestAnimationFrame(step);
}

function playToProdutos(e: React.MouseEvent) {
  e.preventDefault();
  const btn = document.querySelector<HTMLElement>(".hi-play");
  if (btn) {
    btn.classList.remove("hi-play-go");
    // reinicia a animação
    void btn.offsetWidth;
    btn.classList.add("hi-play-go");
    window.setTimeout(() => btn.classList.remove("hi-play-go"), 650);
  }
  goToSection("produtos");
}

/* círculo azul do hero — rede de conexões "cerebrais" com um ícone em cada nó */

/* ícones desenhados num quadro 0..24, centro em (12,12) */
const ORB_ICONS: React.ReactNode[] = [
  /* 0 — dinheiro ($ >) */
  (
    <g key="i0">
      <text
        x="9"
        y="12.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="ui-monospace, Menlo, Consolas, monospace"
        fontSize="15"
        fontWeight="700"
        fill="rgba(255,255,255,0.95)"
        stroke="none"
      >
        $
      </text>
      <path d="M15 8l4 4-4 4" />
    </g>
  ),
  /* 1 — alavancar (curva de crescimento) */
  (
    <g key="i1">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </g>
  ),
  /* 2 — usuários */
  (
    <g key="i2">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2S14.5 16 14.5 19" />
      <circle cx="16.6" cy="9" r="2.3" />
      <path d="M15.2 14c2.7-.1 5 1.9 5 5" />
    </g>
  ),
  /* 3 — transações */
  (
    <g key="i3">
      <path d="M4 9h14" />
      <path d="M14 5l4 4-4 4" />
      <path d="M20 15H6" />
      <path d="M10 11l-4 4 4 4" />
    </g>
  ),
  /* 4 — smartphone */
  (
    <g key="i4">
      <rect x="7" y="2.5" width="10" height="19" rx="2.6" />
      <path d="M10.5 18.4h3" />
    </g>
  ),
  /* 5 — dashboard */
  (
    <g key="i5">
      <rect x="3.6" y="3.6" width="7.4" height="7.4" rx="1.6" />
      <rect x="13" y="3.6" width="7.4" height="7.4" rx="1.6" />
      <rect x="3.6" y="13" width="7.4" height="7.4" rx="1.6" />
      <rect x="13" y="13" width="7.4" height="7.4" rx="1.6" />
    </g>
  ),
  /* 6 — carrinho */
  (
    <g key="i6">
      <path d="M3 4h2l2.5 11.5a1.6 1.6 0 0 0 1.6 1.3h8a1.6 1.6 0 0 0 1.6-1.3L21 7.5H6" />
      <circle cx="9.5" cy="20" r="1.5" />
      <circle cx="17.5" cy="20" r="1.5" />
    </g>
  ),
];

/* =============================================================== *
 *  Círculo do hero — "circuitos cerebrais": malha neural densa de   *
 *  partículas + linhas finas + 7 ícones pequenos. Tudo gira junto   *
 *  com o círculo, em opacidade baixa (parece fazer parte da esfera).*
 * =============================================================== */
const ORB_CENTER = 520;
const ORB_R = 500;

/* hash inteiro determinístico (idêntico no servidor e no cliente — evita
   qualquer divergência de hidratação em valores serializados no SVG) */
function orbRand(i: number, ch: number) {
  let h = Math.imul(i + 1, 2654435761) ^ Math.imul(ch + 1, 40503);
  h = Math.imul(h ^ (h >>> 15), 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/* partículas espalhadas pelo disco (espiral áurea + jitter) */
const ORB_PARTICLES: [number, number][] = Array.from({ length: 66 }, (_, i) => {
  const t = (i + 0.7) / 66;
  const rad = Math.min(ORB_R, ORB_R * Math.sqrt(t) * (0.66 + orbRand(i, 0) * 0.48));
  const ang = i * 2.399963 + orbRand(i, 1) * 1.3;
  return [
    Math.round(ORB_CENTER + Math.cos(ang) * rad),
    Math.round(ORB_CENTER + Math.sin(ang) * rad),
  ];
});

/* nós com ícone — pequenos, e também fazem parte da malha */
const ORB_NODES: [number, number][] = ORB_ICONS.map((_, i) => {
  const n = ORB_ICONS.length;
  const ang = (i / n) * Math.PI * 2 + (i % 2 ? 0.5 : -0.32);
  const rad = [360, 235, 430, 300, 195, 400, 465][i];
  return [
    Math.round(ORB_CENTER + Math.cos(ang) * rad),
    Math.round(ORB_CENTER + Math.sin(ang) * rad),
  ];
});

/* todos os pontos da malha: partículas primeiro, ícones depois */
const ORB_POINTS: [number, number][] = [...ORB_PARTICLES, ...ORB_NODES];

/* arestas: liga cada ponto aos vizinhos mais próximos dentro de um raio */
const ORB_MESH: [number, number][] = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  ORB_POINTS.forEach((p, i) => {
    const near = ORB_POINTS
      .map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])] as [number, number])
      .filter(([j, d]) => j !== i && d < 165)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);
    near.forEach(([j]) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(i < j ? [i, j] : [j, i]);
      }
    });
  });
  return out;
})();

/* algumas arestas ganham pulso viajante */
const ORB_PULSE_EDGES = [3, 19, 37, 58, 74].filter((k) => k < ORB_MESH.length);

/* números soltos girando junto (estética de "dados/circuito") */
const ORB_NUMS = ["2343", "4499", "3180", "512", "1024", "2931"].map((v, i) => {
  const p = ORB_PARTICLES[(i * 8 + 5) % ORB_PARTICLES.length];
  return { v, x: p[0] + 12, y: p[1] - 9 };
});

function HeroOrb() {
  return (
    <div
      className="hi-orb"
      style={{ position: "absolute", left: 880, top: -300, width: 1040, height: 1040, pointerEvents: "none" }}
    >
      <div className="hero-orb-inner" style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#5672f8" }} />
        <svg viewBox="0 0 1040 1040" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <clipPath id="hi-orb-clip">
              <circle cx="520" cy="520" r="520" />
            </clipPath>
          </defs>
          <g clipPath="url(#hi-orb-clip)">
            {/* anéis de profundidade girando devagar, ao fundo */}
            <g className="orb-spin" style={{ transformOrigin: "520px 520px" }}>
              <circle cx="520" cy="520" r="470" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
              <circle cx="520" cy="520" r="330" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1.5" strokeDasharray="4 16" />
            </g>

            {/* MALHA NEURAL — gira junto com o círculo, opacidade baixa */}
            <g className="orb-net" style={{ transformOrigin: "520px 520px" }} opacity={0.6}>
              {/* linhas finas da malha */}
              <g stroke="rgba(255,255,255,0.45)" strokeWidth="0.85" strokeLinecap="round">
                {ORB_MESH.map(([i, j], k) => {
                  const a = ORB_POINTS[i];
                  const b = ORB_POINTS[j];
                  return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />;
                })}
              </g>

              {/* caminhos (invisíveis) para os pulsos */}
              {ORB_PULSE_EDGES.map((k) => {
                const a = ORB_POINTS[ORB_MESH[k][0]];
                const b = ORB_POINTS[ORB_MESH[k][1]];
                return (
                  <path key={`mp${k}`} id={`m${k}`} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} fill="none" stroke="none" />
                );
              })}

              {/* partículas */}
              <g fill="rgba(255,255,255,0.55)">
                {ORB_PARTICLES.map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={Math.round((1.4 + orbRand(i, 2) * 2) * 10) / 10} />
                ))}
              </g>

              {/* números */}
              <g
                fill="rgba(255,255,255,0.26)"
                fontFamily="ui-monospace, Menlo, Consolas, monospace"
                fontSize="15"
                fontWeight={600}
              >
                {ORB_NUMS.map((n, i) => (
                  <text key={i} x={n.x} y={n.y}>
                    {n.v}
                  </text>
                ))}
              </g>

              {/* pulsos viajantes */}
              {ORB_PULSE_EDGES.map((k, n) => (
                <circle key={`pc${n}`} r="2.1" fill="#ffffff" opacity="0">
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.12;0.85;1"
                    dur={`${2.6 + n * 0.7}s`}
                    begin={`${n * 0.7}s`}
                    repeatCount="indefinite"
                  />
                  <animateMotion dur={`${2.6 + n * 0.7}s`} begin={`${n * 0.7}s`} repeatCount="indefinite">
                    <mpath href={`#m${k}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* ícones pequenos */}
              {ORB_NODES.map(([x, y], i) => (
                <g key={`n${i}`} className="hi-node" style={{ animationDelay: `${i * 0.5}s` }}>
                  <circle cx={x} cy={y} r="16.5" fill="#5672f8" />
                  <circle cx={x} cy={y} r="16.5" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
                  <g
                    transform={`translate(${x - 9.6} ${y - 9.6}) scale(0.8)`}
                    stroke="rgba(255,255,255,0.92)"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  >
                    {ORB_ICONS[i]}
                  </g>
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function HomeScene({ onContato }: { onContato: () => void }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    if (el.hasAttribute("data-ready")) {
      setEntered(true);
      return;
    }
    const mo = new MutationObserver(() => {
      if (el.hasAttribute("data-ready")) {
        setEntered(true);
        mo.disconnect();
      }
    });
    mo.observe(el, { attributes: true, attributeFilter: ["data-ready"] });
    const fb = setTimeout(() => setEntered(true), 6500);
    return () => {
      mo.disconnect();
      clearTimeout(fb);
    };
  }, []);

  const vendas = useLiveNumber(12480, entered);
  const clientes = useLiveNumber(1248, entered);

  const cardBox: React.CSSProperties = {
    padding: "11px 15px",
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 20px 44px -18px rgba(24,20,46,.4)",
    border: "1px solid rgba(24,20,46,.05)",
  };
  const cardLabel: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#8b8794" };
  const cardValue: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 800,
    color: "#1e1b2e",
    marginTop: 3,
    fontVariantNumeric: "tabular-nums",
  };
  const cardUp: React.CSSProperties = { fontSize: 11, fontWeight: 700, color: "#28c840", marginTop: 2 };

  return (
    <section
      id="home"
      className={entered ? "home-in" : undefined}
      style={{ position: "absolute", left: 0, top: 0, width: CANVAS_W, height: HOME_H, background: "#ffffff", overflow: "hidden" }}
    >
      {/* Ellipse azul + partículas / conexões girando lentamente */}
      <HeroOrb />

      {/* Título */}
      <h1
        className="hi-title"
        style={{
          position: "absolute",
          left: 120,
          top: 169,
          width: 700,
          margin: 0,
          fontSize: fs(64),
          lineHeight: 1.1,
          fontWeight: 700,
          color: "#000000",
        }}
      >
        Software sob medida para o seu negócio crescer
      </h1>

      {/* Subtítulo */}
      <p
        className="hi-sub"
        style={{
          position: "absolute",
          left: 123,
          top: 377,
          width: 700,
          margin: 0,
          fontSize: fs(24),
          fontWeight: 700,
          lineHeight: 1.35,
          color: "#6c6969",
        }}
      >
        Transforme ideias em sistemas que dão produtividade e potencializam a sua empresa
      </p>

      {/* Linha de serviços (marquee lento) — ocupa o vão entre subtítulo e botão */}
      <div
        className="hi-serv"
        style={{
          position: "absolute",
          left: 123,
          top: 452,
          width: 780,
          height: 34,
          overflow: "hidden",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
          maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
        }}
      >
        <div className="hi-serv-track" style={{ display: "flex", width: "max-content" }}>
          {[0, 1].map((copy) => (
            <div key={copy} style={{ display: "flex", alignItems: "center" }} aria-hidden={copy === 1}>
              {SERVICES.map((s) => (
                <span key={s} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "#8d57f8", margin: "0 22px" }} />
                  <span style={{ fontSize: fs(20), fontWeight: 700, color: "#6c6969" }}>{s}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Botão WhatsApp */}
      <a
        className="hi-btn fx-cta fx-cta-blue"
        href={WPP}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          left: 123,
          top: 504,
          width: 470,
          height: 77,
          borderRadius: 10,
          background: "#8d57f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
          textDecoration: "none",
          fontSize: fs(24),
          fontWeight: 700,
          color: "#ffffff",
          whiteSpace: "nowrap",
        }}
      >
        Falar com um especialista
        <Wpp size={30} color="#ffffff" />
      </a>

      {/* LogoCircle girando + play — clique anima e rola até Produtos */}
      <div className="hi-logo" style={{ position: "absolute", left: 1361, top: 153, width: 136, height: 136, zIndex: 6 }}>
        <a
          className="hi-play"
          href="#produtos"
          aria-label="Ver produtos"
          title="Ver produtos"
          onClick={playToProdutos}
          style={{
            position: "absolute",
            left: 25,
            top: 12,
            width: 250,
            height: 112,
            borderRadius: 100,
            background: "#8d57f8",
            display: "block",
            textDecoration: "none",
          }}
        >
          <span className="hi-play-ring" />
          <img src={A("play.svg")} alt="" style={{ position: "absolute", left: 138, top: 27, width: 79, height: 58 }} />
        </a>
        <img src={A("ellipse-white.svg")} alt="" style={{ position: "absolute", left: 0, top: 0, width: 136, height: 136 }} />
        <img
          className="hi-logo-img"
          src={A("logo.png")}
          alt="GB Company"
          style={{ position: "absolute", left: 28, top: 28, width: 80, height: 80 }}
        />
      </div>
      <a
        className="hi-cap"
        href="#produtos"
        onClick={(e) => goToSection("produtos", e)}
        style={{
          position: "absolute",
          left: 1682,
          top: 194,
          width: 160,
          margin: 0,
          fontSize: fs(24),
          fontWeight: 700,
          fontStyle: "italic",
          color: "#ffffff",
          textDecoration: "none",
        }}
      >
        Dê um play na GB
      </a>

      {/* Notebook — entra com fade + slide-up + scale, depois flutua ~4px */}
      <div className="hi-note" style={{ position: "absolute", left: 1141, top: 399, width: 712, height: 428 }}>
        <div className="hi-note-inner" style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={A("mockup-home.png")}
            alt="Prévia do sistema"
            style={{ position: "absolute", inset: 0, width: 712, height: 428, objectFit: "contain" }}
          />
          {/* camada da tela: cursor percorrendo a UI + notificação */}
          <div
            className="hi-screen"
            style={{
              position: "absolute",
              left: 16,
              top: 10,
              width: 680,
              height: 360,
              overflow: "hidden",
              borderRadius: 8,
              pointerEvents: "none",
            }}
          >
            <div className="hi-cursor" aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 2.5l5.5 15 2.2-6 6-2.2-13.7-6.8z"
                  fill="#1e1b2e"
                  stroke="#fff"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="hi-toast" aria-hidden>
              <span className="hi-toast-dot" />
              Novo pedido recebido
            </div>
          </div>
        </div>
      </div>

      {/* Cards flutuantes — surgem depois do notebook, cada um com float próprio */}
      <div className="hi-float" style={{ position: "absolute", left: 1583, top: 366, zIndex: 7 }}>
        <div className="hi-card-a" style={cardBox}>
          <div style={cardLabel}>Vendas hoje</div>
          <div style={cardValue}>{ptBRL(vendas)}</div>
          <div style={cardUp}>↑ 8% hoje</div>
        </div>
      </div>

      <div className="hi-float" style={{ position: "absolute", left: 1735, top: 612, zIndex: 7 }}>
        <div className="hi-card-b" style={cardBox}>
          <div style={cardLabel}>Clientes ativos</div>
          <div style={cardValue}>{ptInt(clientes)}</div>
          <div style={cardUp}>↑ 5%</div>
        </div>
      </div>

      <div className="hi-float" style={{ position: "absolute", left: 1050, top: 690, zIndex: 7 }}>
        <div className="hi-card-c" style={{ ...cardBox, width: 210 }}>
          <div style={{ ...cardLabel, marginBottom: 8 }}>Vendas · últimos 7 dias</div>
          <MiniChart active={entered} />
        </div>
      </div>

      {/* Faixa de código */}
      <CodeStrip top={987} />

      {/* HEADER (sobreposto) */}
      <header style={{ position: "absolute", left: 0, top: 0, width: CANVAS_W, height: 144, zIndex: 30 }}>
        <img src={A("logo.png")} alt="GB Company" style={{ position: "absolute", left: 98, top: 19, width: 90, height: 90 }} />
        <nav style={{ position: "absolute", left: 1037, top: 28, width: 664, fontSize: fs(24), fontWeight: 700 }}>
          <a className="fx-nav" href="#home" onClick={(e) => goToSection("home", e)} style={{ position: "absolute", left: 235, color: "#fff", textDecoration: "none" }}>Home</a>
          <a className="fx-nav" href="#servicos" onClick={(e) => goToSection("servicos", e)} style={{ position: "absolute", left: 371, color: "#fff", textDecoration: "none" }}>Serviços</a>
          <a className="fx-nav" href="#produtos" onClick={(e) => goToSection("produtos", e)} style={{ position: "absolute", left: 542, color: "#fff", textDecoration: "none" }}>Produtos</a>
        </nav>
        <button
          type="button"
          className="fx-nav"
          onClick={onContato}
          style={{
            position: "absolute",
            left: 1737,
            top: 28,
            border: 0,
            padding: 0,
            background: "transparent",
            fontFamily: "inherit",
            fontSize: fs(24),
            fontWeight: 700,
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Contato
        </button>
      </header>
    </section>
  );
}

/* ================================================================= *
 *  LAYOUT MOBILE (<= 860px)                                          *
 *  Mesma informação do canvas de 1920px, mas empilhada e fluida.     *
 *  Compartilha estado (abas de Serviços/Produtos, modal) com <Page>. *
 * ================================================================= */

/* largura da viewport — atualiza em resize/rotação */
function useViewportWidth() {
  const [w, setW] = useState(390);
  useEffect(() => {
    const sync = () => setW(window.innerWidth);
    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
    };
  }, []);
  return w;
}

/* encaixa um mockup de largura fixa na coluna do mobile */
function MScale({ base, height, avail, children }: { base: number; height: number; avail: number; children: React.ReactNode }) {
  const k = Math.min(1, avail / base);
  return (
    <div className="m-scale" style={{ height: Math.round(height * k) }}>
      <div style={{ width: base, transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

function MobileServiceMocks({ tab, avail }: { tab: ServTab; avail: number }) {
  if (tab === "landing") return <div className="m-mock-full"><LandingCase /></div>;
  if (tab === "saas")
    return (
      <MScale base={620} height={452} avail={avail}>
        <GenericMonitor variant="saas" />
      </MScale>
    );
  if (tab === "desktop")
    return (
      <div className="m-mock-full" style={{ border: "10px solid #1e1b2e", borderRadius: 14, overflow: "hidden" }}>
        <img src={A("servicos-screen.png")} alt="Seu projeto aqui" style={{ display: "block", width: "100%" }} />
      </div>
    );
  if (tab === "webapp")
    return (
      <div className="m-mocks">
        <img className="m-mock-img" src={A("mockup-note.png")} alt="Seu projeto aqui" />
        <img className="m-mock-img" src={A("mockup-mobile.png")} alt="Seu projeto aqui" />
      </div>
    );
  return (
    <div className="m-mocks">
      <img className="m-mock-img m-mock-solo" src={A("mockup-mobile.png")} alt="Seu projeto aqui" />
    </div>
  );
}

function MobileProductMocks({ tab }: { tab: "finance" | "lucena" }) {
  return (
    <div className="m-mocks">
      {tab === "finance" ? (
        <>
          <img className="m-mock-img" src={A("mockup-finance-1.png")} alt="App Finance" />
          <img className="m-mock-img" src={A("mockup-finance-2.png")} alt="App Finance" />
        </>
      ) : (
        <>
          <img className="m-mock-img m-mock-full" src={A("mockup-lucena-laptop.png")} alt="Painel Rede Lucena" style={{ maxWidth: "80%" }} />
          <img className="m-mock-img" src={A("mockup-lucena-phone.png")} alt="App Rede Lucena" style={{ maxWidth: "40%" }} />
        </>
      )}
    </div>
  );
}

function MobileSite({
  onContato,
  servTab,
  pickServ,
  prodTab,
  setProdTab,
  lastSoftware,
}: {
  onContato: () => void;
  servTab: ServTab;
  pickServ: (t: ServTab) => void;
  prodTab: "finance" | "lucena";
  setProdTab: (t: "finance" | "lucena") => void;
  lastSoftware: React.RefObject<"mobile" | "webapp" | "desktop">;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const vw = useViewportWidth();
  const avail = Math.min(560, vw) - 40; // padding lateral da seção = 20 + 20
  const isSoftware = servTab === "mobile" || servTab === "webapp" || servTab === "desktop";

  const goNav = (id: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    goToSection(id, e);
  };

  const prodAccent = prodTab === "finance" ? "#171e57" : "#6b0f14";

  return (
    <div className="m-site">
      {/* ---------- HEADER ---------- */}
      <header className="m-header">
        <img src={A("logo.png")} alt="GB Company" />
        <button
          type="button"
          className="m-burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <nav className="m-nav" data-open={menuOpen}>
          <a href="#home" onClick={goNav("home")}>Home</a>
          <a href="#servicos" onClick={goNav("servicos")}>Serviços</a>
          <a href="#produtos" onClick={goNav("produtos")}>Produtos</a>
          <button type="button" onClick={() => { setMenuOpen(false); onContato(); }}>Contato</button>
        </nav>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="m-hero" id="home">
        <span className="m-hero-orb" />
        <div className="m-inner">
          <h1>Software sob medida para o seu negócio crescer</h1>
          <p className="m-lead">
            Transforme ideias em sistemas que dão produtividade e potencializam a sua empresa
          </p>
          <ul className="m-chips">
            {SERVICES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <a className="m-cta" href={WPP} target="_blank" rel="noopener noreferrer">
            Falar com um especialista <Wpp size={22} color="#fff" />
          </a>
          <img className="m-hero-img" src={A("mockup-home.png")} alt="Prévia do sistema" />
        </div>
      </section>

      {/* ---------- SERVIÇOS ---------- */}
      <section className="m-sec m-serv" id="servicos">
        <div className="m-inner">
          <h2>Nossos principais serviços</h2>

          <div className="m-pills">
            <button type="button" className="m-pill" data-active={isSoftware} onClick={() => pickServ(lastSoftware.current)}>
              Software sob medida
            </button>
            <button type="button" className="m-pill" data-active={servTab === "landing"} onClick={() => pickServ("landing")}>
              Landing Pages
            </button>
            <button type="button" className="m-pill" data-active={servTab === "saas"} onClick={() => pickServ("saas")}>
              SaaS
            </button>
          </div>

          {isSoftware && (
            <div className="m-pills m-subpills">
              {SOFTWARE_SUB.map(([key, label]) => (
                <button key={key} type="button" className="m-pill" data-active={servTab === key} onClick={() => pickServ(key)}>
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="m-card m-card-purple">
            <p key={servTab} className="anim-fade">{SERVICE_TEXT[servTab]}</p>
            <div className="m-card-foot">{SERVICE_PILL_TITLE[servTab]}</div>
          </div>

          <MobileServiceMocks tab={servTab} avail={avail} />
        </div>
      </section>

      {/* ---------- BRIEFING ---------- */}
      <section className="m-sec m-brief" id="briefing">
        <div className="m-inner">
          <span className="m-eyebrow">Briefing</span>
          <h2>Entendemos o seu problema e entregamos a solução</h2>
          <p className="m-lead">
            A GB Company faz o briefing do que a sua empresa precisa, mergulha no seu problema e resolve com um sistema sob medida — feito para atender exatamente às suas exigências.
          </p>
          <a className="m-cta" href={WPP} target="_blank" rel="noopener noreferrer">
            Falar com um especialista <Wpp size={22} color="#fff" />
          </a>
          <img className="m-brief-img" src={A("briefing.png")} alt="Equipe da GB Company em reunião de briefing com clientes" />
        </div>
      </section>

      {/* ---------- PRODUTOS ---------- */}
      <section className="m-sec m-prod" data-prod={prodTab} id="produtos">
        {PROD_BETA[prodTab] && <span className="m-beta">BETA</span>}
        <div className="m-inner">
          <h2>Um pouco da gbcompany</h2>
          <p className="m-lead">Alguns dos produtos que já construímos e mantemos no ar.</p>

          <div className="m-pills m-pills-dark">
            <button
              type="button"
              className="m-pill"
              data-active={prodTab === "lucena"}
              style={prodTab === "lucena" ? { background: "#fff", color: prodAccent } : undefined}
              onClick={() => setProdTab("lucena")}
            >
              Rede Lucena
            </button>
            <button
              type="button"
              className="m-pill"
              data-active={prodTab === "finance"}
              style={prodTab === "finance" ? { background: "#fff", color: prodAccent } : undefined}
              onClick={() => setProdTab("finance")}
            >
              Finance
            </button>
          </div>

          <div className="m-card m-card-white">
            <p key={prodTab} className="anim-fade" style={{ color: prodAccent }}>
              {prodTab === "finance"
                ? 'App de controle financeiro mês a mês. Acompanhe o saldo disponível, contas, receitas e despesas (fixas e variáveis), com orçamento de gastos, metas de "guardar" e análises visuais.'
                : "Plataforma Rede Lucena: App nativo para clientes fazerem pedidos e acompanharem entregas; no painel web a rede gere estoque, campanhas e financeiro."}
            </p>
          </div>

          <MobileProductMocks tab={prodTab} />
        </div>
      </section>

      {/* ---------- FECHAMENTO ---------- */}
      <section className="m-sec m-close">
        <span className="m-eyebrow">Fale conosco</span>
        <p className="m-close-title">
          Ajudamos a sua empresa a alavancar os números com sistemas inteligentes.
        </p>
        <a className="m-cta m-cta-white" href={WPP} target="_blank" rel="noopener noreferrer">
          <Wpp size={22} color="#5672f8" /> Chamar no WhatsApp
        </a>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="m-footer">
        <img src={A("logo.png")} alt="GB Company" />
        <p className="m-verse">
          &quot;Falou-lhes, pois, Jesus outra vez, dizendo: Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida&quot;.
        </p>
        <p className="m-verse-ref">João 8:12</p>
        <div className="m-social">
          <a href={`mailto:${MAIL}`} aria-label="E-mail" style={{ color: "#5672f8" }}>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="M3 6l9 6 9-6" />
            </svg>
          </a>
          <a href={WPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ color: "#000" }}>
            <Wpp size={30} color="#000" />
          </a>
        </div>
        <p className="m-copy">Copyright 2026</p>
      </footer>
    </div>
  );
}
