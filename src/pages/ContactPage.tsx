
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    arrivalDate: "",
    departureDate: "",
    guests: "2"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct the mailto link with the form data
    const subject = encodeURIComponent("Einruhr - Kontaktanfrage");
    
    // Format dates for the email body if they exist
    const arrivalDateStr = formData.arrivalDate ? formData.arrivalDate : "";
    const departureDateStr = formData.departureDate ? formData.departureDate : "";
    
    // Build the body of the email
    let body = encodeURIComponent(
      `Hallo Herr Mertens,\n\n${formData.message}`
    );
    
    // Add sender's contact information
    body += encodeURIComponent(`\n\nMit freundlichen Grüßen,\n${formData.name}\nTel: ${formData.phone}\nEmail: ${formData.email}`);
    
    // Create the mailto link
    const mailtoLink = `mailto:einruhr.mertens@web.de?subject=${subject}&body=${body}`;
    
    // Open the mail client
    window.location.href = mailtoLink;
    
    // Show a confirmation toast
    toast({
      title: "E-Mail wird geöffnet",
      description: "Ihr E-Mail-Programm sollte sich jetzt öffnen. Bitte senden Sie die vorbereitete Nachricht ab.",
      variant: "default",
    });
    
    // Reset the form submission state after a delay
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="pb-16">
        <div className="bg-forest-700 py-16 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold mb-4">Kontakt</h1>
            <p className="text-xl max-w-3xl">
              Haben Sie allgemeine Fragen? Kontaktieren Sie uns gerne!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                Schreiben Sie uns
              </h2>
              <p className="mb-8 text-gray-700">
                Füllen Sie das Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden. Gerne können Sie uns auch direkt telefonisch kontaktieren.
              </p>
              
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Hinweis</AlertTitle>
                <AlertDescription>
                  Für Reservierungsanfragen nutzen Sie bitte unseren <a href="/calculator" className="text-forest-600 hover:underline">Preisrechner</a> mit integriertem Anfrageformular.
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-Mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Nachricht *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px]"
                    placeholder="Ihre Nachricht an uns..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-forest-600 hover:bg-forest-700 w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold text-forest-700 mb-6">
                Kontaktdaten
              </h2>
              
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium mb-1">Telefon</h3>
                        <p className="text-forest-700">+49 1517 4412216</p>
                        <p className="text-forest-700">02403 837412</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium mb-1">E-Mail</h3>
                        <p className="text-forest-700 text-lg">einruhr.mertens@web.de</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-forest-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium mb-1">Adresse</h3>
                        <p className="text-forest-700">
                          Heilsteinstr. 39<br />
                          52152 Simmerath-Einruhr<br />
                          Deutschland
                        </p>
                        <a 
                          href="https://maps.app.goo.gl/qkxbJidBxtzRt5Vv9" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-forest-600 hover:underline inline-flex items-center mt-2"
                        >
                          Route in Google Maps anzeigen
                          <MapPin className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <img 
                  src="https://einruhr.wordpress.com/wp-content/uploads/2022/09/gerumpel.jpg?w=2046" 
                  alt="Außenansicht Eingang" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-serif font-medium text-forest-700 mb-4">
                  Anfahrt
                </h3>
                <p className="mb-4">
                  Unsere Ferienwohnung ist gut mit dem Auto erreichbar. Parkplätze stehen direkt am Haus zur Verfügung.
                </p>
                <p>
                  Die nächsten größeren Bahnhöfe befinden sich in Aachen und Düren. Von dort aus fahren regelmäßig Busse nach Einruhr.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
