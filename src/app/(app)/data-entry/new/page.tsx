import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { riders } from "@/lib/data";
import { Upload } from "lucide-react";

export default function NewEntryPage() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>New Delivery Entry</CardTitle>
            <CardDescription>
              Fill out the form to add a new delivery record.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rider">Rider</Label>
                <Select>
                  <SelectTrigger id="rider">
                    <SelectValue placeholder="Select a rider" />
                  </SelectTrigger>
                  <SelectContent>
                    {riders.map((rider) => (
                      <SelectItem key={rider.id} value={rider.id}>
                        {rider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Delivery Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input id="tracking" placeholder="TN123456789" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" placeholder="e.g., Customer not available, left with concierge." />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit Entry</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
            <CardHeader>
                <CardTitle>Bulk Upload</CardTitle>
                <CardDescription>Upload a CSV file for bulk data entry.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">CSV (MAX. 2MB)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <Button variant="link" className="p-0 h-auto">Download CSV template</Button>
                <p className="text-muted-foreground">Make sure your data follows the template format.</p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
