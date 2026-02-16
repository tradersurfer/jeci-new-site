import React from 'react';
import { useRoute } from 'wouter';
import ServiceCategoryPage from './ServiceCategoryPage';
import { SERVICE_CATEGORIES } from '@/data/services';
import NotFound from '@/pages/not-found';

export default function CategoryWrapper() {
  const [match, params] = useRoute("/services/:slug");
  
  // Also handle direct routes if needed, or just use the slug
  // For this implementation, I'll match the slug from the URL to the data
  
  // Since we want specific routes like /tax-services, I'll use a prop-based approach in App.tsx 
  // or a mapping here if I were using a dynamic route.
  // But to keep it simple and compatible with the requested structure:
  
  return null; // This component isn't actually needed if I map them in App.tsx
}

export function TaxServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'tax');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function AccountingServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'accounting');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function BusinessServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'business-consulting');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function BusinessDevelopment() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'business-development');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function PremiumServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'premium');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}
