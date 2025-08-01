import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { deliveries, Delivery } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function DataEntryDashboard() {
    const pendingDeliveries = deliveries.filter(d => !d.approved);
    const approvedDeliveries = deliveries.filter(d => d.approved);

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
        <Link href="/data-entry/new">
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            New Entry
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <TabsContent value="all">
            <Card>
                <CardHeader>
                    <CardTitle>All Submitted Deliveries</CardTitle>
                    <CardDescription>A log of all your data entries.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeliveriesTable data={deliveries} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="pending">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Deliveries</CardTitle>
                    <CardDescription>These entries are awaiting admin approval.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeliveriesTable data={pendingDeliveries} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="approved">
            <Card>
                <CardHeader>
                    <CardTitle>Approved Deliveries</CardTitle>
                    <CardDescription>These entries have been approved by an admin.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DeliveriesTable data={approvedDeliveries} />
                </CardContent>
            </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}


function DeliveriesTable({ data }: { data: Delivery[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Tracking #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(delivery => (
                    <TableRow key={delivery.id}>
                        <TableCell>{delivery.riderName}</TableCell>
                        <TableCell>{delivery.trackingNumber}</TableCell>
                        <TableCell>{delivery.date}</TableCell>
                        <TableCell>
                            <Badge variant={delivery.status === 'delivered' ? 'default' : delivery.status === 'failed' ? 'destructive' : 'secondary'} className={delivery.status === 'delivered' ? 'bg-accent text-accent-foreground' : ''}>
                                {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={delivery.approved ? "secondary" : "outline"} className={delivery.approved ? 'border-green-600 text-green-600' : ''}>
                                {delivery.approved ? 'Approved' : 'Pending'}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
