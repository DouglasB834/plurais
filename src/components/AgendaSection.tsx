import { MapPin, Clock, Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";

const shows = [
  {
    date: "15",
    month: "MAR",
    city: "São Paulo",
    venue: "Audio Club",
    time: "22h",
    status: "available",
  },
  {
    date: "22",
    month: "MAR",
    city: "Rio de Janeiro",
    venue: "Circo Voador",
    time: "21h",
    status: "available",
  },
  {
    date: "29",
    month: "MAR",
    city: "Belo Horizonte",
    venue: "Mister Rock",
    time: "22h",
    status: "soon",
  },
  {
    date: "05",
    month: "ABR",
    city: "Curitiba",
    venue: "Live Curitiba",
    time: "21h",
    status: "soon",
  },
];

const AgendaSection = () => {
  return (
    <section 
      id="agenda" 
      className="relative py-16 overflow-hidden bg-gradient-hero"
      aria-labelledby="agenda-heading"
    >
      <div className="relative z-10 container mx-auto px-6">
        <header className="text-center mb-16">
          <h2 id="agenda-heading" className="font-display text-5xl md:text-7xl mb-6">
            Próximos <span className="text-gradient">Shows</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Venha viver a experiência Plurais ao vivo. Prepare-se para uma noite 
            de fusões musicais inesquecíveis com artistas brasileiros e internacionais.
          </p>
        </header>

        <ul className="max-w-4xl mx-auto space-y-4" aria-label="Lista de próximos shows da banda Plurais">
          {shows.map((show, index) => (
            <li
              key={`${show.city}-${show.date}`}
              className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
              itemScope
              itemType="https://schema.org/MusicEvent"
            >
              {/* Date */}
              <time 
                className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-primary flex flex-col items-center justify-center"
                // dateTime={`2025-${show.month === 'MAR' ? '03' : '04'}-${show.date}T${show.time.replace('h', ':00')}`}
                itemProp="startDate"
              >
                <span className="font-display text-3xl text-primary-foreground leading-none">
                  {show.date}
                </span>
                <span className="text-xs text-primary-foreground/80 uppercase">
                  {show.month}
                </span>
              </time>

              {/* Info */}
              <div className="flex-1 text-center md:text-left" itemProp="location" itemScope itemType="https://schema.org/MusicVenue">
                <h3 className="font-display text-2xl mb-1" itemProp="name">{show.city}</h3>
                <address className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-muted-foreground not-italic">
                  <span className="flex items-center gap-1 justify-center md:justify-start" itemProp="address">
                    <MapPin size={14} aria-hidden="true" />
                    {show.venue}
                  </span>
                  <span className="hidden md:inline" aria-hidden="true">•</span>
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <Clock size={14} aria-hidden="true" />
                    <time>{show.time}</time>
                  </span>
                </address>
              </div>

              {/* Action */}
              <div className="flex-shrink-0" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                {show.status === "available" ? (
                  <Button 
                    variant="gradient" 
                    size="default"
                    aria-label={`Comprar ingresso para show em ${show.city} no ${show.venue}`}
                  >
                    <Ticket size={16} className="mr-1" aria-hidden="true" />
                    <span itemProp="availability" content="https://schema.org/InStock">Comprar</span>
                  </Button>
                ) : (
                  <Button variant="outline" size="default" disabled aria-label="Ingressos em breve">
                    <span itemProp="availability" content="https://schema.org/PreOrder">Em breve</span>
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <Button variant="glass" size="lg" aria-label="Ver agenda completa de shows da banda Plurais">
            Ver Agenda Completa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
