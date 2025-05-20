
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone } from "lucide-react";
import { ContactInfo } from "@/types/booking";

interface ContactFormProps {
  contactInfo: ContactInfo;
  onContactInfoChange: (field: keyof ContactInfo, value: string) => void;
}

const ContactForm = ({ contactInfo, onContactInfoChange }: ContactFormProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Ihre Kontaktdaten</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Für Ihre Reservierungsanfrage benötigen wir folgende Informationen:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              value={contactInfo.name}
              onChange={(e) => onContactInfoChange("name", e.target.value)}
              required
              className="w-full"
              placeholder="Ihr Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-Mail *</Label>
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => onContactInfoChange("email", e.target.value)}
              required
              className="w-full"
              placeholder="Ihre E-Mail"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <div className="flex items-center">
          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => onContactInfoChange("phone", e.target.value)}
            className="w-full"
            placeholder="Ihre Telefonnummer"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Nachricht</Label>
        <Textarea
          id="message"
          value={contactInfo.message}
          onChange={(e) => onContactInfoChange("message", e.target.value)}
          placeholder="Weitere Wünsche oder Fragen..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default ContactForm;
