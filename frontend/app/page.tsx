"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Film, Users, Star, Sparkles } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Film className="h-24 w-24 text-primary animate-pulse" />
              <Sparkles className="h-8 w-8 text-primary absolute -top-2 -right-2" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Gerenciador de Filmes
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Organize sua coleção de filmes e atores de forma simples e intuitiva.
            Mantenha o controle completo do seu catálogo cinematográfico.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Catálogo de Filmes
                </h3>
                <p className="text-secondary mb-4">
                  Adicione, edite e gerencie sua coleção de filmes com informações
                  detalhadas como ano de lançamento, gênero e classificação etária.
                </p>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Organização por gênero e ano
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Informações detalhadas de cada filme
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Paginação e busca facilitada
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Banco de Atores
                </h3>
                <p className="text-secondary mb-4">
                  Mantenha um registro completo dos atores e atrizes, com suas
                  filmografias e informações pessoais.
                </p>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Perfil completo de cada ator
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Filmografia completa
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Vincule atores aos filmes
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Features List */}
        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Funcionalidades Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">CRUD Completo</h4>
              <p className="text-sm text-secondary">
                Crie, visualize, edite e delete filmes e atores
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Relacionamentos</h4>
              <p className="text-sm text-secondary">
                Vincule atores aos seus filmes facilmente
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📄</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Paginação</h4>
              <p className="text-sm text-secondary">
                Navegue por grandes coleções com facilidade
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Interface Moderna</h4>
              <p className="text-sm text-secondary">
                Design limpo e intuitivo com Tailwind CSS
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Rápido e Responsivo</h4>
              <p className="text-sm text-secondary">
                Construído com Next.js 15 e React Query
              </p>
            </div>

            <div className="text-center p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Validação</h4>
              <p className="text-sm text-secondary">
                Validação de dados no frontend e backend
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Comece a Gerenciar Agora!
          </h2>
          <p className="text-lg text-secondary max-w-xl mx-auto">
            Explore o catálogo de filmes ou navegue pela lista de atores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              onClick={() => router.push("/movies")}
            >
              <Film className="h-5 w-5 mr-2" />
              Ver Filmes
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/actors")}
            >
              <Users className="h-5 w-5 mr-2" />
              Ver Atores
            </Button>
          </div>
        </div>

        {/* Tech Stack */}
        <Card className="mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Tecnologias Utilizadas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">⚛️</div>
              <p className="font-semibold text-foreground">Next.js 15</p>
              <p className="text-sm text-secondary">React Framework</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🎨</div>
              <p className="font-semibold text-foreground">Tailwind CSS</p>
              <p className="text-sm text-secondary">Estilização</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🔄</div>
              <p className="font-semibold text-foreground">React Query</p>
              <p className="text-sm text-secondary">Gerenciamento de Estado</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🚀</div>
              <p className="font-semibold text-foreground">Node.js + Express</p>
              <p className="text-sm text-secondary">Backend API</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🐘</div>
              <p className="font-semibold text-foreground">PostgreSQL</p>
              <p className="text-sm text-secondary">Banco de Dados</p>
            </div>
            <div>
              <div className="text-4xl mb-2">📊</div>
              <p className="font-semibold text-foreground">Sequelize</p>
              <p className="text-sm text-secondary">ORM</p>
            </div>
            <div>
              <div className="text-4xl mb-2">🐳</div>
              <p className="font-semibold text-foreground">Docker</p>
              <p className="text-sm text-secondary">Containerização</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}