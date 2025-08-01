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
import { Button } from "@/components/ui/button";
import { deliveries } from "@/lib/data";
import { Check, MoreHorizontal, Truck, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

export default function AdminDeliveriesPage() {
    const pendingDeliveries = deliveries.filter(d => !d.approved);
    const approvedDeliveries = deliveries.filter(d => d.approved);

  return (
    <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
            <Card>
            <CardHeader>
                <CardTitle>All Deliveries</CardTitle>
                <CardDescription>
                A comprehensive log of all delivery records.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DeliveriesTable data={deliveries} />
            </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="pending">
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approval</CardTitle>
                    <CardDescription>
                    These deliveries require review and approval.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DeliveriesTable data={pendingDeliveries} />
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  );
}

function DeliveriesTable({ data }: { data: typeof deliveries }) {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Rider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Tracking #</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>
                <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((delivery) => (
                <TableRow key={delivery.id}>
                <TableCell className="font-medium">{delivery.riderName}</TableCell>
                <TableCell>
                    <Badge variant={delivery.status === 'delivered' ? 'default' : delivery.status === 'failed' ? 'destructive' : 'secondary'} className={delivery.status === 'delivered' ? 'bg-accent text-accent-foreground' : ''}>
                    {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
                    </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{delivery.trackingNumber}</TableCell>
                <TableCell className="hidden md:table-cell">{delivery.date}</TableCell>
                <TableCell>
                    <Badge variant={delivery.approved ? "secondary" : "outline"} className={delivery.approved ? 'border-green-600 text-green-600' : ''}>
                        {delivery.approved ? 'Approved' : 'Pending'}
                    </Badge>
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {!delivery.approved && (
                            <>
                                <DropdownMenuItem><Check className="mr-2 h-4 w-4 text-green-500" />Approve</DropdownMenuItem>
                                <DropdownMenuItem><X className="mr-2 h-4 w-4 text-red-500" />Reject</DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
}
