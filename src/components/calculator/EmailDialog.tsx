
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { Copy, Check, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmailDialogProps {
  showEmailDialog: boolean;
  setShowEmailDialog: (show: boolean) => void;
  emailTemplate: string;
  handleEmailOpen: () => void;
}

const EmailDialog = ({ showEmailDialog, setShowEmailDialog, emailTemplate, handleEmailOpen }: EmailDialogProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useLanguage();

  const copyEmailTemplate = () => {
    navigator.clipboard.writeText(emailTemplate);
    setIsCopied(true);
    toast({ title: t('priceCalculator.copied'), description: t('priceCalculator.copiedToClipboard') });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{t('priceCalculator.sendReservation')}</DialogTitle>
          <DialogDescription>{t('priceCalculator.emailCreated')}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-lg font-serif">{t('priceCalculator.emailTemplate')}</h3>
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={copyEmailTemplate}>
                {isCopied ? (<><Check className="h-4 w-4" />{t('priceCalculator.copied')}</>) : (<><Copy className="h-4 w-4" />{t('priceCalculator.copy')}</>)}
              </Button>
            </div>
            <div className="whitespace-pre-wrap bg-white p-3 border rounded-md text-sm font-mono overflow-auto max-h-[250px]">{emailTemplate}</div>
          </div>
          <Alert className="bg-blue-50">
            <div className="flex flex-col space-y-2">
              <p className="font-medium">{t('priceCalculator.howToSend')}</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>{t('priceCalculator.step1')}</li>
                <li>{t('priceCalculator.step2')}</li>
                <li>{t('priceCalculator.step3')} <span className="font-medium">fewo@amertens.me</span></li>
                <li>{t('priceCalculator.step4')}</li>
                <li>{t('priceCalculator.step5')}</li>
              </ol>
            </div>
          </Alert>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={() => setShowEmailDialog(false)} className="sm:order-1 order-2">{t('priceCalculator.close')}</Button>
          <Button className="bg-forest-700 hover:bg-forest-800 flex items-center gap-2 sm:order-2 order-1 w-full sm:w-auto" onClick={() => { copyEmailTemplate(); handleEmailOpen(); }}>
            <Mail className="h-4 w-4" />{t('priceCalculator.openEmailClient')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailDialog;
