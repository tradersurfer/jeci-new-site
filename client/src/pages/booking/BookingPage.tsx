import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SERVICE_CATEGORIES, Service, AddOn } from '@/data/services';
import { Check, ChevronRight, Calendar as CalendarIcon, CreditCard, ArrowLeft } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Step = 'category' | 'service' | 'addons' | 'datetime' | 'contact' | 'payment' | 'confirmation';

export default function BookingPage() {
  const [step, setStep] = useState<Step>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    description: '',
    source: ''
  });
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep('service');
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    if (service.addOns && service.addOns.length > 0) {
      setStep('addons');
    } else {
      setStep('datetime');
    }
  };

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    let total = selectedService.price;
    if (selectedService.addOns) {
      selectedService.addOns.forEach(addOn => {
        if (selectedAddOns.includes(addOn.id)) {
          total += addOn.price;
        }
      });
    }
    return total;
  };

  const handleBookingSubmit = () => {
    // In a real app, this would process payment and save to backend
    console.log("Booking submitted:", {
      service: selectedService,
      addOns: selectedAddOns,
      date,
      time,
      contact: contactInfo,
      total: calculateTotal()
    });

    toast({
      title: "Booking Confirmed!",
      description: "You will receive a confirmation email shortly.",
    });

    setStep('confirmation');
  };

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="container px-4 py-32 max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Book Your Service</h1>
          <p className="text-slate-500">Secure your spot with the JECI Group.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {['category', 'service', 'details', 'confirm'].map((s, i) => (
            <div 
              key={s} 
              className={`h-2 flex-1 rounded-full ${
                ['category', 'service', 'addons', 'datetime', 'contact', 'payment', 'confirmation'].indexOf(step) >= i * 1.5 
                  ? 'bg-secondary' 
                  : 'bg-slate-200'
              }`} 
            />
          ))}
        </div>

        {step === 'category' && (
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map(category => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:border-secondary hover:shadow-lg transition-all"
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-primary">{category.name}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 text-secondary font-bold hover:text-primary hover:bg-transparent">
                    Select Category <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {step === 'service' && selectedCategory && (
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-primary">Select Service</h2>
               <Button variant="ghost" size="sm" onClick={() => setStep('category')}>Change Category</Button>
             </div>
             {SERVICE_CATEGORIES.find(c => c.id === selectedCategory)?.services.map(service => (
               <Card key={service.id} className="hover:border-slate-300 transition-all">
                 <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
                   <div className="flex-1">
                     <div className="flex justify-between items-start mb-2">
                       <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                       <span className="font-bold text-primary text-lg">
                         {service.priceString || `$${service.price}`}
                       </span>
                     </div>
                     <div className="text-sm text-slate-500 mb-4">{service.duration}</div>
                     <ul className="space-y-1 mb-4">
                       {service.description.map((item, i) => (
                         <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                           <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                           {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div className="flex items-center">
                     <Button onClick={() => handleServiceSelect(service)} className="w-full md:w-auto bg-primary text-white hover:bg-secondary hover:text-primary font-bold">
                       Select Service
                     </Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </div>
        )}

        {step === 'addons' && selectedService && (
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-primary">Enhance Your Service</h2>
               <Button variant="ghost" size="sm" onClick={() => setStep('service')}>Back</Button>
             </div>
             
             <div className="bg-slate-100 p-6 rounded-lg mb-6">
               <h3 className="font-bold text-slate-900 mb-2">Selected: {selectedService.name}</h3>
               <p className="text-primary font-bold">{selectedService.priceString || `$${selectedService.price}`}</p>
             </div>

             <div className="space-y-4">
               {selectedService.addOns?.map(addOn => (
                 <div 
                   key={addOn.id} 
                   className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                     selectedAddOns.includes(addOn.id) ? 'border-secondary bg-secondary/10' : 'border-slate-200 bg-white'
                   }`}
                   onClick={() => toggleAddOn(addOn.id)}
                 >
                   <div className="flex items-center gap-3">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                       selectedAddOns.includes(addOn.id) ? 'bg-secondary border-secondary' : 'border-slate-300'
                     }`}>
                       {selectedAddOns.includes(addOn.id) && <Check className="h-3 w-3 text-white" />}
                     </div>
                     <span className="font-medium text-slate-900">{addOn.name}</span>
                   </div>
                   <span className="font-bold text-slate-700">+${addOn.price}</span>
                 </div>
               ))}
             </div>

             <div className="flex justify-end pt-6">
               <Button onClick={() => setStep('datetime')} className="bg-primary text-white font-bold px-8">
                 Continue to Scheduling
               </Button>
             </div>
          </div>
        )}

        {step === 'datetime' && (
          <div className="space-y-8">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-primary">Select Date & Time</h2>
               <Button variant="ghost" size="sm" onClick={() => setStep(selectedService?.addOns ? 'addons' : 'service')}>Back</Button>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <Calendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   className="rounded-md border-0"
                   disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                 />
               </div>
               
               <div className="space-y-4">
                 <h3 className="font-bold text-slate-900">Available Time Slots (EST)</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {timeSlots.map(slot => (
                     <Button
                       key={slot}
                       variant={time === slot ? "default" : "outline"}
                       className={time === slot ? "bg-secondary text-primary border-secondary" : ""}
                       onClick={() => setTime(slot)}
                     >
                       {slot}
                     </Button>
                   ))}
                 </div>
                 {time && (
                    <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">You selected:</p>
                      <p className="font-bold text-primary text-lg">
                        {date ? format(date, "EEEE, MMMM do") : ""} at {time}
                      </p>
                    </div>
                 )}
               </div>
             </div>

             <div className="flex justify-end pt-6">
               <Button 
                 onClick={() => setStep('contact')} 
                 className="bg-primary text-white font-bold px-8"
                 disabled={!date || !time}
               >
                 Continue to Details
               </Button>
             </div>
          </div>
        )}

        {step === 'contact' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-primary">Your Information</h2>
               <Button variant="ghost" size="sm" onClick={() => setStep('datetime')}>Back</Button>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <Label>Full Name</Label>
                 <Input 
                    value={contactInfo.name} 
                    onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                    placeholder="John Doe" 
                 />
               </div>
               <div className="space-y-2">
                 <Label>Email</Label>
                 <Input 
                    type="email"
                    value={contactInfo.email} 
                    onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                    placeholder="john@example.com" 
                 />
               </div>
               <div className="space-y-2">
                 <Label>Phone</Label>
                 <Input 
                    value={contactInfo.phone} 
                    onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                    placeholder="(555) 555-5555" 
                 />
               </div>
               <div className="space-y-2">
                 <Label>Business Name (Optional)</Label>
                 <Input 
                    value={contactInfo.businessName} 
                    onChange={e => setContactInfo({...contactInfo, businessName: e.target.value})}
                    placeholder="My Company LLC" 
                 />
               </div>
               <div className="space-y-2 md:col-span-2">
                 <Label>Business Type</Label>
                 <Select onValueChange={val => setContactInfo({...contactInfo, businessType: val})}>
                   <SelectTrigger>
                     <SelectValue placeholder="Select business type" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="individual">Individual</SelectItem>
                     <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                     <SelectItem value="llc">LLC</SelectItem>
                     <SelectItem value="s-corp">S-Corp</SelectItem>
                     <SelectItem value="c-corp">C-Corp</SelectItem>
                     <SelectItem value="partnership">Partnership</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2 md:col-span-2">
                 <Label>How can we help you?</Label>
                 <Textarea 
                    value={contactInfo.description} 
                    onChange={e => setContactInfo({...contactInfo, description: e.target.value})}
                    placeholder="Briefly describe your needs..." 
                 />
               </div>
               <div className="space-y-2 md:col-span-2">
                 <Label>How did you hear about us?</Label>
                 <Select onValueChange={val => setContactInfo({...contactInfo, source: val})}>
                   <SelectTrigger>
                     <SelectValue placeholder="Select source" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="google">Google Search</SelectItem>
                     <SelectItem value="referral">Referral</SelectItem>
                     <SelectItem value="social">Social Media</SelectItem>
                     <SelectItem value="linkedin">LinkedIn</SelectItem>
                     <SelectItem value="other">Other</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
             </div>

             <div className="flex justify-end pt-6">
               <Button 
                 onClick={() => setStep('payment')} 
                 className="bg-primary text-white font-bold px-8"
                 disabled={!contactInfo.name || !contactInfo.email || !contactInfo.phone}
               >
                 Continue to Payment
               </Button>
             </div>
          </div>
        )}

        {step === 'payment' && selectedService && (
          <div className="space-y-8">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-primary">Review & Pay</h2>
               <Button variant="ghost" size="sm" onClick={() => setStep('contact')}>Back</Button>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               <Card className="bg-slate-50 border-slate-200">
                 <CardHeader>
                   <CardTitle>Order Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                     <div>
                       <p className="font-bold text-slate-900">{selectedService.name}</p>
                       <p className="text-sm text-slate-500">{selectedService.duration}</p>
                     </div>
                     <p className="font-bold text-slate-900">${selectedService.price}</p>
                   </div>
                   
                   {selectedService.addOns?.filter(a => selectedAddOns.includes(a.id)).map(addOn => (
                     <div key={addOn.id} className="flex justify-between items-center text-sm">
                       <span className="text-slate-600">+ {addOn.name}</span>
                       <span className="font-medium text-slate-900">${addOn.price}</span>
                     </div>
                   ))}

                   <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                     <span className="font-bold text-lg text-primary">Total</span>
                     <span className="font-black text-2xl text-secondary">${calculateTotal()}</span>
                   </div>
                 </CardContent>
               </Card>

               <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <CreditCard size={20} className="text-primary" /> Secure Payment
                   </h3>
                   <p className="text-sm text-slate-500 mb-6">
                     This is a secure checkout. Your payment information is encrypted and processed securely by Stripe.
                   </p>
                   
                   {/* Mock Stripe Element Placeholder */}
                   <div className="space-y-4 mb-6">
                     <div className="p-3 border border-slate-300 rounded bg-slate-50 text-slate-400 text-sm">
                       Card Number
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 border border-slate-300 rounded bg-slate-50 text-slate-400 text-sm">
                         MM / YY
                       </div>
                       <div className="p-3 border border-slate-300 rounded bg-slate-50 text-slate-400 text-sm">
                         CVC
                       </div>
                     </div>
                   </div>

                   <Button 
                     onClick={handleBookingSubmit} 
                     className="w-full bg-secondary text-primary hover:bg-primary hover:text-white font-bold h-12 text-lg"
                   >
                     Pay ${calculateTotal()}
                   </Button>
                   <p className="text-xs text-center text-slate-400 mt-4">
                     By clicking pay, you agree to our Terms of Service.
                   </p>
                 </div>
               </div>
             </div>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Booking Confirmed!</h1>
            <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
              Thank you, {contactInfo.name}. We've sent a confirmation email to {contactInfo.email} with your Zoom details.
            </p>
            
            <Card className="max-w-md mx-auto mb-12 text-left bg-white border-slate-200 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <CalendarIcon className="text-secondary" />
                  <div>
                    <p className="font-bold text-slate-900">
                      {date ? format(date, "EEEE, MMMM do, yyyy") : ""}
                    </p>
                    <p className="text-sm text-slate-500">{time} EST</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Service</p>
                  <p className="font-bold text-slate-900">{selectedService?.name}</p>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">Add to Calendar</Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button onClick={() => setLocation('/')} variant="outline">Back to Home</Button>
              <Button onClick={() => {
                setStep('category');
                setSelectedCategory(null);
                setSelectedService(null);
                setSelectedAddOns([]);
              }} className="bg-primary text-white">Book Another Service</Button>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}
