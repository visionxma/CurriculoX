"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Linkedin, Calendar } from "lucide-react"

interface TemplatePreviewProps {
  templateId: string
  data?: any
  className?: string
}

export function TemplatePreview({ templateId, data, className }: TemplatePreviewProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case "classico":
        return <ClassicoTemplate data={data} />
      case "moderno":
        return <ModernoTemplate data={data} />
      case "executivo":
        return <ExecutivoTemplate data={data} />
      case "criativo":
        return <CriativoTemplate data={data} />
      case "tecnico":
        return <TecnicoTemplate data={data} />
      case "academico":
        return <AcademicoTemplate data={data} />
      default:
        return <ClassicoTemplate data={data} />
    }
  }

  return <Card className={`p-6 bg-white text-black min-h-[800px] ${className}`}>{renderTemplate()}</Card>
}

function ClassicoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 text-sm">
      <header className="text-center border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.personalInfo?.name || "Seu Nome Completo"}</h1>
        <p className="text-lg text-gray-700 mb-3">{data?.personalInfo?.title || "Seu Cargo Profissional"}</p>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {data?.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data?.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data?.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data?.personalInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {data?.summary && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">RESUMO PROFISSIONAL</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">
            EXPERIÊNCIA PROFISSIONAL
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-500 text-xs">
                    {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2 font-medium">{exp.company}</p>
                {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.education?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">FORMAÇÃO ACADÊMICA</h2>
          <div className="space-y-3">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.location && <p className="text-gray-500 text-xs">{edu.location}</p>}
                  </div>
                  <span className="text-gray-500 text-xs">{edu.graduationYear}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.skills?.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3">COMPETÊNCIAS</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.skills.map((skill: any, index: number) => (
              <div key={index} className="text-gray-700">
                • {skill.name} <span className="text-gray-500 text-xs">({skill.level})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ModernoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 text-sm">
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data?.personalInfo?.name || "Seu Nome Completo"}</h1>
        <p className="text-xl text-blue-700 mb-4">{data?.personalInfo?.title || "Seu Cargo Profissional"}</p>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {data?.personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data?.personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-blue-600" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data?.personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data?.personalInfo?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4 text-blue-600" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {data?.summary && (
        <section className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            Sobre Mim
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {data?.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              Experiência
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-blue-700 font-medium text-sm">{exp.company}</p>
                  <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </p>
                  {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-6">
          {data?.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Formação
              </h2>
              <div className="space-y-3">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-700 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data?.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded"></div>
                Habilidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

function ExecutivoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 text-sm">
      <header className="border-b-4 border-gray-800 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{data?.personalInfo?.name || "Seu Nome Completo"}</h1>
            <p className="text-xl text-gray-700 font-medium mb-4">
              {data?.personalInfo?.title || "Seu Cargo Executivo"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
          {data?.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="text-xs">{data.personalInfo.email}</span>
            </div>
          )}
          {data?.personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-xs">{data.personalInfo.phone}</span>
            </div>
          )}
          {data?.personalInfo?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-xs">{data.personalInfo.location}</span>
            </div>
          )}
          {data?.personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              <span className="text-xs">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {data?.summary && (
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Perfil Executivo</h2>
          <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
            Experiência Profissional
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-gray-400 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-500 text-sm font-medium">
                    {formatDate(exp.startDate)} - {exp.current ? "Presente" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 font-semibold mb-3">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed">
                    {exp.description.split("\n").map((line: string, i: number) => (
                      <p key={i} className="mb-2">
                        • {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {data?.education?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Formação
            </h2>
            <div className="space-y-4">
              {data.education.map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-700 font-medium">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
              Competências Principais
            </h2>
            <div className="space-y-2">
              {data.skills.map((skill: any, index: number) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function CriativoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 text-sm">
      <header className="bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 p-6 rounded-2xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          {data?.personalInfo?.name || "Seu Nome Criativo"}
        </h1>
        <p className="text-xl text-gray-700 mb-4">{data?.personalInfo?.title || "Designer & Criativo"}</p>
        <div className="flex flex-wrap gap-3">
          {data?.personalInfo?.email && (
            <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full">
              <Mail className="h-4 w-4 text-purple-600" />
              <span className="text-sm">{data.personalInfo.email}</span>
            </div>
          )}
          {data?.personalInfo?.phone && (
            <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full">
              <Phone className="h-4 w-4 text-purple-600" />
              <span className="text-sm">{data.personalInfo.phone}</span>
            </div>
          )}
          {data?.personalInfo?.location && (
            <div className="flex items-center gap-1 bg-white/70 px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-sm">{data.personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>

      {data?.summary && (
        <section className="relative">
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sobre Mim</h2>
            <p className="text-gray-700 leading-relaxed text-base">{data.summary}</p>
          </div>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section className="relative">
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Experiência</h2>
            <div className="space-y-6">
              {data.experience.map((exp: any, index: number) => (
                <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-orange-600 text-sm font-medium bg-white px-2 py-1 rounded-full">
                      {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-orange-700 font-semibold mb-2">{exp.company}</p>
                  {exp.description && <p className="text-gray-700 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {data?.education?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-500 to-teal-500 rounded-full"></div>
            <div className="pl-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Formação</h2>
              <div className="space-y-3">
                {data.education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-teal-50 p-3 rounded-lg">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-700">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section className="relative">
            <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
            <div className="pl-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium border border-green-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function TecnicoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className="space-y-6 text-sm font-mono">
      <header className="bg-gray-900 text-white p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-green-400">$</span>
          <h1 className="text-2xl font-bold">{data?.personalInfo?.name || "developer_name"}</h1>
        </div>
        <p className="text-green-400 mb-4"># {data?.personalInfo?.title || "Full Stack Developer"}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {data?.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400">email:</span>
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data?.personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400">phone:</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data?.personalInfo?.location && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400">location:</span>
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data?.personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400">linkedin:</span>
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {data?.summary && (
        <section className="border-l-4 border-blue-500 pl-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// ABOUT</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section className="border-l-4 border-green-500 pl-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">// EXPERIENCE</h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded border-l-2 border-gray-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-500 text-xs bg-gray-200 px-2 py-1 rounded">
                    {formatDate(exp.startDate)} - {exp.current ? "current" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-blue-600 font-semibold mb-2">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 text-sm">
                    {exp.description.split("\n").map((line: string, i: number) => (
                      <p key={i} className="mb-1">
                        - {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {data?.education?.length > 0 && (
          <section className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">// EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="bg-purple-50 p-3 rounded">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-purple-700">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{edu.graduationYear}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data?.skills?.length > 0 && (
          <section className="border-l-4 border-orange-500 pl-4">
            <h2 className="text-lg font-bold text-gray-800 mb-3">// SKILLS</h2>
            <div className="space-y-2">
              {data.skills.map((skill: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-gray-800 font-medium">{skill.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <=
                          (
                            skill.level === "Básico"
                              ? 2
                              : skill.level === "Intermediário"
                                ? 3
                                : skill.level === "Avançado"
                                  ? 4
                                  : 5
                          )
                            ? "bg-orange-500"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function AcademicoTemplate({ data }: { data?: any }) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ]
    return `${months[Number.parseInt(month) - 1]} de ${year}`
  }

  return (
    <div className="space-y-6 text-sm">
      <header className="text-center border-b-2 border-blue-800 pb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">{data?.personalInfo?.name || "Nome do Pesquisador"}</h1>
        <p className="text-lg text-gray-700 mb-4">{data?.personalInfo?.title || "Pesquisador/Professor"}</p>
        <div className="text-gray-600 space-y-1">
          {data?.personalInfo?.email && <p>E-mail: {data.personalInfo.email}</p>}
          {data?.personalInfo?.phone && <p>Telefone: {data.personalInfo.phone}</p>}
          {data?.personalInfo?.location && <p>Endereço: {data.personalInfo.location}</p>}
          {data?.personalInfo?.linkedin && <p>Lattes: {data.personalInfo.linkedin}</p>}
        </div>
      </header>

      {data?.summary && (
        <section>
          <h2 className="text-xl font-bold text-blue-800 border-b border-blue-300 pb-2 mb-4">RESUMO ACADÊMICO</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
        </section>
      )}

      {data?.education?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-800 border-b border-blue-300 pb-2 mb-4">FORMAÇÃO ACADÊMICA</h2>
          <div className="space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="ml-4">
                <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-gray-600 text-sm">Ano de conclusão: {edu.graduationYear}</p>
                {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.experience?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-800 border-b border-blue-300 pb-2 mb-4">
            EXPERIÊNCIA PROFISSIONAL E ACADÊMICA
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={index} className="ml-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                {exp.description && <p className="text-gray-700 text-sm mt-2 text-justify">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {data?.skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-blue-800 border-b border-blue-300 pb-2 mb-4">ÁREAS DE CONHECIMENTO</h2>
          <div className="ml-4">
            <ul className="list-disc list-inside space-y-1">
              {data.skills.map((skill: any, index: number) => (
                <li key={index} className="text-gray-700">
                  {skill.name} - <span className="text-gray-600 text-sm">Nível {skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold text-blue-800 border-b border-blue-300 pb-2 mb-4">PUBLICAÇÕES E PESQUISAS</h2>
        <div className="ml-4 text-gray-600">
          <p className="italic">Seção a ser preenchida com publicações, artigos e pesquisas relevantes.</p>
        </div>
      </section>
    </div>
  )
}
