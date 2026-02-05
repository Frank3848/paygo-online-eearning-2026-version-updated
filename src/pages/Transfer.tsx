import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const VALID_PAY_ID_CODE = "PG66761866";

const banks = [
  'Access Bank',
  'First Bank',
  'GTBank',
  'UBA',
  'Zenith Bank',
  'Kuda Bank',
  'Opay',
  'Palmpay',
  'Moniepoint',
  'Wema Bank',
  'Sterling Bank',
  'Fidelity Bank',
  'FCMB',
  'Union Bank',
  'Ecobank',
  'Stanbic IBTC',
  'Standard Chartered',
  'Polaris Bank',
  'Keystone Bank',
  'Unity Bank',
];

const Transfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transferType, setTransferType] = useState<'bank' | 'paygo' | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState('');
  const [paygoId, setPaygoId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showInvalidDialog, setShowInvalidDialog] = useState(false);
  const [isVerifyingPayId, setIsVerifyingPayId] = useState(false);
  const [balance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 180000;
  });

  const handleVerifyAccount = () => {
    if (accountNumber.length === 10 && selectedBank) {
      setIsVerifying(true);
      // Simulate account verification with realistic names
      setTimeout(() => {
        const firstNames = ['ADEBAYO', 'CHINEDU', 'OLUWASEUN', 'EMEKA', 'FATIMA', 'NGOZI', 'IBRAHIM', 'OLUMIDE', 'AISHA', 'CHIOMA'];
        const lastNames = ['OKONKWO', 'ADEYEMI', 'IBRAHIM', 'MOHAMMED', 'JOHNSON', 'WILLIAMS', 'OKAFOR', 'BELLO', 'ABUBAKAR', 'OLAYINKA'];
        const middleNames = ['CHIBUEZE', 'OLUWAFEMI', 'AMINU', 'CHIAMAKA', 'FOLAKE', 'UCHENNA', 'YUSUF', 'ADAEZE', 'KELECHI', 'FUNMILAYO'];
        
        // Use account number digits to select names consistently
        const firstIndex = parseInt(accountNumber[0]) % firstNames.length;
        const lastIndex = parseInt(accountNumber[1]) % lastNames.length;
        const middleIndex = parseInt(accountNumber[2]) % middleNames.length;
        
        const generatedName = `${lastNames[lastIndex]} ${firstNames[firstIndex]} ${middleNames[middleIndex]}`;
        setAccountName(generatedName);
        setIsVerifying(false);
      }, 1500);
    }
  };

  const handleTransfer = () => {
    if (transferType === 'bank') {
      if (!accountNumber || !selectedBank || !amount || !accountName) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Validate PAY ID Code
      if (paygoId.toUpperCase() !== VALID_PAY_ID_CODE) {
        setIsVerifyingPayId(true);
        setTimeout(() => {
          setIsVerifyingPayId(false);
          setShowInvalidDialog(true);
        }, 2000);
        return;
      }
    } else if (transferType === 'paygo') {
      if (!paygoId || !amount) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }

    // Deduct from balance in localStorage
    const currentBalance = parseFloat(localStorage.getItem('walletBalance') || '180000');
    const transferAmount = parseFloat(amount);
    const newBalance = currentBalance - transferAmount;
    localStorage.setItem('walletBalance', newBalance.toString());

    // Navigate to processing page
    navigate('/transfer/processing', { 
      state: { 
        amount, 
        accountName, 
        selectedBank, 
        accountNumber,
        transferType 
      } 
    });
  };

  const renderTransferOptions = () => (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground mb-4">Select Transfer Type</h2>
      
      <button
        onClick={() => setTransferType('bank')}
        className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors"
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Building2 className="h-6 w-6 text-purple-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">Bank Transfer</p>
          <p className="text-sm text-muted-foreground">Transfer to any bank account</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>

      <button
        onClick={() => setTransferType('paygo')}
        className="w-full bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 hover:border-purple-200 transition-colors"
      >
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-green-600" />
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">PayGo User</p>
          <p className="text-sm text-muted-foreground">Transfer to another PayGo user</p>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );

  const renderBankTransfer = () => (
    <div className="space-y-5">
      {/* Available Balance Card */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-white">
        <p className="text-sm opacity-90">Available Balance</p>
        <p className="text-2xl font-bold">₦{balance.toLocaleString()}.00</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bank" className="text-foreground font-medium">Select Bank</Label>
        <Select value={selectedBank} onValueChange={setSelectedBank}>
          <SelectTrigger className="h-12 bg-white">
            <SelectValue placeholder="Choose a bank" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {banks.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountNumber" className="text-foreground font-medium">Account Number</Label>
        <Input
          id="accountNumber"
          type="text"
          placeholder="Enter account number"
          value={accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
            setAccountNumber(value);
          }}
          className="h-12 bg-white"
          maxLength={10}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountName" className="text-foreground font-medium">Account Name</Label>
        <Input
          id="accountName"
          type="text"
          placeholder="Enter account name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value.toUpperCase())}
          className="h-12 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-foreground font-medium">Amount</Label>
        <Input
          id="amount"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setAmount(value);
          }}
          className="h-12 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="payIdCode" className="text-foreground font-medium">PAY ID Code</Label>
        <Input
          id="payIdCode"
          type="text"
          placeholder="Enter PAY ID Code"
          value={paygoId}
          onChange={(e) => setPaygoId(e.target.value.toUpperCase())}
          className="h-12 bg-white"
        />
        <p className="text-xs text-muted-foreground">Enter your PAY ID code to authorize withdrawal</p>
      </div>

      <Button
        onClick={handleTransfer}
        disabled={!accountName || !amount || !selectedBank || !accountNumber || isVerifyingPayId}
        className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg mt-6"
      >
        {isVerifyingPayId ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Verifying...
          </>
        ) : (
          'Transfer Money'
        )}
      </Button>
    </div>
  );

  const renderPaygoTransfer = () => (
    <div className="space-y-5">
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-green-800 text-sm">
          <span className="font-semibold">Free Transfer!</span> Transfers to PayGo users are instant and free of charge.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="paygoId" className="text-foreground font-medium">PayGo ID</Label>
        <Input
          id="paygoId"
          type="text"
          placeholder="Enter recipient's PayGo ID"
          value={paygoId}
          onChange={(e) => setPaygoId(e.target.value.toUpperCase())}
          className="h-12 bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="paygoAmount" className="text-foreground font-medium">Amount (₦)</Label>
        <Input
          id="paygoAmount"
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setAmount(value);
          }}
          className="h-12 bg-white"
        />
        <p className="text-xs text-muted-foreground">Available Balance: ₦{balance.toLocaleString()}.00</p>
      </div>

      <Button
        onClick={handleTransfer}
        disabled={!paygoId || !amount}
        className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg mt-6"
      >
        Transfer ₦{amount ? Number(amount).toLocaleString() : '0'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 flex items-center gap-4">
        <button 
          onClick={() => transferType ? setTransferType(null) : navigate('/home')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">
          {transferType === 'bank' ? 'Bank Transfer' : 
           transferType === 'paygo' ? 'PayGo Transfer' : 'Transfer'}
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 p-4">
        {!transferType && renderTransferOptions()}
        {transferType === 'bank' && renderBankTransfer()}
        {transferType === 'paygo' && renderPaygoTransfer()}
      </main>

      {/* Invalid PAY ID Dialog */}
      <AlertDialog open={showInvalidDialog} onOpenChange={setShowInvalidDialog}>
        <AlertDialogContent className="max-w-[320px] mx-auto rounded-2xl p-6">
          <AlertDialogTitle className="sr-only">Invalid PAY ID Code</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground text-base leading-relaxed text-center">
            Invalid PAY ID Code. Please enter a valid PAY ID to proceed with withdrawal.
          </AlertDialogDescription>
          <AlertDialogFooter className="justify-center sm:justify-center mt-4">
            <AlertDialogAction 
              onClick={() => setShowInvalidDialog(false)}
              className="bg-transparent text-teal-500 hover:bg-transparent hover:text-teal-600 font-semibold text-lg shadow-none"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Transfer;
