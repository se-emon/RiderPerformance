// This page must be a client component to use hooks like useState and to handle form submissions.
"use client";

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { riders, type Rider } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Check, Hourglass, Loader2, Sparkles } from "lucide-react";
import { generateRiderTrainingPlan } from '@/lib/actions';
import type { GenerateTrainingPlanOutput } from '@/ai/flows/generate-training-plan';

export default function AdminTrainingPage() {
  return (
    <div className="space-y-4">
        <Card>
            <CardHeader>
                <CardTitle>AI Performance Coach</CardTitle>
                <CardDescription>
                    Generate and manage AI-powered training plans for your riders to enhance their performance.
                </CardDescription>
            </CardHeader>
        </Card>
      <Accordion type="single" collapsible className="w-full">
        {riders.map((rider) => (
          <RiderTrainingItem key={rider.id} rider={rider} />
        ))}
      </Accordion>
    </div>
  );
}

function RiderTrainingItem({ rider }: { rider: Rider }) {
    const [trainingPlan, setTrainingPlan] = React.useState<GenerateTrainingPlanOutput | null>(rider.trainingPlan ? { trainingPlan: rider.trainingPlan.plan, reasoning: rider.trainingPlan.reasoning } : null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [status, setStatus] = React.useState(rider.trainingPlan?.status || 'pending');

    const handleGeneratePlan = async () => {
        setIsLoading(true);
        const riderPerformanceData = `Rider: ${rider.name}, Total Deliveries: ${rider.performance.totalDeliveries}, Success Rate: ${rider.performance.successRate}%, Failed Deliveries: ${rider.performance.failedDeliveries}, Returned: ${rider.performance.returnedDeliveries}`;
        const result = await generateRiderTrainingPlan({ riderPerformanceData });
        if (result.success && result.data) {
            setTrainingPlan(result.data);
        } else {
            // Handle error, maybe show a toast
            console.error(result.error);
        }
        setIsLoading(false);
    };
    
    const handleApprove = () => setStatus('approved');
    const handleStartTraining = () => setStatus('in-progress');

  return (
    <AccordionItem value={rider.id}>
      <AccordionTrigger className="hover:no-underline bg-card p-4 rounded-lg">
        <div className="flex items-center gap-4">
            <div className="font-medium">{rider.name}</div>
            <div className="text-sm text-muted-foreground">{rider.email}</div>
        </div>
        <div className='flex items-center gap-2'>
            <Badge variant={rider.trainingPlan ? (status === 'approved' ? "secondary" : "outline") : "destructive"} className={status === 'approved' ? 'bg-accent text-accent-foreground' : ''}>
                {rider.trainingPlan ? status.charAt(0).toUpperCase() + status.slice(1) : "No Plan"}
            </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 pt-2">
        <Card className="bg-secondary/50">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary" />AI-Generated Training Plan</CardTitle>
                        <CardDescription>Based on {rider.name}&apos;s latest performance metrics.</CardDescription>
                    </div>
                     <div className="flex gap-2">
                        {status === 'pending' && trainingPlan && <Button size="sm" onClick={handleApprove}><Check className="mr-2 h-4 w-4" />Approve</Button>}
                        {status === 'approved' && <Button size="sm" onClick={handleStartTraining}>Start Training</Button>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-40 gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating personalized plan...</p>
                    </div>
                ) : trainingPlan ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold mb-2">Recommended Training</h3>
                            <p className="text-sm text-muted-foreground">{trainingPlan.trainingPlan}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Reasoning</h3>
                            <p className="text-sm text-muted-foreground">{trainingPlan.reasoning}</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No training plan has been generated for {rider.name}.</p>
                    </div>
                )}
            </CardContent>
             <CardFooter className="flex justify-end">
                {!trainingPlan && (
                    <Button onClick={handleGeneratePlan} disabled={isLoading}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Plan
                    </Button>
                )}
             </CardFooter>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
}
