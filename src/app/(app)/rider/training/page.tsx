"use client";

import * as React from "react";
import { riders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { explainRiderTrainingPlan } from "@/lib/actions";
import { BrainCircuit, Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for a logged-in rider with a training plan
const loggedInRider = riders.find(r => r.trainingPlan)!;

export default function RiderTrainingPage() {
  const { toast } = useToast();
  const [explanation, setExplanation] = React.useState<string | null>(null);
  const [isExplaining, setIsExplaining] = React.useState(false);
  
  if (!loggedInRider || !loggedInRider.trainingPlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Training Plan Assigned</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You do not currently have an active training plan. Check back later!</p>
        </CardContent>
      </Card>
    );
  }

  const { trainingPlan } = loggedInRider;
  const planItems = trainingPlan.plan.split('. ').filter(item => item);

  const handleExplain = async () => {
    setIsExplaining(true);
    const riderPerformanceData = `Rider: ${loggedInRider.name}, Total Deliveries: ${loggedInRider.performance.totalDeliveries}, Success Rate: ${loggedInRider.performance.successRate}%`;
    const trainingRecommendations = trainingPlan.plan;
    
    const result = await explainRiderTrainingPlan({ riderPerformanceData, trainingRecommendations });

    if (result.success && result.data) {
        setExplanation(result.data.explanation);
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch explanation for your training plan."
        });
    }
    setIsExplaining(false);
  };


  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Your Training Plan</CardTitle>
                <Badge variant={trainingPlan.status === 'approved' ? 'default' : 'secondary'} className={trainingPlan.status === 'approved' ? 'bg-accent text-accent-foreground' : ''}>
                    {trainingPlan.status.charAt(0).toUpperCase() + trainingPlan.status.slice(1)}
                </Badge>
            </div>
            <CardDescription>
              Complete these tasks to improve your performance. Generated on {trainingPlan.generatedDate}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                    <Checkbox id={`task-${index}`} />
                    <label
                        htmlFor={`task-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {item}
                    </label>
                </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>Mark as Completed</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-primary"/> Reasoning</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {trainingPlan.reasoning}
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400"/> Need more clarity?</CardTitle>
            </CardHeader>
            <CardContent>
                {explanation ? (
                    <p className="text-sm text-muted-foreground">{explanation}</p>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Get a detailed, step-by-step explanation of why this plan was recommended for you.
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <Button variant="outline" onClick={handleExplain} disabled={isExplaining}>
                    {isExplaining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Explain Deeper
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
