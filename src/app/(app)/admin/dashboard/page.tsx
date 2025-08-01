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
import {
  CheckCircle2,
  XCircle,
  ArchiveRestore,
  Bike,
} from "lucide-react";
import { deliveries, riders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const totalDeliveries = deliveries.length;
const successfulDeliveries = deliveries.filter(d => d.status === 'delivered').length;
const failedDeliveries = deliveries.filter(d => d.status === 'failed').length;
const returnedDeliveries = deliveries.filter(d => d.status === 'returned').length;

const monthlyPerformance = [
  { name: "Jan", total: Math.floor(Math.random() * 1000) + 500 },
  { name: "Feb", total: Math.floor(Math.random() * 1000) + 500 },
  { name: "Mar", total: Math.floor(Math.random() * 1000) + 500 },
  { name: "Apr", total: Math.floor(Math.random() * 1000) + 500 },
  { name: "May", total: Math.floor(Math.random() * 1000) + 500 },
  { name: "Jun", total: successfulDeliveries },
];

export default function AdminDashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Riders</CardDescription>
            <CardTitle className="text-4xl">{riders.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {riders.filter(r => r.status === 'active').length} active
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Successful Deliveries</CardDescription>
            <CardTitle className="text-4xl text-accent">{successfulDeliveries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {((successfulDeliveries / totalDeliveries) * 100).toFixed(2)}% success rate
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed Deliveries</CardDescription>
            <CardTitle className="text-4xl">{failedDeliveries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Needs investigation
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Returned Packages</CardDescription>
            <CardTitle className="text-4xl">{returnedDeliveries}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Awaiting processing
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Total successful deliveries this year.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyPerformance}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
            <CardDescription>
              A log of the most recent deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {deliveries.slice(0, 5).map((delivery) => (
                    <TableRow key={delivery.id}>
                        <TableCell>
                        <div className="font-medium">{delivery.riderName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                            {riders.find(r => r.id === delivery.riderId)?.email}
                        </div>
                        </TableCell>
                        <TableCell>
                        <Badge variant={delivery.status === 'delivered' ? 'default' : delivery.status === 'failed' ? 'destructive' : 'secondary'} className={delivery.status === 'delivered' ? 'bg-accent text-accent-foreground' : ''}>
                            {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                        </Badge>
                        </TableCell>
                        <TableCell>{delivery.date}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
