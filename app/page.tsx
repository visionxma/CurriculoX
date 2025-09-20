import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CurrículoPro</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
                Templates
              </Link>
              <Link href="#recursos" className="text-muted-foreground hover:text-foreground transition-colors">
                Recursos
              </Link>
              <Button asChild>
                <Link href="/criar">Criar Currículo</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Sem cadastro necessário
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Crie currículos profissionais em <span className="text-primary">minutos</span>
          </h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Templates profissionais aceitos no LinkedIn, Lattes e principais sites de emprego. Preview em tempo real e
            exportação em PDF/Word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/criar">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
              <Link href="#templates">Ver Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Por que escolher o CurrículoPro?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas profissionais para criar o currículo perfeito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Preview em Tempo Real</CardTitle>
                <CardDescription>
                  Veja como seu currículo fica enquanto edita. Mudanças aparecem instantaneamente.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Exportação PDF/Word</CardTitle>
                <CardDescription>Baixe seu currículo em formato PDF ou Word, prontos para enviar.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Templates Profissionais</CardTitle>
                <CardDescription>
                  Modelos aceitos no LinkedIn, Lattes e principais plataformas de emprego.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rápido e Simples</CardTitle>
                <CardDescription>
                  Interface intuitiva. Crie seu currículo em poucos minutos, sem complicações.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Campos Opcionais</CardTitle>
                <CardDescription>Preencha apenas o que desejar. Todos os campos são opcionais.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sem Cadastro</CardTitle>
                <CardDescription>
                  Comece imediatamente. Não precisa criar conta ou fornecer dados pessoais.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Templates Profissionais</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha entre diversos modelos criados especialmente para o mercado brasileiro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Clássico",
                description: "Design tradicional e elegante, ideal para setores conservadores",
                preview: "/classic-professional-resume-template-with-clean-la.jpg",
                category: "Tradicional",
              },
              {
                name: "Moderno",
                description: "Layout contemporâneo com elementos visuais sutis",
                preview: "/modern-resume-template-with-subtle-design-elements.jpg",
                category: "Contemporâneo",
              },
              {
                name: "Executivo",
                description: "Para cargos de liderança e alta gerência",
                preview: "/executive-resume-template-professional-leadership-.jpg",
                category: "Liderança",
              },
              {
                name: "Criativo",
                description: "Para profissionais de design, marketing e áreas criativas",
                preview: "/creative-resume-template-with-artistic-elements-fo.jpg",
                category: "Criativo",
              },
              {
                name: "Técnico",
                description: "Ideal para TI, engenharia e áreas técnicas",
                preview: "/technical-resume-template-for-it-engineering-profe.jpg",
                category: "Tecnologia",
              },
              {
                name: "Acadêmico",
                description: "Perfeito para Lattes e posições acadêmicas",
                preview: "/academic-resume-template-for-curriculum-lattes-res.jpg",
                category: "Acadêmico",
              },
            ].map((template, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={`Preview do template ${template.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/criar">
                Escolher Template
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Pronto para criar seu currículo?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já criaram seus currículos conosco
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8">
            <Link href="/criar">
              Criar Meu Currículo Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold">CurrículoPro</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 CurrículoPro. Criando currículos profissionais para o mercado brasileiro.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
