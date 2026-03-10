import { Button } from "@/components/ui/button";
import { Play, Calendar, Users2 } from "lucide-react";
import albumCover from "@/assets/album-cover-desabafo.png";

const collaborators = [
  "Artista 1",
  "Banda X",
  "DJ Y",
  "Cantor Z",
  "Grupo ABC",
  "+12 artistas",
];

const AlbumSection = () => {
  return (
    <section 
      id="album" 
      className="relative py-32 overflow-hidden"
      aria-labelledby="album-heading"
    >
      {/* Glow Background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6">
        <article className="grid lg:grid-cols-2 gap-16 items-center" itemScope itemType="https://schema.org/MusicAlbum">
          {/* Album Cover */}
          <figure className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={albumCover}
                alt="Capa do álbum Mashups Sem Fronteiras da banda Plurais - Arte abstrata com cores vibrantes representando a fusão musical Brasil-mundo"
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                itemProp="image"
                loading="eager"
                width="600"
                height="600"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center glow-primary transition-transform hover:scale-110"
                  aria-label="Reproduzir prévia do álbum Mashups Sem Fronteiras"
                >
                  <Play size={32} className="text-primary-foreground ml-1" aria-hidden="true" />
                </button>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 glass-card rounded-2xl px-6 py-4 animate-float">
              <span className="text-primary font-display text-2xl" itemProp="datePublished">2025</span>
              <p className="text-xs text-muted-foreground">Em breve</p>
            </div>
          </figure>

          {/* Album Info */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-secondary mb-6 tracking-wider uppercase">
              Primeiro Álbum
            </span>
            <h2 id="album-heading" className="font-display text-5xl md:text-7xl mb-6 leading-tight" itemProp="name">
              Desabafo
              <br />
              <span className="text-gradient-rasta">Sem Freio</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" itemProp="description">
              Nosso primeiro álbum reúne 12 faixas que misturam o melhor da música 
              brasileira com hits internacionais. De Tim Maia a Daft Punk, de 
              Gilberto Gil a Coldplay - prepare-se para ouvir suas músicas favoritas 
              de uma forma completamente nova.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Calendar size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold" itemProp="numTracks">12 Faixas</p>
                  <p className="text-xs text-muted-foreground">
                    <time itemProp="duration" dateTime="PT45M">45 minutos</time>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Users2 size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold">18 Artistas</p>
                  <p className="text-xs text-muted-foreground">Participações especiais</p>
                </div>
              </div>
            </div>

            {/* Collaborators */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-3">Colaboradores:</p>
              <ul className="flex flex-wrap gap-2" aria-label="Artistas colaboradores do álbum">
                {collaborators.map((collab) => (
                  <li
                    key={collab}
                    className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
                    itemProp="byArtist"
                  >
                    {collab}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="gradient" size="lg" aria-label="Fazer pré-save do álbum Mashups Sem Fronteiras no Spotify">
                Pré-save Agora
              </Button>
              <Button variant="outline" size="lg" aria-label="Ver lista completa de faixas do álbum">
                Ver Tracklist
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AlbumSection;
