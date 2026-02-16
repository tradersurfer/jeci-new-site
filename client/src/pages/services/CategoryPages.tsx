import React from 'react';
import { useRoute } from 'wouter';
import ServiceCategoryPage from './ServiceCategoryPage';
import { SERVICE_CATEGORIES } from '@/data/services';
import NotFound from '@/pages/not-found';

export default function CategoryWrapper() {
  return null;
}

export function TaxServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'tax');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function AccountingServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'accounting');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function CreditFundingServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'credit-funding');
  return category ? <ServiceCategoryPage category={category} /> : <NotFound />;
}

export function DigitalMarketingServices() {
  const category = SERVICE_CATEGORIES.find(c => c.id === 'digital-marketing');
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
