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
  import { Badge } from "@/components/ui/badge";
  import { deliveries, riders } from "@/lib/data";
  import { Trophy } from "lucide-react";

  // Mock data for a logged-in rider
const loggedInRider = riders[0]; 
const riderDeliveries = deliveries.filter(d => d.riderId === loggedInRider.id);

const totalDeliveries = riderDeliveries.length;
const successfulDeliveries = riderDeliveries.filter(d => d.status === 'delivered').length;
const successRate = totalDeliveries > 0 ? (successfulDeliveries / totalDeliveries * 100).toFixed(1) : 0;

const topRiders = [...riders]
  .sort((a, b) => b.performance.successRate - a.performance.successRate)
  .slice(0, 10);
  
const riderRank = topRiders.findIndex(r => r.id === loggedInRider.id) + 1;
  
export default function RiderDashboard() {
    return (
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Success Rate</CardDescription>
                    <CardTitle className="text-4xl text-accent">{successRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                    Based on {totalDeliveries} total deliveries
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Monthly Rank</CardDescription>
                    <CardTitle className="text-4xl">
                        {riderRank > 0 ? `#${riderRank}` : 'N/A'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                    {riderRank > 0 ? 'In the top 10 this month!' : 'Keep pushing for the top 10!'}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 lg:row-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-500"/> Your Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total Deliveries</span>
                        <span>{loggedInRider.performance.totalDeliveries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Failed Deliveries</span>
                        <span>{loggedInRider.performance.failedDeliveries}</span>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Returned Packages</span>
                        <span>{loggedInRider.performance.returnedDeliveries}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-3 lg:row-start-2">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery History</CardTitle>
                    <CardDescription>Your recent delivery records.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Tracking #</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {riderDeliveries.slice(0, 5).map((delivery) => (
                            <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.trackingNumber}</TableCell>
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
  