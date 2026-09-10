import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "GB Company",
  description: "Software sob medida para o seu negócio crescer",
  icons: {
    icon: [{ url: `${basePath}/favicon.png`, type: "image/png" }],
  },
};

/* Roda ANTES do primeiro paint:
   1. define o --figma-scale correto (sem o "pulo" de tamanho ao carregar)
   2. só revela a página (esconde o preloader) depois que TUDO carregou (window load) */
const bootScript = `
(function () {
  var CANVAS_W = 1920;
  function setScale() {
    var w = document.documentElement.clientWidth;
    var s = Math.min(Math.max(w / CANVAS_W, 0.46), 1);
    document.documentElement.style.setProperty('--figma-scale', String(s));
  }
  setScale();
  addEventListener('resize', setScale);
  addEventListener('orientationchange', setScale);

  function reveal() { document.documentElement.setAttribute('data-ready', '1'); }
  if (document.readyState === 'complete') reveal();
  else addEventListener('load', reveal);
  setTimeout(reveal, 6000); // rede de segurança
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={archivoBlack.variable} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <div id="page-preloader" aria-hidden="true">
          {/* Skeleton da dobra — reproduz o layout da HOME enquanto carrega.
             Nada de spinner: o usuário já vê a estrutura da página surgindo. */}
          <div className="sk-canvas">
            {/* círculo azul decorativo do hero */}
            <span className="sk sk-ellipse" style={{ left: 880, top: -300, width: 1040, height: 1040, borderRadius: "50%" }} />

            {/* header: logo + nav + botão contato */}
            <span className="sk" style={{ left: 98, top: 19, width: 90, height: 90, borderRadius: 18 }} />
            <span className="sk" style={{ left: 1272, top: 46, width: 64, height: 18 }} />
            <span className="sk" style={{ left: 1400, top: 46, width: 92, height: 18 }} />
            <span className="sk" style={{ left: 1566, top: 46, width: 92, height: 18 }} />
            <span className="sk" style={{ left: 1737, top: 46, width: 92, height: 18 }} />

            {/* título */}
            <span className="sk" style={{ left: 120, top: 182, width: 660, height: 50 }} />
            <span className="sk" style={{ left: 120, top: 252, width: 610, height: 50 }} />
            <span className="sk" style={{ left: 120, top: 322, width: 380, height: 50 }} />

            {/* subtítulo */}
            <span className="sk" style={{ left: 123, top: 400, width: 800, height: 22 }} />
            <span className="sk" style={{ left: 123, top: 438, width: 560, height: 22 }} />

            {/* botão WhatsApp */}
            <span className="sk" style={{ left: 123, top: 504, width: 470, height: 77, borderRadius: 10 }} />

            {/* logo circle no canto direito */}
            <span className="sk" style={{ left: 1361, top: 153, width: 136, height: 136, borderRadius: "50%" }} />

            {/* mockup do sistema */}
            <span className="sk" style={{ left: 1141, top: 399, width: 712, height: 428, borderRadius: 16 }} />

            {/* faixa de código no rodapé da seção */}
            <span className="sk sk-strip" style={{ left: 0, top: 987, width: 1920, height: 96, borderRadius: 0 }} />
          </div>
          {/* preloader mobile — só o logo pulsando no centro */}
          <img className="m-preload-logo" src={`${basePath}/figma/logo.png`} alt="" aria-hidden="true" />
        </div>
        {children}
      </body>
    </html>
  );
}
