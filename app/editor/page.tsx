"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, ArrowLeft, Eye, Plus, Trash2, Save, FileDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { TemplatePreview } from "@/components/template-preview"
import { exportToPDF, exportToWord, type ExportData } from "@/lib/export-utils"
import { useRouter } from "next/navigation"

interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
}

interface Experience {
  id: string
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  graduationYear: string
  gpa: string
}

interface Skill {
  id: string
  name: string
  level: string
}

interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  languages: string[]
  certifications: string[]
}

const initialData: ResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
}

export default function EditorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const templateId = searchParams.get("template") || "classico"
  const [resumeData, setResumeData] = useState<ResumeData>(initialData)
  const [activeTab, setActiveTab] = useState("personal")
  const [showPreview, setShowPreview] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [exportType, setExportType] = useState<"pdf" | "word" | null>(null)

  const tabs = ["personal", "summary", "experience", "education", "skills"]
  const tabLabels = {
    personal: "Pessoal",
    summary: "Resumo",
    experience: "Experiência",
    education: "Formação",
    skills: "Habilidades",
  }

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const updateSummary = (value: string) => {
    setResumeData((prev) => ({ ...prev, summary: value }))
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    setResumeData((prev) => ({ ...prev, experience: [...prev.experience, newExp] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      graduationYear: "",
      gpa: "",
    }
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediário",
    }
    setResumeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }))
  }

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const handleExport = async (format: "pdf" | "word") => {
    if (!resumeData.personalInfo.name || !resumeData.personalInfo.title) {
      alert("Por favor, preencha pelo menos o nome e cargo antes de exportar.")
      return
    }

    setIsExporting(true)
    setExportType(format)

    try {
      const exportData: ExportData = {
        personalInfo: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
      }

      let result
      if (format === "pdf") {
        result = await exportToPDF(exportData, templateId)
      } else {
        result = await exportToWord(exportData, templateId)
      }

      if (result.success) {
        alert(`Arquivo ${format.toUpperCase()} gerado com sucesso! Download iniciado.`)
      } else {
        alert(result.error || "Erro ao exportar arquivo")
      }
    } catch (error) {
      console.error("Export error:", error)
      alert("Erro ao exportar arquivo. Tente novamente.")
    } finally {
      setIsExporting(false)
      setExportType(null)
    }
  }

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    } else {
      // Se está na última aba, vai para página de sucesso
      if (!resumeData.personalInfo.name || !resumeData.personalInfo.title) {
        alert("Por favor, preencha pelo menos o nome e cargo antes de continuar.")
        return
      }
      router.push(`/sucesso?template=${templateId}`)
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
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
                <Link href="/criar">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">CurrículoPro</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Passo 2 de 3:</span>
                <span className="text-sm font-medium">{tabLabels[activeTab]}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Ocultar" : "Preview"}
                </Button>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={() => handleExport("pdf")}
                    disabled={isExporting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isExporting && exportType === "pdf" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4 mr-2" />
                    )}
                    PDF
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleExport("word")} disabled={isExporting}>
                    {isExporting && exportType === "word" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <FileDown className="h-4 w-4 mr-2" />
                    )}
                    Word
                  </Button>
                  {/* Adicionando botão Anterior */}
                  {tabs.indexOf(activeTab) > 0 && (
                    <Button size="sm" variant="outline" onClick={handlePrevious}>
                      Anterior
                    </Button>
                  )}
                  <Button size="sm" onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    {tabs.indexOf(activeTab) === tabs.length - 1 ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showPreview ? "lg:grid-cols-2" : "max-w-4xl mx-auto"}`}>
          {/* Editor Panel */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Editar Currículo</h2>
                <p className="text-muted-foreground">
                  Template: <Badge variant="secondary">{templateId}</Badge>
                </p>
              </div>
              <div className="text-sm text-muted-foreground">Salvamento automático ativo</div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab}>
                    {tabLabels[tab]}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Dados básicos que aparecerão no cabeçalho do seu currículo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={resumeData.personalInfo.name}
                          onChange={(e) => updatePersonalInfo("name", e.target.value)}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Cargo/Título Profissional *</Label>
                        <Input
                          id="title"
                          value={resumeData.personalInfo.title}
                          onChange={(e) => updatePersonalInfo("title", e.target.value)}
                          placeholder="Ex: Desenvolvedor Full Stack"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          placeholder="seu.email@exemplo.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updatePersonalInfo("location", e.target.value)}
                          placeholder="São Paulo, SP"
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                          placeholder="linkedin.com/in/seuperfil"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo Profissional</CardTitle>
                    <CardDescription>
                      Um breve resumo sobre sua experiência, competências e objetivos (opcional)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={resumeData.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                      placeholder="Descreva brevemente sua experiência profissional, principais competências e objetivos de carreira..."
                      rows={6}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Experiência Profissional</CardTitle>
                        <CardDescription>Adicione suas experiências de trabalho (opcional)</CardDescription>
                      </div>
                      <Button onClick={addExperience} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhuma experiência adicionada. Clique em "Adicionar" para começar.
                      </p>
                    ) : (
                      resumeData.experience.map((exp) => (
                        <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Experiência</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Cargo</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                                placeholder="Ex: Desenvolvedor Senior"
                              />
                            </div>
                            <div>
                              <Label>Empresa</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                placeholder="Nome da empresa"
                              />
                            </div>
                            <div>
                              <Label>Data de Início</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Data de Fim</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                disabled={exp.current}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Descrição</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              placeholder="Descreva suas principais responsabilidades e conquistas..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Formação Acadêmica</CardTitle>
                        <CardDescription>Adicione sua formação educacional (opcional)</CardDescription>
                      </div>
                      <Button onClick={addEducation} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhuma formação adicionada. Clique em "Adicionar" para começar.
                      </p>
                    ) : (
                      resumeData.education.map((edu) => (
                        <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Formação</h4>
                            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Curso/Grau</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                placeholder="Ex: Bacharelado em Ciência da Computação"
                              />
                            </div>
                            <div>
                              <Label>Instituição</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                placeholder="Nome da universidade/escola"
                              />
                            </div>
                            <div>
                              <Label>Ano de Conclusão</Label>
                              <Input
                                value={edu.graduationYear}
                                onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                                placeholder="2023"
                              />
                            </div>
                            <div>
                              <Label>Localização</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                                placeholder="São Paulo, SP"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Habilidades e Competências</CardTitle>
                        <CardDescription>Adicione suas principais habilidades (opcional)</CardDescription>
                      </div>
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.skills.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        Nenhuma habilidade adicionada. Clique em "Adicionar" para começar.
                      </p>
                    ) : (
                      <div className="grid gap-4">
                        {resumeData.skills.map((skill) => (
                          <div key={skill.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <Input
                              value={skill.name}
                              onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                              placeholder="Nome da habilidade"
                              className="flex-1"
                            />
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                              className="px-3 py-2 border rounded-md"
                            >
                              <option value="Básico">Básico</option>
                              <option value="Intermediário">Intermediário</option>
                              <option value="Avançado">Avançado</option>
                              <option value="Especialista">Especialista</option>
                            </select>
                            <Button variant="ghost" size="sm" onClick={() => removeSkill(skill.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Preview do Currículo</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Zoom -
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Zoom +
                  </Button>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  {/* Adicionando botão Anterior também no preview */}
                  {tabs.indexOf(activeTab) > 0 && (
                    <Button size="sm" variant="outline" onClick={handlePrevious}>
                      Anterior
                    </Button>
                  )}
                  <Button size="sm" onClick={handleNext} className="bg-primary hover:bg-primary/90">
                    {tabs.indexOf(activeTab) === tabs.length - 1 ? "Finalizar" : "Próximo"}
                  </Button>
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white shadow-lg">
                <div className="transform-gpu transition-transform duration-200">
                  <TemplatePreview
                    templateId={templateId}
                    data={resumeData}
                    className="scale-90 origin-top-left w-[111%]"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Preview atualizado em tempo real • Template: {templateId}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
