"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, FileText, ArrowLeft, Share2, RefreshCw, FileDown, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "classico"
  const fileName = searchParams.get("file") || "curriculo.pdf"
  const format = searchParams.get("format") || "pdf"

  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState<"pdf" | "word" | null>(null)

  const handleExport = async (format: "pdf" | "word") => {
    setIsExporting(true)
    setExportType(format)

    try {
      // Simular exportação (em produção, você recuperaria os dados do localStorage ou estado global)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert(`Arquivo ${format.toUpperCase()} gerado com sucesso! Download iniciado.`)
    } catch (error) {
      console.error("Export error:", error)
      alert("Erro ao exportar arquivo. Tente novamente.")
    } finally {
      setIsExporting(false)
      setExportType(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">CurrículoPro</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Passo 3 de 3:</span>
              <span className="text-sm font-medium">Concluído</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Currículo Criado com Sucesso!</h2>
            <p className="text-xl text-muted-foreground">Seu currículo profissional está pronto para uso.</p>
          </div>

          <Card className="text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Baixar Currículo
              </CardTitle>
              <CardDescription>Faça o download do seu currículo nos formatos disponíveis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => handleExport("pdf")}
                  disabled={isExporting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isExporting && exportType === "pdf" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4 mr-2" />
                  )}
                  Baixar PDF
                </Button>
                <Button variant="secondary" onClick={() => handleExport("word")} disabled={isExporting}>
                  {isExporting && exportType === "word" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4 mr-2" />
                  )}
                  Baixar Word
                </Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Template: <Badge variant="secondary">{templateId}</Badge>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>Agora você pode usar seu currículo profissional</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Revise o conteúdo</h4>
                    <p className="text-sm text-blue-700">
                      Abra o arquivo e verifique se todas as informações estão corretas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Envie para empresas</h4>
                    <p className="text-sm text-green-700">
                      Use em candidaturas no LinkedIn, sites de emprego e processos seletivos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-900">Mantenha atualizado</h4>
                    <p className="text-sm text-purple-700">Volte sempre que precisar atualizar suas informações</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Criar Novo Currículo
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/criar">
                <RefreshCw className="h-5 w-5 mr-2" />
                Editar Este Currículo
              </Link>
            </Button>
          </div>

          {/* Share Section */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4">
                <Share2 className="h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">Gostou do CurrículoPro? Compartilhe com seus amigos!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
