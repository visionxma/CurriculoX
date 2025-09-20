// Utility functions for exporting resumes to PDF and Word formats

export interface ExportData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
  }
  summary: string
  experience: Array<{
    position: string
    company: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    degree: string
    institution: string
    graduationYear: string
    location: string
  }>
  skills: Array<{
    name: string
    level: string
  }>
}

export const exportToPDF = async (data: ExportData, templateId: string) => {
  try {
    // Create a temporary div with the resume content
    const tempDiv = document.createElement("div")
    tempDiv.style.position = "absolute"
    tempDiv.style.left = "-9999px"
    tempDiv.style.width = "210mm" // A4 width
    tempDiv.style.minHeight = "297mm" // A4 height
    tempDiv.style.backgroundColor = "white"
    tempDiv.style.padding = "20mm"
    tempDiv.style.fontFamily = "Arial, sans-serif"
    tempDiv.style.fontSize = "12px"
    tempDiv.style.lineHeight = "1.4"
    tempDiv.style.color = "black"

    // Generate HTML content based on template
    tempDiv.innerHTML = generateHTMLContent(data, templateId)
    document.body.appendChild(tempDiv)

    // Use html2canvas and jsPDF for PDF generation
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).jsPDF

    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Clean up
    document.body.removeChild(tempDiv)

    // Download the PDF
    const fileName = `curriculo-${data.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}.pdf`
    pdf.save(fileName)

    return { success: true, fileName }
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    return { success: false, error: "Erro ao exportar PDF" }
  }
}

export const exportToWord = async (data: ExportData, templateId: string) => {
  try {
    // Generate Word document using docx library
    const docx = await import("docx")
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = docx

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: generateWordContent(data, templateId, { Paragraph, TextRun, HeadingLevel, AlignmentType }),
        },
      ],
    })

    // Generate and download the document
    const blob = await Packer.toBlob(doc)
    const fileName = `curriculo-${data.personalInfo.name.replace(/\s+/g, "-").toLowerCase()}.docx`

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(url)

    return { success: true, fileName }
  } catch (error) {
    console.error("Error exporting to Word:", error)
    return { success: false, error: "Erro ao exportar Word" }
  }
}

