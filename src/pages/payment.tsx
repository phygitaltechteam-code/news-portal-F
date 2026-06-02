import {createFileRoute , useNavigate} from '@tanstack/react-router';
import {useState} from 'react';
import {CreditCard, Zap} from 'lucide-react';


function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<
    'card' | 'upi' | 'wallet' | null
  >(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });
  const [loading, setLoading] = useState(false);

  const busDetails = {
    busName: 'Shree Travels AC',
    from: 'Pune',
    to: 'Mumbai',
    departure: '10:00 PM',
    seats: ['1A', '2B', '3A'],
    price: '₹2,850',
  };

  const handlePaymentMethodChange = (method: 'card' | 'upi' | 'wallet') => {
    setPaymentMethod(method);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'card' && !formData.cardNumber) {
      alert('Please fill in card details');
      return;
    }

    if (paymentMethod === 'upi' && !formData.upiId) {
      alert('Please enter UPI ID');
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert('Payment successful! Redirecting to ticket...');
      navigate({to:'/ticketgenerate'}); // Redirect to ticket generation page
    }, 2000);
  };

  return (
    <div className=" pt-25 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Payment
          </h1>
          <p className="mt-2 text-slate-600">Complete your booking payment</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">
                Booking Summary
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Bus:</span>
                  <span className="font-semibold text-slate-800">
                    {busDetails.busName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Route:</span>
                  <span className="font-semibold text-slate-800">
                    {busDetails.from} → {busDetails.to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Departure:</span>
                  <span className="font-semibold text-slate-800">
                    {busDetails.departure}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Seats:</span>
                  <span className="font-semibold text-slate-800">
                    {busDetails.seats.join(', ')}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-red-500">
                      {busDetails.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6">
                Select Payment Method
              </h2>

              {/* Payment Method Options */}
              <div className="mb-8 space-y-3">
                {/* Credit/Debit Card */}
                <button
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition ${
                    paymentMethod === 'card'
                      ? 'border-red-500 bg-red-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Credit/Debit Card
                      </p>
                      <p className="text-xs text-slate-600">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </div>
                </button>

                {/* UPI */}
                <button
                  onClick={() => handlePaymentMethodChange('upi')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-semibold text-slate-800">UPI</p>
                      <p className="text-xs text-slate-600">Google Pay, PhonePe, etc</p>
                    </div>
                  </div>
                </button>

                {/* Wallet */}
                <button
                  onClick={() => handlePaymentMethodChange('wallet')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition ${
                    paymentMethod === 'wallet'
                      ? 'border-green-500 bg-green-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-semibold text-slate-800">Wallet</p>
                      <p className="text-xs text-slate-600">Paytm, FreeCharge</p>
                    </div>
                  </div>
                </button>
              </div>

              {/* Payment Form */}
              {paymentMethod === 'card' && (
                <div className="mb-6 space-y-4 rounded-xl bg-slate-50 p-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="mb-6 rounded-xl bg-slate-50 p-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="yourname@upi"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay ${busDetails.price}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
