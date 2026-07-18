"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Smartphone,
  Globe,
  ShieldCheck,
  Database,
  Zap,
  ArrowUpRight,
  MessageSquare,
  Sun,
  Moon,
  Monitor,
  HomeIcon,
  Wrench,
  CheckCircle2,
  Clock,
  Users,
  CalendarDays,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);

  // Estado para controlar qual projeto está "ativo" (sem desfoque) no portfólio
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Estado para a aba ativa da vitrine do GBClock
  const [gbclockView, setGbclockView] = useState<"dashboard" | "escala">(
    "dashboard",
  );

  const toggleTheme = () => setDarkMode(!darkMode);
  const wppLink = "https://wa.me/82993919961";
  const [isModalOpen, setIsModalOpen] = useState(false);

  // next/image não prefixa o src com o basePath quando images.unoptimized
  // está ativo (necessário para exportar estático no GitHub Pages).
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  const gbclockContent = {
    dashboard: {
      label: "Dashboard",
      url: "gbclock.vercel.app/dashboard",
      image: `${basePath}/dashboard-preview.png`,
      alt: "Painel de indicadores do GBClock mostrando banco de horas em tempo real",
      caption: "Visão geral do banco de horas, atualizada em tempo real.",
    },
    escala: {
      label: "Escala de Turnos",
      url: "gbclock.vercel.app/escala",
      image: `${basePath}/escala-preview.png`,
      alt: "Escala mensal de turnos do GBClock organizada por cargo",
      caption: "Escala mensal por turno, organizada e pronta para imprimir.",
    },
  } as const;

  return (
    <div
      className={`${darkMode ? "bg-slate-950 text-slate-100" : "bg-gray-200 text-slate-900"} min-h-screen font-sans transition-colors duration-300 selection:bg-indigo-500 selection:text-white`}
    >
      {/* NAVBAR */}
      <header
        className={`border-b ${darkMode ? "border-slate-900 bg-slate-950/80" : "border-slate-200 bg-white/80"} sticky top-0 backdrop-blur-md z-50 transition-colors duration-300 overflow-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={
                darkMode
                  ? `${basePath}/logo-gb-dark.png`
                  : `${basePath}/logo-gb-light.png`
              }
              alt="GB Company Logo"
              width={180}
              height={50}
              priority
              className="object-contain"
            />
          </div>

          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-medium ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            <a
              className={`p-2.5 rounded-xl border transition-all duration-300 ${darkMode ? "bg-slate-900 border-slate-800 text-purple-400 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"}`}
              aria-label="Início"
              href="#home"
            >
              <HomeIcon className="w-5 h-5 inline-block" />
            </a>
            <a
              href="#servicos"
              className={`hover:text-indigo-500 transition ${darkMode ? "hover:text-white" : "hover:text-slate-950"}`}
            >
              Serviços
            </a>
            <a
              href="#gbclock"
              className={`hover:text-indigo-500 transition ${darkMode ? "hover:text-white" : "hover:text-slate-950"}`}
            >
              GBClock
            </a>
            <a
              href="#diferenciais"
              className={`hover:text-indigo-500 transition ${darkMode ? "hover:text-white" : "hover:text-slate-950"}`}
            >
              Diferenciais
            </a>
            <a
              href="#portfolio"
              className={`hover:text-indigo-500 transition ${darkMode ? "hover:text-white" : "hover:text-slate-950"}`}
            >
              Portfólio
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${darkMode ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"}`}
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => window.open(wppLink, "_blank")}
              className={`p-2.5 rounded-xl border transition-all duration-300 ${darkMode ? "bg-slate-900 border-slate-800 text-green-500 hover:bg-slate-800" : "bg-slate-100 border-slate-200 text-green-500 hover:bg-slate-200"}`}
              aria-label="Contato via WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-indigo-600/20"
            >
              Iniciar Projeto
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-16 border-b border-slate-900/10"
      >
        <div
          className={`absolute inset-0 ${darkMode ? "bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.12),transparent_50%)]" : "bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.06),transparent_50%)]"}`}
        />
        <div
          className={`absolute inset-0 opacity-[0.35] ${darkMode ? "bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)]"} bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]`}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-5 animate-fade-in-up">
              <h1
                className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1] ${darkMode ? "text-white" : "text-slate-950"}`}
              >
                Transformamos processos complexos em{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Aplicações de Alta Performance
                </span>
              </h1>
              <p
                className={`text-base sm:text-lg max-w-xl mx-auto lg:mx-0 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Desenvolvemos aplicativos nativos (iOS & Android), plataformas
                SaaS e ecossistemas web sob medida. Conectamos automação
                inteligente, segurança de dados e interfaces de alta conversão
                para escalar o seu negócio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <a
                  href="https://wa.me/82993919961"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-8 py-4 rounded-xl transition shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2 group"
                >
                  Fale com um Especialista
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a
                  href="#gbclock"
                  className={`font-medium px-8 py-4 rounded-xl transition flex items-center justify-center gap-2 border ${darkMode ? "border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-900" : "border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-white"}`}
                >
                  Ver o GBClock em ação
                </a>
              </div>
              <div
                className={`flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-xs sm:text-sm pt-1 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Orçamento sem compromisso
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Resposta rápida via WhatsApp
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Atendimento direto com o desenvolvedor
                </span>
              </div>
            </div>

            {/* VITRINE VISUAL — Mockup de App */}
            <div className="lg:col-span-6 relative lg:block min-h-[380px] sm:min-h-[420px] pt-6 sm:pt-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 opacity-20 blur-3xl rounded-full" />

              {/* Ícone flutuante: números em alta */}
              <div
                className={`animate-float absolute top-0 left-0 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-lg text-xs font-bold ${darkMode ? "bg-slate-900 border-slate-800 text-emerald-400" : "bg-white border-slate-200 text-emerald-600"}`}
              >
                <TrendingUp className="w-4 h-4" />
                +87%
              </div>

              {/* Ícone flutuante: cifrão */}
              <div
                className="animate-float-delayed absolute top-10 right-0 sm:right-6 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white"
              >
                <DollarSign className="w-5 h-5" />
              </div>

              {/* Ícone flutuante: gráfico */}
              <div
                className={`animate-float-delayed absolute bottom-20 left-0 sm:-left-2 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg border ${darkMode ? "bg-slate-900 border-slate-800 text-blue-400" : "bg-white border-slate-200 text-blue-600"}`}
              >
                <BarChart3 className="w-5 h-5" />
              </div>

              {/* Badge: segurança */}
              <div
                className={`animate-float absolute bottom-2 right-0 sm:right-6 z-20 flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-lg text-xs font-semibold ${darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"}`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Seguro & Escalável
              </div>

              {/* CELULAR COM SKELETON DE APP */}
              <div className="relative mx-auto w-60 sm:w-64">
                <div
                  className={`relative rounded-[2.2rem] border-[6px] shadow-2xl overflow-hidden ${darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-900"}`}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-20" />
                  <div className="p-4 pt-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                      <div className="flex gap-1.5">
                        <div
                          className={`w-6 h-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                        />
                        <div
                          className={`w-6 h-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div
                        className={`h-3 w-2/3 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                      <div
                        className={`h-2 w-1/2 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                    </div>

                    <div className="rounded-xl p-3 bg-gradient-to-br from-blue-600 to-purple-600 space-y-2.5">
                      <div className="h-2 w-1/3 rounded-full bg-white/40" />
                      <div className="h-5 w-2/3 rounded-full bg-white/90" />
                      <div className="flex items-end gap-1 h-10 pt-1">
                        <div className="w-full bg-white/30 h-[35%] rounded-t" />
                        <div className="w-full bg-white/50 h-[60%] rounded-t" />
                        <div className="w-full bg-white/70 h-[85%] rounded-t" />
                        <div className="w-full bg-white h-[55%] rounded-t" />
                        <div className="w-full bg-white/80 h-[95%] rounded-t" />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { w: "w-3/4" },
                        { w: "w-2/3" },
                        { w: "w-1/2" },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-lg shrink-0 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                          />
                          <div className="flex-1 space-y-1.5">
                            <div
                              className={`h-2 ${row.w} rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                            />
                            <div
                              className={`h-2 w-1/3 rounded-full ${darkMode ? "bg-slate-800/60" : "bg-slate-100/60"}`}
                            />
                          </div>
                          <span className="text-xs font-bold text-emerald-500">
                            +
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`flex items-center justify-around pt-3 border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}
                    >
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
                      <div
                        className={`w-6 h-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                      <div
                        className={`w-6 h-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                      <div
                        className={`w-6 h-6 rounded-lg ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA DE CONFIANÇA */}
      <section
        className={`border-b py-5 ${darkMode ? "border-slate-900 bg-slate-900/20" : "border-slate-200 bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-center">
          {[
            { icon: MessageSquare, label: "Atendimento direto com o dev" },
            { icon: Zap, label: "Entrega ágil e sob medida" },
            { icon: ShieldCheck, label: "Segurança RLS & LGPD" },
            { icon: Database, label: "SaaS próprio em produção" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-2"
            >
              <Icon
                className={`w-5 h-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}
              />
              <span
                className={`text-xs font-medium leading-tight ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO DE SERVIÇOS */}
      <section
        id="servicos"
        className={`py-14 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b ${darkMode ? "border-slate-900" : "border-slate-100"}`}
      >
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
          >
            Engenharia de Software Focada em Resultados
          </h2>
          <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
            Não criamos apenas telas. Desenvolvemos ferramentas estratégicas
            corporativas que otimizam a sua operação de ponta a ponta.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Serviço 1 */}
          <div
            className={`border rounded-2xl p-8 transition-all flex flex-col justify-between group hover:-translate-y-1 ${darkMode ? "bg-slate-900/30 border-slate-900 hover:border-blue-500/40" : "bg-slate-50 border-slate-200 hover:border-indigo-200 hover:shadow-lg"}`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3
                className={`text-xl font-bold transition ${darkMode ? "text-white group-hover:text-blue-400" : "text-slate-950 group-hover:text-indigo-600"}`}
              >
                Aplicativos Nativos Móveis
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Desenvolvimento focado em iOS e Android utilizando arquitetura
                moderna. Perfeito para sistemas de delivery, força de vendas e
                automação comercial que exigem fluidez e funcionamento offline.
              </p>
            </div>
          </div>

          {/* Serviço 2 */}
          <div
            className={`border rounded-2xl p-8 transition-all flex flex-col justify-between group hover:-translate-y-1 ${darkMode ? "bg-slate-900/30 border-slate-900 hover:border-purple-500/40" : "bg-slate-50 border-slate-200 hover:border-indigo-200 hover:shadow-lg"}`}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3
                className={`text-xl font-bold transition ${darkMode ? "text-white group-hover:text-purple-400" : "text-slate-950 group-hover:text-indigo-600"}`}
              >
                Web Applications & Dashboards
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Plataformas web administrativas robustas integradas a gateways
                de pagamento, controle de estoque e relatórios analíticos em
                tempo real. Performance máxima com foco em UX/UI.
              </p>
            </div>
          </div>
          <div
            className={`md:col-span-2 border rounded-2xl p-8 transition-all flex flex-col justify-between group hover:-translate-y-1 ${darkMode ? "bg-slate-900/30 border-slate-900 hover:border-amber-500/40" : "bg-slate-50 border-slate-200 hover:border-indigo-200 hover:shadow-lg"}`}
          >
            <div className="space-y-4 max-w-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3
                className={`text-xl font-bold transition ${darkMode ? "text-white group-hover:text-amber-500" : "text-slate-950 group-hover:text-indigo-600"}`}
              >
                Aplicativos Personalizados
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Soluções sob medida para necessidades específicas do seu
                negócio. Desde integrações complexas com sistemas legados até
                ferramentas de automação interna, criamos o que for necessário
                para otimizar seus processos e aumentar sua eficiência
                operacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VITRINE GBCLOCK — PRODUTO PRÓPRIO */}
      <section
        id="gbclock"
        className={`py-14 lg:py-20 border-b ${darkMode ? "bg-slate-900/10 border-slate-900" : "bg-white border-slate-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${darkMode ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-emerald-200 bg-emerald-50 text-emerald-600"}`}
            >
              <Clock className="w-3.5 h-3.5" />
              Produto próprio · SaaS
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
            >
              GBClock: ponto, banco de horas e escala em um só lugar
            </h2>
            <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
              Criamos e usamos o GBClock na prática. Um retrato real da
              qualidade que entregamos: rápido, seguro e desenhado para o dia
              a dia do RH.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Vitrine com abas */}
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 blur-3xl rounded-full pointer-events-none" />
              <div
                className={`relative rounded-2xl border shadow-2xl overflow-hidden ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-slate-50 border-slate-200"}`}
              >
                <div
                  className={`flex items-center gap-1.5 px-4 py-3 border-b ${darkMode ? "border-slate-800" : "border-slate-200"}`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <div
                    className={`ml-3 flex-1 h-4 rounded-full flex items-center px-2.5 text-[10px] font-mono gap-1.5 ${darkMode ? "bg-slate-800 text-slate-500" : "bg-slate-200 text-slate-500"}`}
                  >
                    <Globe className="w-3 h-3 shrink-0" />
                    {gbclockContent[gbclockView].url}
                  </div>
                </div>
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={gbclockContent[gbclockView].image}
                    alt={gbclockContent[gbclockView].alt}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <p
                className={`text-xs mt-3 text-center ${darkMode ? "text-slate-500" : "text-slate-500"}`}
              >
                {gbclockContent[gbclockView].caption}
              </p>
            </div>

            {/* Conteúdo + abas */}
            <div className="lg:col-span-5 space-y-6">
              <div
                className={`inline-flex p-1 rounded-xl border gap-1 ${darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}
              >
                <button
                  onClick={() => setGbclockView("dashboard")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    gbclockView === "dashboard"
                      ? "bg-emerald-500 text-white shadow"
                      : darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={() => setGbclockView("escala")}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                    gbclockView === "escala"
                      ? "bg-emerald-500 text-white shadow"
                      : darkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  Escala de Turnos
                </button>
              </div>

              <h3
                className={`text-2xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
              >
                Sua equipe, o ponto e o banco de horas — sob controle total.
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                Do fichar até a folha mensal: o GBClock acompanha saldos
                positivos e negativos por funcionário, organiza a escala por
                cargo e turno, e mantém tudo pronto para impressão em
                segundos.
              </p>

              <ul className="space-y-3">
                {[
                  "Banco de horas com créditos e débitos em tempo real",
                  "Escala mensal por turno, organizada por cargo",
                  "Histórico completo de ponto por funcionário",
                  "Impressão e exportação com um clique",
                ].map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-sm ${darkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://gbclock.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-600/20"
                >
                  Conhecer a plataforma
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition border ${darkMode ? "border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-900" : "border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-50"}`}
                >
                  Quero um sistema assim
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* PORTFÓLIO DE PROJETOS */}
      <section
        id="portfolio"
        className={`py-14 lg:py-20 border-b ${darkMode ? "bg-slate-900/10 border-slate-900" : "bg-gray-200 border-slate-300"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2
                className={`text-3xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
              >
                Soluções desenvolvidas pela GB Company
              </h2>
              <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
                Projetos de alta performance que transformam processos manuais
                em ecossistemas digitais lucrativos, seguros e escaláveis.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {/* CARD 1 - FTA MILAGRES */}
              <div
                onClick={() =>
                  setActiveProject(activeProject === "fta" ? null : "fta")
                }
                onMouseEnter={() => setActiveProject("fta")}
                onMouseLeave={() => setActiveProject(null)}
                className={`p-6 rounded-xl border relative overflow-hidden transition-all duration-500 min-h-[220px] flex flex-col justify-between cursor-pointer select-none ${
                  darkMode
                    ? `bg-slate-900/40 ${activeProject === "fta" ? "border-indigo-500" : "border-slate-900"}`
                    : `bg-white ${activeProject === "fta" ? "border-indigo-500 shadow-md" : "border-slate-200"}`
                }`}
              >
                {/* IMAGEM ESTRUTURAL AO FUNDO (Com desfoque dinâmico) */}
                <div
                  className={`absolute inset-0 z-0 transition-all duration-700 pointer-events-none ${
                    activeProject === "fta"
                      ? "blur-none opacity-100 scale-100"
                      : "blur-[2px] opacity-25 scale-105"
                  }`}
                >
                  <Image
                    src={`${basePath}/ftamilagres.png`}
                    alt="Preview FTA Milagres"
                    fill
                    className="object-cover object-top"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? "bg-slate-950/40" : "bg-white/10"}`}
                  />
                </div>

                {/* CONTEÚDO DO CARD */}
                <div
                  className={`relative z-10 space-y-3 transition-opacity duration-500 ${activeProject === "fta" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <div className="flex items-center gap-1.5 text-indigo-500">
                    <Monitor className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-500">+</span>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4
                    className={`font-bold text-base tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
                  >
                    ftamilagres
                  </h4>
                  <p
                    className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    App nativo para Android e iOS + painel admin que digitalizou
                    o processo de vendas e delivery da maior farmácia da Rota
                    Ecológica dos Milagres em Alagoas.
                  </p>
                </div>
              </div>

              {/* CARD 2 - LEVI JORDA */}
              <div
                onClick={() =>
                  setActiveProject(activeProject === "levi" ? null : "levi")
                }
                onMouseEnter={() => setActiveProject("levi")}
                onMouseLeave={() => setActiveProject(null)}
                className={`p-6 rounded-xl border relative overflow-hidden transition-all duration-500 min-h-[220px] flex flex-col justify-between cursor-pointer select-none ${
                  darkMode
                    ? `bg-slate-900/40 ${activeProject === "levi" ? "border-purple-500" : "border-slate-900"}`
                    : `bg-white ${activeProject === "levi" ? "border-purple-500 shadow-md" : "border-slate-200"}`
                }`}
              >
                {/* IMAGEM ESTRUTURAL AO FUNDO (Com desfoque dinâmico) */}
                <div
                  className={`absolute inset-0 z-0 transition-all duration-700 pointer-events-none ${
                    activeProject === "levi"
                      ? "blur-none opacity-100 scale-100"
                      : "blur-[2px] opacity-25 scale-105"
                  }`}
                >
                  <Image
                    src={`${basePath}/levijordahomecare.png`}
                    alt="Preview Levi Jorda"
                    fill
                    className="object-cover object-top"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${darkMode ? "bg-slate-950/40" : "bg-white/10"}`}
                  />
                </div>

                {/* CONTEÚDO DO CARD */}
                <div
                  className={`relative z-10 space-y-3 transition-opacity duration-500 ${activeProject === "levi" ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                >
                  <div className="flex items-center gap-1.5 text-purple-500">
                    <Monitor className="w-5 h-5" />
                    <span className="text-xs font-bold text-slate-500">+</span>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <h4
                    className={`font-bold text-base tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
                  >
                    Levi Jorda - Home Care
                  </h4>
                  <p
                    className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Landing page moderna e responsiva desenvolvida para
                    profissional de enfermagem domiciliar (home care), com foco
                    em captação de pacientes, apresentação dos serviços e
                    fortalecimento da presença digital.
                  </p>
                </div>
              </div>

              {/* CARD GBCLOCK — atalho para a vitrine */}
              <a
                href="#gbclock"
                className={`sm:col-span-2 p-6 rounded-xl border relative overflow-hidden transition-all duration-300 flex items-center justify-between gap-4 group ${
                  darkMode
                    ? "bg-slate-900/40 border-slate-900 hover:border-emerald-500/50"
                    : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-base tracking-tight ${darkMode ? "text-white" : "text-slate-950"}`}
                    >
                      GBClock — Produto próprio · SaaS
                    </h4>
                    <p
                      className={`text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Ponto, banco de horas e escala. Veja a vitrine completa
                      acima.
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06),transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2
            className={`text-3xl sm:text-4xl font-extrabold ${darkMode ? "text-white" : "text-slate-950"}`}
          >
            Pronto para digitalizar e escalar sua operação?
          </h2>
          <p
            className={`max-w-xl mx-auto text-sm sm:text-base ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Vamos desenhar a arquitetura ideal para o aplicativo ou plataforma
            web que o seu negócio precisa hoje.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/82993919961"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold px-8 py-4 rounded-xl transition inline-flex items-center justify-center gap-2 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              Falar com o Desenvolvedor
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`font-semibold px-8 py-4 rounded-xl transition inline-flex items-center justify-center gap-2 border ${darkMode ? "border-slate-800 hover:border-slate-700 text-slate-200 hover:bg-slate-900" : "border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-white"}`}
            >
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className={`border-t py-7 text-center ${darkMode ? "border-slate-900 text-slate-500" : "border-slate-100 text-slate-400"}`}
      >
        <p
          className={`max-w-xl mx-auto px-4 text-sm italic leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          &ldquo;Um novo mandamento lhes dou: Amem-se uns aos outros. Como eu
          os amei, vocês devem amar-se uns aos outros.&rdquo;
          <span className="block not-italic text-xs mt-1 text-indigo-500 font-semibold">
            {"João 13:34"}
          </span>
        </p>
        <p className="text-xs font-mono mt-6">
          &copy; {new Date().getFullYear()} GB Company. Tecnologia que
          Impulsiona.
        </p>
      </footer>
      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <a
        href={wppLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-[90] w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-xl shadow-green-900/30 transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* MODAL DE ORÇAMENTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl transition-all duration-300 ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">Iniciar seu projeto</h3>
                <p
                  className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  Conte-nos o que você precisa para impulsionar seu negócio.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-1.5 rounded-lg border transition ${
                  darkMode
                    ? "border-slate-800 hover:bg-slate-800 text-slate-400"
                    : "border-slate-200 hover:bg-slate-100 text-slate-500"
                }`}
              >
                ✕
              </button>
            </div>

            {/* Formulário */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const empresa = formData.get("empresa") as string;
                const segmento = formData.get("segmento") as string;
                const escopo = formData.get("escopo") as string;

                // Formata a mensagem para o WhatsApp de forma profissional
                const mensagem = encodeURIComponent(
                  `Olá GB Company! Gostaria de iniciar um projeto.\n\n` +
                    `*Empresa:* ${empresa}\n` +
                    `*Segmento:* ${segmento}\n` +
                    `*O que precisa ser desenvolvido:* ${escopo}`,
                );

                window.open(
                  `https://wa.me/5582993919961?text=${mensagem}`,
                  "_blank",
                );
                setIsModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  required
                  placeholder="Nome da sua empresa ou negócio"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:border-indigo-500 ${
                    darkMode
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  Segmento do Negócio
                </label>
                <input
                  type="text"
                  name="segmento"
                  required
                  placeholder="Ex: Varejo / Farmacia"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:border-indigo-500 ${
                    darkMode
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-semibold mb-1.5 uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  O que precisa ser desenvolvido?
                </label>
                <textarea
                  name="escopo"
                  required
                  rows={4}
                  placeholder="Descreva sua ideia (Ex: Preciso de um aplicativo de delivery integrado ao sistema de estoque com painel administrativo...)"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition focus:border-indigo-500 resize-none ${
                    darkMode
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-600"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/20 mt-2"
              >
                Enviar Proposta via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
