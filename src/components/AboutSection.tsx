import { Users, Globe, Music2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Music2,
    title: "Mashups Únicos",
    description: "Fusões criativas entre hits brasileiros e internacionais",
  },
  {
    icon: Users,
    title: "Colaborações",
    description: "Artistas de diferentes bandas e estilos unidos",
  },
  {
    icon: Globe,
    title: "Som Global",
    description: "Do samba ao rock, do funk ao eletrônico",
  },
  {
    icon: Sparkles,
    title: "Experiência Nova",
    description: "Uma forma diferente de ouvir suas músicas favoritas",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-primary mb-6 tracking-wider uppercase">
              Sobre Nós
            </span>
            <h2 className="font-display text-5xl md:text-7xl mb-6 leading-tight">
              Muitas vozes,
              <br />
              <span className="text-gradient-rasta">um som.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Plurais nasceu da ideia de que a música não tem fronteiras. Somos um projeto 
              colaborativo que reúne artistas de diversas bandas brasileiras para criar 
              algo completamente novo: mashups que misturam o melhor da música nacional 
              com hits internacionais.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cada faixa é uma viagem sonora, onde ritmos brasileiros encontram beats 
              globais, vozes se entrelaçam e gêneros se fundem em harmonias inesperadas.
            </p>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-6 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
