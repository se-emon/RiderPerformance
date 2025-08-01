import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { riders } from "@/lib/data";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Sort riders by success rate for the top 10 report
const topRiders = [...riders]
  .sort((a, b) => b.performance.successRate - a.performance.successRate)
  .slice(0, 10);

const performanceDistribution = [
    { range: '95-100%', count: riders.filter(r => r.performance.successRate >= 95).length },
    { range: '90-94%', count: riders.filter(r => r.performance.successRate >= 90 && r.performance.successRate < 95).length },
    { range: '85-89%', count: riders.filter(r => r.performance.successRate >= 85 && r.performance.successRate < 90).length },
    { range: '<85%', count: riders.filter(r => r.performance.successRate < 85).length },
]

export default function ReportsPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top 10 Riders</CardTitle>
            <CardDescription>Monthly performance leaders.</CardDescription>
          </div>
          <Button size="sm" variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead className="text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topRiders.map((rider, index) => (
                <TableRow key={rider.id}>
                  <TableCell className="font-bold">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Image src={rider.avatar} alt={rider.name} width={32} height={32} className="rounded-full" data-ai-hint="profile picture" />
                        <div>
                            <div className="font-medium">{rider.name}</div>
                            <div className="text-xs text-muted-foreground">{rider.email}</div>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-accent">{rider.performance.successRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
          <CardDescription>
            Distribution of riders based on success rate.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceDistribution} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                    }}
                />
                <Bar dataKey="count" name="Number of Riders" fill="hsl(var(--primary))" />
            </BarChart>
        </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
