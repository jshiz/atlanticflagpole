"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, Activity, CheckCircle, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"

interface DailyTask {
  priority: "high" | "medium" | "low"
  task: string
  description: string
  metric: string
  action: string
  link: string
}

export function DailyTasksClient() {
  const [tasks, setTasks] = useState<DailyTask[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/daily-tasks")
      if (response.ok) {
        const data = await response.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error("[v0] Failed to fetch daily tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>
    }
  }

  const getPriorityIcon = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
      case "medium":
        return <Activity className="h-5 w-5 text-yellow-600 flex-shrink-0" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Tasks & Recommendations</CardTitle>
            <CardDescription>Prioritized action items based on real-time site data</CardDescription>
          </div>
          <Button onClick={fetchTasks} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-8 text-[#0B1C2C]/60">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-600" />
            <p className="font-medium">No action items at this time</p>
            <p className="text-sm">Your site is running optimally!</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {tasks.map((task, index) => (
              <AccordionItem key={index} value={`task-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      {getPriorityIcon(task.priority)}
                      <div className="text-left">
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-[#0B1C2C]/60">{task.metric}</p>
                      </div>
                    </div>
                    {getPriorityBadge(task.priority)}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 space-y-3">
                    <div className="bg-[#0B1C2C]/5 p-4 rounded">
                      <p className="text-sm text-[#0B1C2C]/80 mb-3">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#0B1C2C]">Recommended Action:</p>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={task.link}>
                            <ExternalLink className="h-3 w-3 mr-2" />
                            {task.action.split(" ").slice(0, 2).join(" ")}
                          </Link>
                        </Button>
                      </div>
                      <p className="text-sm text-[#0B1C2C]/70 mt-2">{task.action}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  )
}
