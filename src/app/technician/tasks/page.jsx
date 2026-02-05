'use client'

import { useState } from 'react'

import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { DashboardSidebar } from '@/Components/DashboardSidebar'
import { DashboardHeader } from '@/Components/DashboardHeaderProps'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'


const mockTasks = [
  { id: 1, ticketId: 'FIX-2402', customer: 'Michael Chen', device: 'MacBook Air', issue: 'Battery Replacement', status: 'in-progress', priority: 'medium', startDate: '2024-01-28', estimatedEnd: '2024-01-30' },
  { id: 2, ticketId: 'FIX-2405', customer: 'Jessica Martinez', device: 'Dell XPS 13', issue: 'Keyboard Problem', status: 'in-progress', priority: 'medium', startDate: '2024-01-29', estimatedEnd: '2024-01-31' },
  { id: 3, ticketId: 'FIX-2406', customer: 'Robert Taylor', device: 'HP Pavilion', issue: 'Screen Replacement', status: 'pending', priority: 'high', startDate: '2024-02-01', estimatedEnd: '2024-02-02' },
]

function getStatusIcon(status) {
  switch(status) {
    case 'in-progress':
      return <Clock className="h-5 w-5 text-blue-500" />
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case 'pending':
      return <AlertCircle className="h-5 w-5 text-orange-500" />
    default:
      return null
  }
}

function getPriorityBadge(priority) {
  const priorityMap = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  }
  return priorityMap[priority] || 'bg-gray-100 text-gray-800'
}

export default function MyAssignedTasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [selectedTask, setSelectedTask] = useState(null)

  const handleStatusUpdate = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
    setSelectedTask(null)
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-50 border-b border-border bg-background px-4 py-3 md:hidden">
          <h1 className="text-lg font-semibold text-foreground">My Tasks</h1>
        </div>
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Assigned Tasks</h1>
              <p className="text-muted-foreground">Track and manage your repair assignments</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Tasks</p>
                      <p className="text-3xl font-bold text-foreground">{tasks.length}</p>
                    </div>
                    <Clock className="h-10 w-10 text-primary/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                      <p className="text-3xl font-bold text-foreground">{inProgressCount}</p>
                    </div>
                    <Clock className="h-10 w-10 text-blue-500/20" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Completed</p>
                      <p className="text-3xl font-bold text-foreground">{completedCount}</p>
                    </div>
                    <CheckCircle2 className="h-10 w-10 text-green-500/20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Active Tasks</CardTitle>
                <CardDescription>Your current repair assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(task.status)}
                            <h3 className="font-semibold text-foreground">{task.ticketId}</h3>
                            <Badge className={getPriorityBadge(task.priority)}>
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{task.customer}</p>
                          <p className="text-sm font-medium text-foreground">{task.device}</p>
                          <p className="text-sm text-muted-foreground">{task.issue}</p>
                          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                            <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
                            <span>Est. End: {new Date(task.estimatedEnd).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {task.status !== 'completed' && (
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => handleStatusUpdate(task.id, task.status === 'pending' ? 'in-progress' : 'completed')}
                            >
                              {task.status === 'pending' ? 'Start Work' : 'Mark Complete'}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                            className="bg-background border-border"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
