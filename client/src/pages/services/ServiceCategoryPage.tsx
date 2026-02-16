import React from 'react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ServiceCategory } from '@/data/services';
import { Check, ArrowRight, Star } from 'lucide-react';

interface ServiceCategoryPageProps {
  category: ServiceCategory;
}

export default function ServiceCategoryPage({ category }: ServiceCategoryPageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
        <div className="container px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">{category.name}</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">{category.description}</p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 transform translate-x-1/2" />
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.services.map(service => (
              <Card key={service.id} className="flex flex-col hover:shadow-xl transition-all border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900">{service.name}</CardTitle>
                  <CardDescription className="font-bold text-secondary text-lg">
                    {service.priceString || `$${service.price}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-slate-500 mb-6 font-medium">{service.duration}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {service.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => setLocation(`/services/${service.id}`)} 
                      className="flex-1 font-bold text-primary border-primary hover:bg-primary hover:text-white"
                    >
                      Learn More
                    </Button>
                    <Button 
                      onClick={() => setLocation('/book')} 
                      className="flex-1 bg-primary text-white hover:bg-secondary hover:text-primary font-bold"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Why Choose JECI Group?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-bold mb-2">Expert Knowledge</h3>
              <p className="text-sm text-slate-500">Decades of combined experience in tax law and business strategy.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Tailored Solutions</h3>
              <p className="text-sm text-slate-500">We don't do cookie-cutter. Your strategy is built for you.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-2">Future Focused</h3>
              <p className="text-sm text-slate-500">From crypto to AI, we stay ahead of the curve so you can too.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
