"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ArrowLeft, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const templates = [
  {
    id: "classico",
    name: "Clássico",
    description: "Design tradicional e elegante, ideal para setores conservadores",
    category: "Tradicional",
    preview: "/classic-professional-resume-template-with-clean-la.jpg",
    features: ["Layout limpo", "Tipografia clássica", "Seções bem definidas"],
  },
  {
    id: "moderno",
    name: "Moderno",
    description: "Layout contemporâneo com elementos visuais sutis",
    category: "Contemporâneo",
    preview: "/modern-resume-template-with-subtle-design-elements.jpg",
    features: ["Design atual", "Cores sutis", "Hierarquia visual clara"],
  },
  {
    id: "executivo",
    name: "Executivo",
    description: "Para cargos de liderança e alta gerência",
    category: "Liderança",
    preview: "/executive-resume-template-professional-leadership-.jpg",
    features: ["Foco em resultados", "Layout premium", "Seção de conquistas"],
  },
  {
    id: "criativo",
    name: "Criativo",
    description: "Para profissionais de design, marketing e áreas criativas",
    category: "Criativo",
    preview: "/creative-resume-template-with-artistic-elements-fo.jpg",
    features: ["Elementos visuais", "Layout diferenciado", "Espaço para portfólio"],
  },
  {
    id: "tecnico",
    name: "Técnico",
    description: "Ideal para TI, engenharia e áreas técnicas",
    category: "Tecnologia",
    preview: "/technical-resume-template-for-it-engineering-profe.jpg",
    features: ["Foco em skills", "Seção de projetos", "Certificações"],
  },
  {
    id: "academico",
    name: "Acadêmico",
    description: "Perfeito para Lattes e posições acadêmicas",
    category: "Acadêmico",
    preview: "/academic-resume-template-for-curriculum-lattes-res.jpg",
    features: ["Publicações", "Pesquisas", "Formação detalhada"],
  },
]

const categories = ["Todos", "Tradicional", "Contemporâneo", "Liderança", "Criativo", "Tecnologia", "Acadêmico"]

export default function TemplateSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const router = useRouter()

  const filteredTemplates =
    selectedCategory === "Todos" ? templates : templates.filter((template) => template.category === selectedCategory)

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/editor?template=${selectedTemplate}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">CurrículoPro</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Passo 1 de 3:</span>
              <span className="text-sm font-medium">Escolher Template</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Escolha seu template</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Selecione o modelo que melhor se adequa ao seu perfil profissional e área de atuação
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTemplate === template.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={template.preview || "/placeholder.svg"}
                      alt={`Preview do template ${template.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm mb-3">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Características:</p>
                  <ul className="text-sm space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button size="lg" onClick={handleContinue} disabled={!selectedTemplate} className="px-8">
            Continuar com Template
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Não se preocupe, você poderá visualizar e ajustar o template na próxima etapa
          </p>
        </div>
      </div>
    </div>
  )
}
