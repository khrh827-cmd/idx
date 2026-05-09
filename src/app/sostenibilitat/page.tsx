'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Cloud, Zap, Trash2, ShieldCheck, TrendingUp, AlertTriangle, 
  MapRoute, Smartphone, Truck, BarChart3, Briefcase, Lightbulb, 
  CloudSun, Users, CheckCircle2, ChevronRight, PieChart
} from 'lucide-react';
import placeholderImages from '@/lib/placeholder-images.json';

export default function SostenibilitatPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO PRINCIPAL */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center">
        <Image
          src={placeholderImages.sustainability.src}
          alt="Logística sostenible"
          fill
          className="object-cover"
          priority
          data-ai-hint={placeholderImages.sustainability.hint}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container relative z-10 mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-headline mb-6">
            Compromís amb una logística eficient i sostenible
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
            A Global CargoCare treballem per reduir l’impacte ambiental del transport i la logística mitjançant innovació, eficiència energètica i responsabilitat social.
          </p>
          <Button asChild size="lg" variant="cta" className="rounded-full">
            <Link href="#objectius">Veure Objectius</Link>
          </Button>
        </div>
      </section>

      {/* 2. EL NOSTRE COMPROMÍS */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline text-primary mb-8">El Nostre Compromís</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Global CargoCare opera des del Polígon de Constantí, Tarragona (Espanya), un enclavament logístic estratègic gràcies a la seva proximitat amb el Port de Tarragona i l’Aeroport de Reus. La nostra activitat es basa en l’eficiència operativa, la innovació i el compromís amb la sostenibilitat.
            </p>
          </div>
        </div>
      </section>

      {/* 3. IMPACTES, RISCOS I OPORTUNITATS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary mb-12 text-center">Impactes, Riscos i Oportunitats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Impactes */}
            <Card className="border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-6 w-6 text-primary" /> Impactes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-500" /> Emissions de CO₂</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-500" /> Consum energètic</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-500" /> Residus d’embalatge</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-500" /> Seguretat laboral</li>
              </CardContent>
            </Card>

            {/* Riscos */}
            <Card className="border-t-4 border-t-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" /> Riscos
                </AlertTriangle>
              </CardHeader>
              <CardContent className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-destructive" /> Increment del cost del combustible</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-destructive" /> Normatives ambientals més estrictes</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-destructive" /> Competència del sector</li>
              </CardContent>
            </Card>

            {/* Oportunitats */}
            <Card className="border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-accent" /> Oportunitats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent" /> Optimització de rutes</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent" /> Digitalització</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent" /> Vehicles eficients</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-accent" /> Reducció de costos</li>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* 4. ODS CLAU */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline mb-12 text-center">Els nostres ODS Clau</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { id: 7, label: "Energia eficient", icon: <Zap className="h-8 w-8" /> },
              { id: 8, label: "Treball digne", icon: <Briefcase className="h-8 w-8" /> },
              { id: 9, label: "Innovació i digitalització", icon: <Lightbulb className="h-8 w-8" /> },
              { id: 12, label: "Reducció de residus", icon: <Trash2 className="h-8 w-8" /> },
              { id: 13, label: "Acció climàtica", icon: <CloudSun className="h-8 w-8" /> },
              { id: 17, label: "Aliances", icon: <Users className="h-8 w-8" /> },
            ].map(ods => (
              <div key={ods.id} className="flex flex-col items-center p-6 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-center">
                <div className="mb-4 p-3 bg-accent rounded-full text-white">
                  {ods.icon}
                </div>
                <span className="text-xs font-bold uppercase mb-1">ODS {ods.id}</span>
                <p className="text-sm font-medium">{ods.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OBJECTIUS ESTRATÈGICS */}
      <section id="objectius" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-headline text-primary mb-8 text-center">Objectius Estratègics</h2>
            <div className="space-y-4">
              {[
                "Reduir emissions amb rutes optimitzades i vehicles eficients",
                "Millorar la gestió de residus",
                "Reduir consum energètic",
                "Garantir seguretat laboral",
                "Enfortir la transparència"
              ].map((obj, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-muted rounded-lg border-l-4 border-accent">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-lg font-medium">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACCIONS CONCRETES */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary mb-12 text-center">Accions Concretes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { icon: <Truck className="h-8 w-8" />, label: "Sistema d’optimització de rutes" },
              { icon: <Zap className="h-8 w-8" />, label: "Instal·lació d’il·luminació LED" },
              { icon: <Trash2 className="h-8 w-8" />, label: "Punts de reciclatge" },
              { icon: <ShieldCheck className="h-8 w-8" />, label: "Formació en seguretat laboral" },
              { icon: <Smartphone className="h-8 w-8" />, label: "Codi ètic i protecció de dades" },
            ].map((action, i) => (
              <Card key={i} className="p-8 hover:shadow-lg transition-shadow bg-background">
                <div className="mb-4 inline-flex p-4 bg-primary/5 rounded-full text-primary">
                  {action.icon}
                </div>
                <p className="font-bold text-sm leading-snug">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INDICADORS I SEGUIMENT */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-primary mb-12 text-center">Indicadors i Seguiment</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Reducció emissions CO₂", value: "15%-25%", icon: <PieChart className="text-accent" /> },
              { label: "Reducció consum energètic", value: "10%-20%", icon: <Zap className="text-accent" /> },
              { label: "Millora seguretat laboral", value: "85%", icon: <ShieldCheck className="text-accent" /> },
              { label: "Satisfacció del client", value: "80%", icon: <Users className="text-accent" /> },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-muted/50 border">
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2 font-headline">{stat.value}</div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-muted-foreground italic font-medium">
            “Revisió trimestral i informe anual de sostenibilitat.”
          </p>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
            Construïm una logística més sostenible per al futur
          </h2>
          <Button asChild size="lg" variant="cta" className="rounded-full px-12 h-14 text-lg">
            <Link href="/contact" className="flex items-center">
              Contactar <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
