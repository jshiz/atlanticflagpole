"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlayCircle, AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface LighthouseResult {
  url: string
  scores: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  metrics: {
    fcp: string
    lcp: string
    tbt: string
    cls: string
    si: string
  }
  opportunities: Array<{
    title: string
    description: string
    savings: string
  }>
  timestamp: string
}

const TEST_URLS = [
  { label: "Homepage", url: process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com" },
  {
    label: "Product Page",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"}/products/deluxe-series-aluminum-flagpole`,
  },
  {
    label: "Collection Page",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://atlanticflagpole.com"}/collections/aluminum-flagpoles`,
  },
]

export default function LighthouseTestClient() {
  const [testing, setTesting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTest, setCurrentTest] = useState("")
  const [results, setResults] = useState<LighthouseResult[]>([])
  const [error, setError] = useState<string | null>(null)

  const runTests = async () => {
    setTesting(true)
    setProgress(0)
    setError(null)
    setResults([])

    for (let i = 0; i < TEST_URLS.length; i++) {
      const testUrl = TEST_URLS[i]
      setCurrentTest(`Testing ${testUrl.label}...`)
      setProgress(((i + 0.5) / TEST_URLS.length) * 100)

      try {
        const response = await fetch("/api/admin/lighthouse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: testUrl.url }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to run test")
        }

        const result = await response.json()
        setResults((prev) => [...prev, result])
        setProgress(((i + 1) / TEST_URLS.length) * 100)
      } catch (err) {
        console.error("Test error:", err)
        setError(err instanceof Error ? err.message : "Failed to run tests")
        setTesting(false)
        return
      }
    }

    setCurrentTest("Tests completed!")
    setTesting(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100"
    if (score >= 50) return "bg-orange-100"
    return "bg-red-100"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Lighthouse Testing</CardTitle>
          <CardDescription>Run performance, accessibility, SEO, and best practices audits on key pages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runTests} disabled={testing} className="w-full sm:w-auto">
            <PlayCircle className="mr-2 h-4 w-4" />
            {testing ? "Running Tests..." : "Run Lighthouse Tests"}
          </Button>

          {testing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{currentTest}</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">This may take 15-30 seconds per page. Please wait...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{TEST_URLS[index]?.label || "Test Result"}</CardTitle>
                <CardDescription className="text-xs">{result.url}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(result.scores).map(([key, score]) => (
                    <div key={key} className={`p-4 rounded-lg ${getScoreBg(score)}`}>
                      <div className="text-sm font-medium capitalize mb-1">
                        {key === "bestPractices" ? "Best Practices" : key}
                      </div>
                      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
                    </div>
                  ))}
                </div>

                {/* Core Web Vitals */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Core Web Vitals
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">FCP</div>
                      <div className="font-medium">{result.metrics.fcp}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">LCP</div>
                      <div className="font-medium">{result.metrics.lcp}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">TBT</div>
                      <div className="font-medium">{result.metrics.tbt}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">CLS</div>
                      <div className="font-medium">{result.metrics.cls}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Speed Index</div>
                      <div className="font-medium">{result.metrics.si}</div>
                    </div>
                  </div>
                </div>

                {/* Opportunities */}
                {result.opportunities.length > 0 && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="opportunities">
                      <AccordionTrigger>
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Optimization Opportunities ({result.opportunities.length})
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {result.opportunities.map((opp, i) => (
                            <div key={i} className="border-l-2 border-blue-500 pl-3 py-1">
                              <div className="font-medium text-sm">{opp.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">{opp.description}</div>
                              <div className="text-xs font-medium text-green-600 mt-1">
                                Potential savings: {opp.savings}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <div className="text-xs text-muted-foreground">
                  Tested: {new Date(result.timestamp).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!testing && results.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <PlayCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Click "Run Lighthouse Tests" to analyze your site performance</p>
            <p className="text-xs mt-2">
              Note: Tests use Google PageSpeed Insights API. Add GOOGLE_PAGESPEED_API_KEY for higher rate limits.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
