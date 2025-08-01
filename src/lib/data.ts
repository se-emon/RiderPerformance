import type { Rider, Delivery, TrainingPlan } from './types';

export const riders: Rider[] = [
  {
    id: 'R001',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    phone: '123-456-7890',
    joinDate: '2023-01-15',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    performance: {
      totalDeliveries: 150,
      successRate: 95,
      failedDeliveries: 5,
      returnedDeliveries: 2,
    },
  },
  {
    id: 'R002',
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    phone: '234-567-8901',
    joinDate: '2022-11-20',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    performance: {
      totalDeliveries: 250,
      successRate: 98,
      failedDeliveries: 3,
      returnedDeliveries: 2,
    },
    trainingPlan: {
      id: 'TP001',
      riderId: 'R002',
      generatedDate: '2024-05-01',
      plan: 'Focus on route optimization for urban areas. Complete 3 simulation modules on handling fragile packages.',
      reasoning: 'Slight dip in delivery times for dense city routes. Proactive training to maintain high efficiency.',
      status: 'approved',
    },
  },
  {
    id: 'R003',
    name: 'James Smith',
    email: 'james.s@example.com',
    phone: '345-678-9012',
    joinDate: '2023-05-10',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=james',
    performance: {
      totalDeliveries: 90,
      successRate: 88,
      failedDeliveries: 8,
      returnedDeliveries: 3,
    },
    trainingPlan: {
        id: 'TP002',
        riderId: 'R003',
        generatedDate: '2024-05-10',
        plan: 'Customer service enhancement module. Practice scenarios for handling delivery exceptions.',
        reasoning: 'Multiple failed deliveries linked to customer communication issues. Training aims to improve first-contact resolution.',
        status: 'pending',
    }
  },
  {
    id: 'R004',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '456-789-0123',
    joinDate: '2023-08-22',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?u=priya',
    performance: {
      totalDeliveries: 50,
      successRate: 90,
      failedDeliveries: 4,
      returnedDeliveries: 1,
    },
  },
];

export const deliveries: Delivery[] = [
  { id: 'D001', riderId: 'R001', riderName: 'Alex Johnson', date: '2024-05-15', status: 'delivered', trackingNumber: 'TN123456789', approved: true },
  { id: 'D002', riderId: 'R002', riderName: 'Maria Garcia', date: '2024-05-15', status: 'delivered', trackingNumber: 'TN123456790', approved: true },
  { id: 'D003', riderId: 'R003', riderName: 'James Smith', date: '2024-05-15', status: 'failed', notes: 'Customer not available', trackingNumber: 'TN123456791', approved: true },
  { id: 'D004', riderId: 'R001', riderName: 'Alex Johnson', date: '2024-05-14', status: 'delivered', trackingNumber: 'TN123456792', approved: true },
  { id: 'D005', riderId: 'R002', riderName: 'Maria Garcia', date: '2024-05-14', status: 'returned', notes: 'Package damaged', trackingNumber: 'TN123456793', approved: true },
  { id: 'D006', riderId: 'R003', riderName: 'James Smith', date: '2024-05-13', status: 'delivered', trackingNumber: 'TN123456794', approved: false },
  { id: 'D007', riderId: 'R001', riderName: 'Alex Johnson', date: '2024-05-13', status: 'delivered', trackingNumber: 'TN123456795', approved: false },
];

export const trainingPlans: TrainingPlan[] = riders.filter(r => r.trainingPlan).map(r => r.trainingPlan!);