const generateHTMLContent = (data: ExportData, templateId: string): string => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
  }

  switch (templateId) {
    case "moderno":
      return `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <header style="background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
            <h1 style="font-size: 32px; font-weight: bold; color: #1e293b; margin: 0 0 10px 0;">${data.personalInfo.name}</h1>
            <p style="font-size: 18px; color: #3b82f6; margin: 0 0 20px 0;">${data.personalInfo.title}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 14px; color: #64748b;">
              ${data.personalInfo.email ? `<span>📧 ${data.personalInfo.email}</span>` : ""}
              ${data.personalInfo.phone ? `<span>📱 ${data.personalInfo.phone}</span>` : ""}
              ${data.personalInfo.location ? `<span>📍 ${data.personalInfo.location}</span>` : ""}
            </div>
          </header>
          
          ${
            data.summary
              ? `
            <section style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
              <h2 style="font-size: 20px; font-weight: bold; color: #1e293b; margin: 0 0 15px 0; border-left: 4px solid #3b82f6; padding-left: 15px;">Sobre Mim</h2>
              <p style="color: #374151; line-height: 1.6; margin: 0;">${data.summary}</p>
            </section>
          `
              : ""
          }
          
          ${
            data.experience.length > 0
              ? `
            <section style="margin-bottom: 30px;">
              <h2 style="font-size: 20px; font-weight: bold; color: #1e293b; margin: 0 0 20px 0; border-left: 4px solid #3b82f6; padding-left: 15px;">Experiência</h2>
              ${data.experience
                .map(
                  (exp) => `
                <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 25px;">
                  <h3 style="font-size: 16px; font-weight: bold; color: #1e293b; margin: 0 0 5px 0;">${exp.position}</h3>
                  <p style="color: #3b82f6; font-weight: 600; margin: 0 0 5px 0;">${exp.company}</p>
                  <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">${formatDate(exp.startDate)} - ${exp.current ? "Presente" : formatDate(exp.endDate)}</p>
                  ${exp.description ? `<p style="color: #374151; line-height: 1.5; margin: 0;">${exp.description}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </section>
          `
              : ""
          }
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            ${
              data.education.length > 0
                ? `
              <section>
                <h2 style="font-size: 20px; font-weight: bold; color: #1e293b; margin: 0 0 20px 0; border-left: 4px solid #3b82f6; padding-left: 15px;">Formação</h2>
                ${data.education
                  .map(
                    (edu) => `
                  <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h3 style="font-size: 14px; font-weight: bold; color: #1e293b; margin: 0 0 5px 0;">${edu.degree}</h3>
                    <p style="color: #3b82f6; font-size: 12px; margin: 0 0 3px 0;">${edu.institution}</p>
                    <p style="color: #64748b; font-size: 11px; margin: 0;">${edu.graduationYear}</p>
                  </div>
                `,
                  )
                  .join("")}
              </section>
            `
                : ""
            }
            
            ${
              data.skills.length > 0
                ? `
              <section>
                <h2 style="font-size: 20px; font-weight: bold; color: #1e293b; margin: 0 0 20px 0; border-left: 4px solid #3b82f6; padding-left: 15px;">Habilidades</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                  ${data.skills
                    .map(
                      (skill) => `
                    <span style="background: #dbeafe; color: #1e40af; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">${skill.name}</span>
                  `,
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }
          </div>
        </div>
      `

    default: // classico
      return `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <header style="text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 20px; margin-bottom: 30px;">
            <h1 style="font-size: 28px; font-weight: bold; color: #1e293b; margin: 0 0 10px 0;">${data.personalInfo.name}</h1>
            <p style="font-size: 16px; color: #374151; margin: 0 0 15px 0;">${data.personalInfo.title}</p>
            <div style="font-size: 12px; color: #64748b; line-height: 1.4;">
              ${data.personalInfo.email ? `<p style="margin: 3px 0;">${data.personalInfo.email}</p>` : ""}
              ${data.personalInfo.phone ? `<p style="margin: 3px 0;">${data.personalInfo.phone}</p>` : ""}
              ${data.personalInfo.location ? `<p style="margin: 3px 0;">${data.personalInfo.location}</p>` : ""}
            </div>
          </header>
          
          ${
            data.summary
              ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; color: #1e293b; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin: 0 0 15px 0;">RESUMO PROFISSIONAL</h2>
              <p style="color: #374151; line-height: 1.6; margin: 0; text-align: justify;">${data.summary}</p>
            </section>
          `
              : ""
          }
          
          ${
            data.experience.length > 0
              ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; color: #1e293b; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin: 0 0 15px 0;">EXPERIÊNCIA PROFISSIONAL</h2>
              ${data.experience
                .map(
                  (exp) => `
                <div style="margin-bottom: 20px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <h3 style="font-size: 14px; font-weight: bold; color: #1e293b; margin: 0;">${exp.position}</h3>
                    <span style="font-size: 11px; color: #64748b;">${formatDate(exp.startDate)} - ${exp.current ? "Presente" : formatDate(exp.endDate)}</span>
                  </div>
                  <p style="color: #374151; font-weight: 600; font-size: 12px; margin: 0 0 8px 0;">${exp.company}</p>
                  ${exp.description ? `<p style="color: #374151; font-size: 12px; line-height: 1.5; margin: 0; text-align: justify;">${exp.description}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </section>
          `
              : ""
          }
          
          ${
            data.education.length > 0
              ? `
            <section style="margin-bottom: 25px;">
              <h2 style="font-size: 16px; font-weight: bold; color: #1e293b; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin: 0 0 15px 0;">FORMAÇÃO ACADÊMICA</h2>
              ${data.education
                .map(
                  (edu) => `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                  <div>
                    <h3 style="font-size: 14px; font-weight: bold; color: #1e293b; margin: 0 0 3px 0;">${edu.degree}</h3>
                    <p style="color: #374151; font-size: 12px; margin: 0;">${edu.institution}</p>
                  </div>
                  <span style="font-size: 11px; color: #64748b;">${edu.graduationYear}</span>
                </div>
              `,
                )
                .join("")}
            </section>
          `
              : ""
          }
          
          ${
            data.skills.length > 0
              ? `
            <section>
              <h2 style="font-size: 16px; font-weight: bold; color: #1e293b; border-bottom: 1px solid #d1d5db; padding-bottom: 5px; margin: 0 0 15px 0;">COMPETÊNCIAS</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                ${data.skills
                  .map(
                    (skill) => `
                  <div style="color: #374151; font-size: 12px;">• ${skill.name} <span style="color: #64748b; font-size: 10px;">(${skill.level})</span></div>
                `,
                  )
                  .join("")}
              </div>
            </section>
          `
              : ""
          }
        </div>
      `
  }
}

const generateWordContent = (data: ExportData, templateId: string, docxClasses: any) => {
  const { Paragraph, TextRun, HeadingLevel, AlignmentType } = docxClasses
  const content = []

  // Header
  content.push(
    new Paragraph({
      children: [new TextRun({ text: data.personalInfo.name, bold: true, size: 32 })],
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [new TextRun({ text: data.personalInfo.title, size: 24 })],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}`,
          size: 20,
        }),
      ],
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: "" }), // Empty line
  )

  // Summary
  if (data.summary) {
    content.push(
      new Paragraph({
        children: [new TextRun({ text: "RESUMO PROFISSIONAL", bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
      }),
      new Paragraph({
        children: [new TextRun({ text: data.summary, size: 22 })],
      }),
      new Paragraph({ text: "" }),
    )
  }

  // Experience
  if (data.experience.length > 0) {
    content.push(
      new Paragraph({
        children: [new TextRun({ text: "EXPERIÊNCIA PROFISSIONAL", bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
      }),
    )

    data.experience.forEach((exp) => {
      const formatDate = (dateStr: string) => {
        if (!dateStr) return ""
        const [year, month] = dateStr.split("-")
        const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        return `${months[Number.parseInt(month) - 1]} ${year}`
      }

      content.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true, size: 22 }),
            new TextRun({
              text: ` | ${formatDate(exp.startDate)} - ${exp.current ? "Presente" : formatDate(exp.endDate)}`,
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          children: [new TextRun({ text: exp.company, bold: true, size: 20 })],
        }),
      )

      if (exp.description) {
        content.push(
          new Paragraph({
            children: [new TextRun({ text: exp.description, size: 20 })],
          }),
        )
      }

      content.push(new Paragraph({ text: "" }))
    })
  }

  // Education
  if (data.education.length > 0) {
    content.push(
      new Paragraph({
        children: [new TextRun({ text: "FORMAÇÃO ACADÊMICA", bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
      }),
    )

    data.education.forEach((edu) => {
      content.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 22 }),
            new TextRun({ text: ` | ${edu.graduationYear}`, size: 20 }),
          ],
        }),
        new Paragraph({
          children: [new TextRun({ text: edu.institution, size: 20 })],
        }),
        new Paragraph({ text: "" }),
      )
    })
  }

  // Skills
  if (data.skills.length > 0) {
    content.push(
      new Paragraph({
        children: [new TextRun({ text: "COMPETÊNCIAS", bold: true, size: 24 })],
        heading: HeadingLevel.HEADING_1,
      }),
    )

    const skillsText = data.skills.map((skill) => `• ${skill.name} (${skill.level})`).join(" | ")
    content.push(
      new Paragraph({
        children: [new TextRun({ text: skillsText, size: 20 })],
      }),
    )
  }

  return content
}
