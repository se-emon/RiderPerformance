// NOTE: This file should be server-side only.
// The 'use server' directive is not necessary here because all exports are server actions.
// However, we are keeping it for clarity and to follow best practices.
'use server';

import { generateTrainingPlan, GenerateTrainingPlanInput } from '@/ai/flows/generate-training-plan';
import { explainTrainingRecommendations, ExplainTrainingRecommendationsInput } from '@/ai/flows/explain-training-recommendations';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(role: 'admin' | 'rider' | 'data-entry') {
  cookies().set('user-role', role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });

  redirect(`/${role}/dashboard`);
}

export async function logout() {
  cookies().delete('user-role');
  redirect('/login');
}


export async function generateRiderTrainingPlan(input: GenerateTrainingPlanInput) {
    try {
        const result = await generateTrainingPlan(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating training plan:", error);
        return { success: false, error: "Failed to generate training plan." };
    }
}

export async function explainRiderTrainingPlan(input: ExplainTrainingRecommendationsInput) {
    try {
        const result = await explainTrainingRecommendations(input);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error explaining training plan:", error);
        return { success: false, error: "Failed to explain training plan." };
    }
}
