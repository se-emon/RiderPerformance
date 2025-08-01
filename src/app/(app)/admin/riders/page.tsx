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
import { riders } from "@/lib/data";
import { MoreHorizontal, PlusCircle, UserPlus } from "lucide-react";
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  

export default function AdminRidersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Riders</CardTitle>
            <CardDescription>
                Manage your riders and view their performance.
            </CardDescription>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    Add Rider
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Rider</DialogTitle>
                    <DialogDescription>
                        Fill in the details to add a new rider to the system.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="John Doe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Phone</Label>
                        <Input id="phone" type="tel" placeholder="123-456-7890" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save Rider</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead className="hidden md:table-cell">Join Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {riders.map((rider) => (
              <TableRow key={rider.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Rider avatar"
                    className="aspect-square rounded-full object-cover"
                    height="48"
                    src={rider.avatar}
                    width="48"
                    data-ai-hint="profile picture"
                  />
                </TableCell>
                <TableCell className="font-medium">
                    <div className="font-medium">{rider.name}</div>
                    <div className="text-sm text-muted-foreground">{rider.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={rider.status === "active" ? "secondary" : "outline"} className={rider.status === 'active' ? 'bg-accent text-accent-foreground hover:bg-accent/80' : ''}>
                    {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                    {rider.performance.successRate}% success rate
                    <div className="text-sm text-muted-foreground">{rider.performance.totalDeliveries} deliveries</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{rider.joinDate}</TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
