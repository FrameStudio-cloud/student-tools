import { useState } from "react"
import { extractTextFromPdf } from "../utils/pdfParser"
function DFDDiagram({ data }) {
  const centerX = 340
  const centerY = 230
  const radius = 185

  const entityPositions = data.external_entities.map((entity, i) => {
    const angle = (i / data.external_entities.length) * 2 * Math.PI - Math.PI / 2
    return {
      name: entity,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }
  })

  // separate incoming and outgoing flows per entity
  const getFlowsBetween = (entityName) => {
    const incoming = data.data_flows.filter(
      f => f.from === "SYSTEM" && f.to === entityName
    )
    const outgoing = data.data_flows.filter(
      f => f.from === entityName && f.to === "SYSTEM"
    )
    return { incoming, outgoing }
  }

  // offset parallel arrows so they dont overlap
  const getOffsetPoints = (x1, y1, x2, y2, offset) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.sqrt(dx * dx + dy * dy)
    const nx = -dy / len * offset
    const ny = dx / len * offset
    return {
      x1: x1 + nx, y1: y1 + ny,
      x2: x2 + nx, y2: y2 + ny,
      mx: (x1 + x2) / 2 + nx,
      my: (y1 + y2) / 2 + ny,
    }
  }

  const svgHeight = 480

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-center font-semibold text-lg mb-1 text-gray-800">
        {data.system_name}
      </h3>
      <p className="text-center text-xs text-gray-400 mb-4">Level 0 DFD — Context Diagram</p>

      <svg width="100%" viewBox={`0 0 680 ${svgHeight}`}>
        <defs>
          {/* orange arrow — outgoing from system */}
          <marker id="arrow-out" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#d4622a"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          {/* brown arrow — incoming to system */}
          <marker id="arrow-in" viewBox="0 0 10 10" refX="8" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#6b3f1f"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* draw flows for each entity */}
        {entityPositions.map((entity) => {
          const { incoming, outgoing } = getFlowsBetween(entity.name)
          const hasBoth = incoming.length > 0 && outgoing.length > 0
          const elements = []

          // outgoing from system → entity (orange)
          incoming.forEach((flow, idx) => {
            const offset = hasBoth ? 10 : 0
            const pts = getOffsetPoints(
              centerX, centerY, entity.x, entity.y, offset
            )
            elements.push(
              <g key={`out-${idx}`}>
                <line
                  x1={pts.x1} y1={pts.y1}
                  x2={pts.x2} y2={pts.y2}
                  stroke="#d4622a"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-out)"
                />
                <rect
                  x={pts.mx - 36} y={pts.my - 10}
                  width="72" height="18"
                  rx="4" fill="white"
                  stroke="#f5d4be" strokeWidth="0.5"
                />
                <text
                  x={pts.mx} y={pts.my + 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#d4622a"
                  fontWeight="500"
                >
                  {flow.label}
                </text>
              </g>
            )
          })

          // incoming to system ← entity (brown)
          outgoing.forEach((flow, idx) => {
            const offset = hasBoth ? -10 : 0
            const pts = getOffsetPoints(
              entity.x, entity.y, centerX, centerY, offset
            )
            elements.push(
              <g key={`in-${idx}`}>
                <line
                  x1={pts.x1} y1={pts.y1}
                  x2={pts.x2} y2={pts.y2}
                  stroke="#6b3f1f"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-in)"
                />
                <rect
                  x={pts.mx - 36} y={pts.my - 10}
                  width="72" height="18"
                  rx="4" fill="white"
                  stroke="#d4c4b0" strokeWidth="0.5"
                />
                <text
                  x={pts.mx} y={pts.my + 4}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#6b3f1f"
                  fontWeight="500"
                >
                  {flow.label}
                </text>
              </g>
            )
          })

          return <g key={entity.name}>{elements}</g>
        })}

        {/* central system box */}
        <rect
          x={centerX - 90} y={centerY - 44}
          width="180" height="88"
          rx="12"
          fill="#fdf0e8"
          stroke="#d4622a"
          strokeWidth="2"
        />
        <rect
          x={centerX - 90} y={centerY - 44}
          width="180" height="28"
          rx="12"
          fill="#d4622a"
        />
        <rect
          x={centerX - 90} y={centerY - 22}
          width="180" height="6"
          fill="#d4622a"
        />
        <text
          x={centerX} y={centerY - 24}
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="white"
        >
          {data.system_name.length > 22
            ? data.system_name.slice(0, 22) + "..."
            : data.system_name}
        </text>
        <text
          x={centerX} y={centerY + 8}
          textAnchor="middle"
          fontSize="11"
          fill="#6b3f1f"
          fontWeight="500"
        >
          Process 0
        </text>
        <text
          x={centerX} y={centerY + 26}
          textAnchor="middle"
          fontSize="9"
          fill="#9a7e6a"
        >
          Central System
        </text>

        {/* entity boxes */}
        {entityPositions.map((entity, i) => (
          <g key={i}>
            <rect
              x={entity.x - 72} y={entity.y - 28}
              width="144" height="56"
              rx="8"
              fill="#f3ede3"
              stroke="#c49a6c"
              strokeWidth="1.5"
            />
            <rect
              x={entity.x - 72} y={entity.y - 28}
              width="144" height="4"
              rx="2"
              fill="#c49a6c"
            />
            <text
              x={entity.x} y={entity.y - 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#2c1a0e"
            >
              {entity.name}
            </text>
            <text
              x={entity.x} y={entity.y + 14}
              textAnchor="middle"
              fontSize="9"
              fill="#9a7e6a"
            >
              External Entity
            </text>
          </g>
        ))}

        {/* legend */}
        <g transform={`translate(20, ${svgHeight - 40})`}>
          <line x1="0" y1="8" x2="24" y2="8"
            stroke="#d4622a" strokeWidth="1.5"
            markerEnd="url(#arrow-out)"/>
          <text x="30" y="12" fontSize="9" fill="#9a7e6a">
            System → Entity
          </text>
          <line x1="120" y1="8" x2="144" y2="8"
            stroke="#6b3f1f" strokeWidth="1.5"
            markerEnd="url(#arrow-in)"/>
          <text x="150" y="12" fontSize="9" fill="#9a7e6a">
            Entity → System
          </text>
        </g>

      </svg>
    </div>
  )
}
export default function DFDGenerator() {
  const [pdfText, setPdfText] = useState("")
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [diagramData, setDiagramData] = useState(null)

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    setFileName(file.name)
    setLoading(true)

    try {
      const text = await extractTextFromPdf(file)
      setPdfText(text)
    } catch (error) {
        console.log(error)
      alert("Error reading PDF. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function generateDFD() {
    if (!pdfText) {
      alert("Please upload a PDF first")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt: `You are a senior system analyst with expertise in Data Flow Diagrams.

Analyze the system analysis document below and extract comprehensive DFD information.

Look specifically for:
- The main system being described
- All people, organizations, or external systems that interact with it (external entities)
- All information/data that flows IN to the system from entities
- All information/data that flows OUT from the system to entities

STRICT RULES:
- Extract minimum 3 and maximum 8 external entities
- Extract ALL data flows — both into and out of the system
- Entity names must be short — maximum 3 words
- Flow labels must be short — maximum 4 words
- The example below is ONLY a format guide — do NOT copy it
- Return ONLY the JSON, no explanation, no markdown, no extra text

Return exactly this structure:
{
  "system_name": "Short System Name",
  "external_entities": [
    "Entity One",
    "Entity Two",
    "Entity Three"
  ],
  "data_flows": [
    {"from": "Entity One", "to": "SYSTEM", "label": "Request type"},
    {"from": "SYSTEM", "to": "Entity One", "label": "Response type"},
    {"from": "Entity Two", "to": "SYSTEM", "label": "Data type"}
  ]
}

Document:
${pdfText}`,
          stream: false
        })
      })
      const data = await response.json()
      const text = data.response
            const cleaned = text.replace(/```json|```/g, "").trim()

      const parsed = JSON.parse(cleaned)


      setDiagramData(parsed)
      console.log(diagramData)

    } catch (error){
        console.log(error)
      alert("Error generating diagram. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        DFD Generator
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Upload a system analysis PDF and get a Level 0 DFD instantly
      </p>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-orange-200 rounded-xl p-8 text-center mb-4 bg-orange-50">

        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="hidden"
          id="pdf-upload"
        />

        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="text-4xl mb-3">📄</div>

          <div className="text-gray-600 font-medium">
            {fileName ? fileName : "Click to upload PDF"}
          </div>

          <div className="text-gray-400 text-sm mt-1">
            {pdfText
              ? "✅ Text extracted successfully"
              : "System analysis document"}
          </div>
        </label>

      </div>

      {/* Generate Button */}
      <button
        onClick={generateDFD}
        disabled={!pdfText || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-lg transition mb-8"
      >
        {loading ? "Generating..." : "Generate DFD →"}
      </button>

      {/* Diagram */}
      {diagramData && <DFDDiagram data={diagramData} />}

    </div>
  )
}

