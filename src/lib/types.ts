export type UserRole = 'admin' | 'rider' | 'data-entry';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Delivery {
  id: string;
  riderId: string;
  riderName: string;
  date: string;
  status: 'delivered' | 'failed' | 'returned';
  trackingNumber: string;
  notes?: string;
  approved: boolean;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar: string;
  performance: {
    totalDeliveries: number;
    successRate: number;
    failedDeliveries: number;
    returnedDeliveries: number;
  };
  trainingPlan?: TrainingPlan;
}

export interface TrainingPlan {
  id: string;
  riderId: string;
  generatedDate: string;
  plan: string;
  reasoning: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed';
}
