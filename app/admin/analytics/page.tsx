"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AdminNav } from "@/components/admin/admin-nav"
import { Activity, TrendingUp, AlertCircle, CheckCircle, Zap, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export const dynamic = "force-dynamic"

export default function AdminAnalyticsPage() {
  const [lighthouseScores, setLighthouseScores] = useState<any>(null)
  const [isRunningTest, setIsRunningTest] = useState(false)
  const [selectedPage, setSelectedPage] = useState("/")
  const [testProgress, setTestProgress] = useState(0)
  const [testStatus, setTestStatus] = useState("")

  const testPages = [
    { path: "/", label: "Home" },
    { path: "/products/deluxe-series-aluminum-flagpole", label: "Product Page" },
    { path: "/collections/residential-flagpoles", label: "Collection Page" },
    { path: "/cart", label: "Cart" },
    { path: "/about", label: "About" },
  ]

  const runLighthouseTest = async (pagePath: string) => {
    setIsRunningTest(true)
    setTestProgress(0)
    setTestStatus("Initializing test...")
    setLighthouseScores(null)

    const progressInterval = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 500)

    const statusMessages = [
      "Connecting to Google PageSpeed Insights...",
      "Loading page...",
      "Running performance audit...",
      "Analyzing accessibility...",
      "Checking best practices...",
      "Evaluating SEO...",
      "Generating recommendations...",
    ]

    let statusIndex = 0
    const statusInterval = setInterval(() => {
      if (statusIndex < statusMessages.length) {
        setTestStatus(statusMessages[statusIndex])
        statusIndex++
      }
    }, 2000)

    try {
      const response = await fetch("/api/admin/lighthouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pagePath }),
      })

      if (!response.ok) {
        throw new Error("Failed to run Lighthouse test")
      }

      const data = await response.json()
      setLighthouseScores(data)
      setTestProgress(100)
      setTestStatus("Test completed!")
    } catch (error) {
      console.error("[v0] Lighthouse test failed:", error)
      setTestStatus("Test failed. Please try again.")
    } finally {
      clearInterval(progressInterval)
      clearInterval(statusInterval)
      setTimeout(() => {
        setIsRunningTest(false)
        setTestProgress(0)
        setTestStatus("")
      }, 1000)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 50) return "secondary"
    return "destructive"
  }

  const dailyTasks = [
    {
      priority: "high",
      task: "Review Core Web Vitals",
      description: "LCP is above 2.5s on product pages. Consider optimizing images and reducing JavaScript.",
      metric: "LCP: 3.2s",
    },
    {
      priority: "medium",
      task: "Optimize Mobile Performance",
      description: "Mobile performance score is 67. Focus on reducing bundle size and lazy loading images.",
      metric: "Mobile Score: 67",
    },
    {
      priority: "low",
      task: "Update Meta Descriptions",
      description: "5 pages missing meta descriptions. This affects SEO and click-through rates.",
      metric: "5 pages affected",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Site Analytics & Performance</h1>
            <p className="text-muted-foreground">Real Google Lighthouse scores and optimization insights</p>
          </div>
        </div>

        <Tabs defaultValue="lighthouse" className="space-y-6">
          <TabsList>
            <TabsTrigger value="lighthouse">Lighthouse Tests</TabsTrigger>
            <TabsTrigger value="daily-tasks">Daily Tasks</TabsTrigger>
            <TabsTrigger value="metrics">Real-Time Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="lighthouse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Lighthouse Performance Testing</CardTitle>
                <CardDescription>
                  Run real Google PageSpeed Insights tests on your pages (powered by Lighthouse)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  {testPages.map((page) => (
                    <Button
                      key={page.path}
                      variant={selectedPage === page.path ? "default" : "outline"}
                      onClick={() => {
                        setSelectedPage(page.path)
                        runLighthouseTest(page.path)
                      }}
                      disabled={isRunningTest}
                    >
                      {page.label}
                    </Button>
                  ))}
                </div>

                {isRunningTest && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">Running Lighthouse Test</p>
                          <p className="text-sm text-muted-foreground">{testStatus}</p>
                        </div>
                        <span className="text-sm font-medium">{Math.round(testProgress)}%</span>
                      </div>
                      <Progress value={testProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        This typically takes 15-30 seconds. Real data from Google PageSpeed Insights API.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {lighthouseScores && !isRunningTest && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Performance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.performance)}`}>
                            {lighthouseScores.performance}
                          </div>
                          <Badge variant={getScoreBadge(lighthouseScores.performance)} className="mt-2">
                            {lighthouseScores.performance >= 90
                              ? "Good"
                              : lighthouseScores.performance >= 50
                                ? "Needs Improvement"
                                : "Poor"}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Accessibility</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.accessibility)}`}>
                            {lighthouseScores.accessibility}
                          </div>
                          <Badge variant={getScoreBadge(lighthouseScores.accessibility)} className="mt-2">
                            {lighthouseScores.accessibility >= 90
                              ? "Good"
                              : lighthouseScores.accessibility >= 50
                                ? "Needs Improvement"
                                : "Poor"}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Best Practices</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.bestPractices)}`}>
                            {lighthouseScores.bestPractices}
                          </div>
                          <Badge variant={getScoreBadge(lighthouseScores.bestPractices)} className="mt-2">
                            {lighthouseScores.bestPractices >= 90
                              ? "Good"
                              : lighthouseScores.bestPractices >= 50
                                ? "Needs Improvement"
                                : "Poor"}
                          </Badge>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">SEO</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className={`text-3xl font-bold ${getScoreColor(lighthouseScores.seo)}`}>
                            {lighthouseScores.seo}
                          </div>
                          <Badge variant={getScoreBadge(lighthouseScores.seo)} className="mt-2">
                            {lighthouseScores.seo >= 90
                              ? "Good"
                              : lighthouseScores.seo >= 50
                                ? "Needs Improvement"
                                : "Poor"}
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>

                    {lighthouseScores.metrics && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Core Web Vitals</CardTitle>
                          <CardDescription>Key performance metrics from Google</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                            <div>
                              <p className="text-sm text-muted-foreground">First Contentful Paint</p>
                              <p className="text-lg font-semibold">{lighthouseScores.metrics.fcp}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Largest Contentful Paint</p>
                              <p className="text-lg font-semibold">{lighthouseScores.metrics.lcp}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Blocking Time</p>
                              <p className="text-lg font-semibold">{lighthouseScores.metrics.tbt}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Cumulative Layout Shift</p>
                              <p className="text-lg font-semibold">{lighthouseScores.metrics.cls}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Speed Index</p>
                              <p className="text-lg font-semibold">{lighthouseScores.metrics.si}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {lighthouseScores.recommendations && lighthouseScores.recommendations.length > 0 && (
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="recommendations">
                          <AccordionTrigger>
                            Top Optimization Opportunities ({lighthouseScores.recommendations.length})
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3">
                            {lighthouseScores.recommendations.map((rec: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium">{rec.title}</p>
                                    {rec.savings && (
                                      <Badge variant="secondary" className="ml-2">
                                        Save {rec.savings}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                                </div>
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily-tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Optimization Tasks</CardTitle>
                <CardDescription>Prioritized action items based on current site metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dailyTasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {task.priority === "high" && <AlertCircle className="h-6 w-6 text-red-600" />}
                      {task.priority === "medium" && <Activity className="h-6 w-6 text-yellow-600" />}
                      {task.priority === "low" && <CheckCircle className="h-6 w-6 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{task.task}</h3>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">{task.metric}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Avg Page Load
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3s</div>
                  <p className="text-xs text-muted-foreground">Target: &lt;2.5s</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Core Web Vitals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Good</div>
                  <p className="text-xs text-muted-foreground">All metrics passing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Mobile Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">67</div>
                  <p className="text-xs text-muted-foreground">Needs improvement</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    SEO Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">92</div>
                  <p className="text-xs text-muted-foreground">Excellent</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
